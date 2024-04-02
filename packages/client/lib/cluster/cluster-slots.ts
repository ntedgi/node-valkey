import ValkeyClient, {
  InstantiableValkeyClient,
  ValkeyClientType,
} from "../client";
import { ValkeyClusterClientOptions, ValkeyClusterOptions } from ".";
import {
  ValkeyCommandArgument,
  ValkeyFunctions,
  ValkeyModules,
  ValkeyScripts,
} from "../commands";
import { RootNodesUnavailableError } from "../errors";
import { ClusterSlotsNode } from "../commands/CLUSTER_SLOTS";
import { types } from "util";
import {
  ChannelListeners,
  PubSubType,
  PubSubTypeListeners,
} from "../client/pub-sub";
import { EventEmitter } from "stream";

// We need to use 'require', because it's not possible with Typescript to import
// function that are exported as 'module.exports = function`, without esModuleInterop
// set to true.
const calculateSlot = require("cluster-key-slot");

interface NodeAddress {
  host: string;
  port: number;
}

export type NodeAddressMap =
  | {
      [address: string]: NodeAddress;
    }
  | ((address: string) => NodeAddress | undefined);

type ValueOrPromise<T> = T | Promise<T>;

type ClientOrPromise<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> = ValueOrPromise<ValkeyClientType<M, F, S>>;

export interface Node<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> {
  address: string;
  client?: ClientOrPromise<M, F, S>;
}

export interface ShardNode<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> extends Node<M, F, S> {
  id: string;
  host: string;
  port: number;
  readonly: boolean;
}

export interface MasterNode<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> extends ShardNode<M, F, S> {
  pubSubClient?: ClientOrPromise<M, F, S>;
}

export interface Shard<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> {
  master: MasterNode<M, F, S>;
  replicas?: Array<ShardNode<M, F, S>>;
  nodesIterator?: IterableIterator<ShardNode<M, F, S>>;
}

type ShardWithReplicas<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> = Shard<M, F, S> & Required<Pick<Shard<M, F, S>, "replicas">>;

export type PubSubNode<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> = Required<Node<M, F, S>>;

type PubSubToResubscribe = Record<
  PubSubType.CHANNELS | PubSubType.PATTERNS,
  PubSubTypeListeners
>;

export type OnShardedChannelMovedError = (
  err: unknown,
  channel: string,
  listeners?: ChannelListeners
) => void;

export default class ValkeyClusterSlots<
  M extends ValkeyModules,
  F extends ValkeyFunctions,
  S extends ValkeyScripts
> {
  static #SLOTS = 16384;

  readonly #options: ValkeyClusterOptions<M, F, S>;
  readonly #Client: InstantiableValkeyClient<M, F, S>;
  readonly #emit: EventEmitter["emit"];
  slots = new Array<Shard<M, F, S>>(ValkeyClusterSlots.#SLOTS);
  shards = new Array<Shard<M, F, S>>();
  masters = new Array<ShardNode<M, F, S>>();
  replicas = new Array<ShardNode<M, F, S>>();
  readonly nodeByAddress = new Map<
    string,
    MasterNode<M, F, S> | ShardNode<M, F, S>
  >();
  pubSubNode?: PubSubNode<M, F, S>;

  #isOpen = false;

  get isOpen() {
    return this.#isOpen;
  }

  constructor(
    options: ValkeyClusterOptions<M, F, S>,
    emit: EventEmitter["emit"]
  ) {
    this.#options = options;
    this.#Client = ValkeyClient.extend(options);
    this.#emit = emit;
  }

  async connect() {
    if (this.#isOpen) {
      throw new Error("Cluster already open");
    }

    this.#isOpen = true;
    try {
      await this.#discoverWithRootNodes();
    } catch (err) {
      this.#isOpen = false;
      throw err;
    }
  }

  async #discoverWithRootNodes() {
    let start = Math.floor(Math.random() * this.#options.rootNodes.length);
    for (let i = start; i < this.#options.rootNodes.length; i++) {
      if (await this.#discover(this.#options.rootNodes[i])) return;
    }

    for (let i = 0; i < start; i++) {
      if (await this.#discover(this.#options.rootNodes[i])) return;
    }

    throw new RootNodesUnavailableError();
  }

  #resetSlots() {
    this.slots = new Array(ValkeyClusterSlots.#SLOTS);
    this.shards = [];
    this.masters = [];
    this.replicas = [];
    this.#randomNodeIterator = undefined;
  }

  async #discover(rootNode?: ValkeyClusterClientOptions) {
    this.#resetSlots();
    const addressesInUse = new Set<string>();

    try {
      const shards = await this.#getShards(rootNode),
        promises: Array<Promise<unknown>> = [],
        eagerConnect = this.#options.minimizeConnections !== true;
      for (const { from, to, master, replicas } of shards) {
        const shard: Shard<M, F, S> = {
          master: this.#initiateSlotNode(
            master,
            false,
            eagerConnect,
            addressesInUse,
            promises
          ),
        };

        if (this.#options.useReplicas) {
          shard.replicas = replicas.map((replica) =>
            this.#initiateSlotNode(
              replica,
              true,
              eagerConnect,
              addressesInUse,
              promises
            )
          );
        }

        this.shards.push(shard);

        for (let i = from; i <= to; i++) {
          this.slots[i] = shard;
        }
      }

      if (this.pubSubNode && !addressesInUse.has(this.pubSubNode.address)) {
        if (types.isPromise(this.pubSubNode.client)) {
          promises.push(
            this.pubSubNode.client.then((client) => client.disconnect())
          );
          this.pubSubNode = undefined;
        } else {
          promises.push(this.pubSubNode.client.disconnect());

          const channelsListeners = this.pubSubNode.client.getPubSubListeners(
              PubSubType.CHANNELS
            ),
            patternsListeners = this.pubSubNode.client.getPubSubListeners(
              PubSubType.PATTERNS
            );

          if (channelsListeners.size || patternsListeners.size) {
            promises.push(
              this.#initiatePubSubClient({
                [PubSubType.CHANNELS]: channelsListeners,
                [PubSubType.PATTERNS]: patternsListeners,
              })
            );
          }
        }
      }

      for (const [address, node] of this.nodeByAddress.entries()) {
        if (addressesInUse.has(address)) continue;

        if (node.client) {
          promises.push(
            this.#execOnNodeClient(node.client, (client) => client.disconnect())
          );
        }

        const { pubSubClient } = node as MasterNode<M, F, S>;
        if (pubSubClient) {
          promises.push(
            this.#execOnNodeClient(pubSubClient, (client) =>
              client.disconnect()
            )
          );
        }

        this.nodeByAddress.delete(address);
      }

      await Promise.all(promises);

      return true;
    } catch (err) {
      this.#emit("error", err);
      return false;
    }
  }

  async #getShards(rootNode?: ValkeyClusterClientOptions) {
    const client = new this.#Client(
      this.#clientOptionsDefaults(rootNode, true)
    );

    client.on("error", (err) => this.#emit("error", err));

    await client.connect();

    try {
      // using `CLUSTER SLOTS` and not `CLUSTER SHARDS` to support older versions
      return await client.clusterSlots();
    } finally {
      await client.disconnect();
    }
  }

  #getNodeAddress(address: string): NodeAddress | undefined {
    switch (typeof this.#options.nodeAddressMap) {
      case "object":
        return this.#options.nodeAddressMap[address];

      case "function":
        return this.#options.nodeAddressMap(address);
    }
  }

  #clientOptionsDefaults(
    options?: ValkeyClusterClientOptions,
    disableReconnect?: boolean
  ): ValkeyClusterClientOptions | undefined {
    let result: ValkeyClusterClientOptions | undefined;
    if (this.#options.defaults) {
      let socket;
      if (this.#options.defaults.socket) {
        socket = options?.socket
          ? {
              ...this.#options.defaults.socket,
              ...options.socket,
            }
          : this.#options.defaults.socket;
      } else {
        socket = options?.socket;
      }

      result = {
        ...this.#options.defaults,
        ...options,
        socket,
      };
    } else {
      result = options;
    }

    if (disableReconnect) {
      result ??= {};
      result.socket ??= {};
      result.socket.reconnectStrategy = false;
    }

    return result;
  }

  #initiateSlotNode(
    { id, ip, port }: ClusterSlotsNode,
    readonly: boolean,
    eagerConnent: boolean,
    addressesInUse: Set<string>,
    promises: Array<Promise<unknown>>
  ) {
    const address = `${ip}:${port}`;
    addressesInUse.add(address);

    let node = this.nodeByAddress.get(address);
    if (!node) {
      node = {
        id,
        host: ip,
        port,
        address,
        readonly,
        client: undefined,
      };

      if (eagerConnent) {
        promises.push(this.#createNodeClient(node));
      }

      this.nodeByAddress.set(address, node);
    }

    (readonly ? this.replicas : this.masters).push(node);

    return node;
  }

  async #createClient(node: ShardNode<M, F, S>, readonly = node.readonly) {
    const client = new this.#Client(
      this.#clientOptionsDefaults({
        socket: this.#getNodeAddress(node.address) ?? {
          host: node.host,
          port: node.port,
        },
        readonly,
      })
    );
    client.on("error", (err) => this.#emit("error", err));

    await client.connect();

    return client;
  }

  #createNodeClient(node: ShardNode<M, F, S>) {
    const promise = this.#createClient(node)
      .then((client) => {
        node.client = client;
        return client;
      })
      .catch((err) => {
        node.client = undefined;
        throw err;
      });
    node.client = promise;
    return promise;
  }

  nodeClient(node: ShardNode<M, F, S>) {
    return node.client ?? this.#createNodeClient(node);
  }

  #runningValkeycoverPromise?: Promise<void>;

  async rediscover(startWith: ValkeyClientType<M, F, S>): Promise<void> {
    this.#runningValkeycoverPromise ??= this.#rediscover(startWith).finally(
      () => (this.#runningValkeycoverPromise = undefined)
    );
    return this.#runningValkeycoverPromise;
  }

  async #rediscover(startWith: ValkeyClientType<M, F, S>): Promise<void> {
    if (await this.#discover(startWith.options)) return;

    return this.#discoverWithRootNodes();
  }

  quit(): Promise<void> {
    return this.#destroy((client) => client.quit());
  }

  disconnect(): Promise<void> {
    return this.#destroy((client) => client.disconnect());
  }

  async #destroy(
    fn: (client: ValkeyClientType<M, F, S>) => Promise<unknown>
  ): Promise<void> {
    this.#isOpen = false;

    const promises = [];
    for (const { master, replicas } of this.shards) {
      if (master.client) {
        promises.push(this.#execOnNodeClient(master.client, fn));
      }

      if (master.pubSubClient) {
        promises.push(this.#execOnNodeClient(master.pubSubClient, fn));
      }

      if (replicas) {
        for (const { client } of replicas) {
          if (client) {
            promises.push(this.#execOnNodeClient(client, fn));
          }
        }
      }
    }

    if (this.pubSubNode) {
      promises.push(this.#execOnNodeClient(this.pubSubNode.client, fn));
      this.pubSubNode = undefined;
    }

    this.#resetSlots();
    this.nodeByAddress.clear();

    await Promise.allSettled(promises);
  }

  #execOnNodeClient(
    client: ClientOrPromise<M, F, S>,
    fn: (client: ValkeyClientType<M, F, S>) => Promise<unknown>
  ) {
    return types.isPromise(client) ? client.then(fn) : fn(client);
  }

  getClient(
    firstKey: ValkeyCommandArgument | undefined,
    isReadonly: boolean | undefined
  ): ClientOrPromise<M, F, S> {
    if (!firstKey) {
      return this.nodeClient(this.getRandomNode());
    }

    const slotNumber = calculateSlot(firstKey);
    if (!isReadonly) {
      return this.nodeClient(this.slots[slotNumber].master);
    }

    return this.nodeClient(this.getSlotRandomNode(slotNumber));
  }

  *#iterateAllNodes() {
    let i = Math.floor(
      Math.random() * (this.masters.length + this.replicas.length)
    );
    if (i < this.masters.length) {
      do {
        yield this.masters[i];
      } while (++i < this.masters.length);

      for (const replica of this.replicas) {
        yield replica;
      }
    } else {
      i -= this.masters.length;
      do {
        yield this.replicas[i];
      } while (++i < this.replicas.length);
    }

    while (true) {
      for (const master of this.masters) {
        yield master;
      }

      for (const replica of this.replicas) {
        yield replica;
      }
    }
  }

  #randomNodeIterator?: IterableIterator<ShardNode<M, F, S>>;

  getRandomNode() {
    this.#randomNodeIterator ??= this.#iterateAllNodes();
    return this.#randomNodeIterator.next().value as ShardNode<M, F, S>;
  }

  *#slotNodesIterator(slot: ShardWithReplicas<M, F, S>) {
    let i = Math.floor(Math.random() * (1 + slot.replicas.length));
    if (i < slot.replicas.length) {
      do {
        yield slot.replicas[i];
      } while (++i < slot.replicas.length);
    }

    while (true) {
      yield slot.master;

      for (const replica of slot.replicas) {
        yield replica;
      }
    }
  }

  getSlotRandomNode(slotNumber: number) {
    const slot = this.slots[slotNumber];
    if (!slot.replicas?.length) {
      return slot.master;
    }

    slot.nodesIterator ??= this.#slotNodesIterator(
      slot as ShardWithReplicas<M, F, S>
    );
    return slot.nodesIterator.next().value as ShardNode<M, F, S>;
  }

  getMasterByAddress(address: string) {
    const master = this.nodeByAddress.get(address);
    if (!master) return;

    return this.nodeClient(master);
  }

  getPubSubClient() {
    return this.pubSubNode
      ? this.pubSubNode.client
      : this.#initiatePubSubClient();
  }

  async #initiatePubSubClient(toResubscribe?: PubSubToResubscribe) {
    const index = Math.floor(
        Math.random() * (this.masters.length + this.replicas.length)
      ),
      node =
        index < this.masters.length
          ? this.masters[index]
          : this.replicas[index - this.masters.length];

    this.pubSubNode = {
      address: node.address,
      client: this.#createClient(node, true)
        .then(async (client) => {
          if (toResubscribe) {
            await Promise.all([
              client.extendPubSubListeners(
                PubSubType.CHANNELS,
                toResubscribe[PubSubType.CHANNELS]
              ),
              client.extendPubSubListeners(
                PubSubType.PATTERNS,
                toResubscribe[PubSubType.PATTERNS]
              ),
            ]);
          }

          this.pubSubNode!.client = client;
          return client;
        })
        .catch((err) => {
          this.pubSubNode = undefined;
          throw err;
        }),
    };

    return this.pubSubNode.client as Promise<ValkeyClientType<M, F, S>>;
  }

  async executeUnsubscribeCommand(
    unsubscribe: (client: ValkeyClientType<M, F, S>) => Promise<void>
  ): Promise<void> {
    const client = await this.getPubSubClient();
    await unsubscribe(client);

    if (!client.isPubSubActive && client.isOpen) {
      await client.disconnect();
      this.pubSubNode = undefined;
    }
  }

  getShardedPubSubClient(channel: string) {
    const { master } = this.slots[calculateSlot(channel)];
    return master.pubSubClient ?? this.#initiateShardedPubSubClient(master);
  }

  #initiateShardedPubSubClient(master: MasterNode<M, F, S>) {
    const promise = this.#createClient(master, true)
      .then((client) => {
        client.on("server-sunsubscribe", async (channel, listeners) => {
          try {
            await this.rediscover(client);
            const redirectTo = await this.getShardedPubSubClient(channel);
            redirectTo.extendPubSubChannelListeners(
              PubSubType.SHARDED,
              channel,
              listeners
            );
          } catch (err) {
            this.#emit("sharded-shannel-moved-error", err, channel, listeners);
          }
        });

        master.pubSubClient = client;
        return client;
      })
      .catch((err) => {
        master.pubSubClient = undefined;
        throw err;
      });

    master.pubSubClient = promise;

    return promise;
  }

  async executeShardedUnsubscribeCommand(
    channel: string,
    unsubscribe: (client: ValkeyClientType<M, F, S>) => Promise<void>
  ): Promise<void> {
    const { master } = this.slots[calculateSlot(channel)];
    if (!master.pubSubClient) return Promise.resolve();

    const client = await master.pubSubClient;
    await unsubscribe(client);

    if (!client.isPubSubActive && client.isOpen) {
      await client.disconnect();
      master.pubSubClient = undefined;
    }
  }
}
