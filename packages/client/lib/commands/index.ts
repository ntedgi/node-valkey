import type { RedisCommands } from '../RESP/types';
import ACL_CAT from './ACL_CAT';
import ACL_DELUSER from './ACL_DELUSER';
import ACL_DRYRUN from './ACL_DRYRUN';
import ACL_GENPASS from './ACL_GENPASS';
import ACL_GETUSER from './ACL_GETUSER';
import ACL_LIST from './ACL_LIST';
import ACL_LOAD from './ACL_LOAD';
import ACL_LOG_RESET from './ACL_LOG_RESET';
import ACL_LOG from './ACL_LOG';
import ACL_SAVE from './ACL_SAVE';
import ACL_SETUSER from './ACL_SETUSER';
import ACL_USERS from './ACL_USERS';
import ACL_WHOAMI from './ACL_WHOAMI';
import APPEND from './APPEND';
import ASKING from './ASKING';
import AUTH from './AUTH';
import BGREWRITEAOF from './BGREWRITEAOF';
import BGSAVE from './BGSAVE';
import BITCOUNT from './BITCOUNT';
import BITFIELD_RO from './BITFIELD_RO';
import BITFIELD from './BITFIELD';
import BITOP from './BITOP';
import BITPOS from './BITPOS';
import BLMOVE from './BLMOVE';
import BLMPOP from './BLMPOP';
import BLPOP from './BLPOP';
import BRPOP from './BRPOP';
import BRPOPLPUSH from './BRPOPLPUSH';
import BZMPOP from './BZMPOP';
import BZPOPMAX from './BZPOPMAX';
import BZPOPMIN from './BZPOPMIN';
import CLIENT_CACHING from './CLIENT_CACHING';
import CLIENT_GETNAME from './CLIENT_GETNAME';
import CLIENT_GETREDIR from './CLIENT_GETREDIR';
import CLIENT_ID from './CLIENT_ID';
import CLIENT_INFO from './CLIENT_INFO';
import CLIENT_KILL from './CLIENT_KILL';
import CLIENT_LIST from './CLIENT_LIST';
import CLIENT_NO_EVICT from './CLIENT_NO-EVICT';
import CLIENT_PAUSE from './CLIENT_PAUSE';
import CLIENT_SETNAME from './CLIENT_SETNAME';
import CLIENT_TRACKING from './CLIENT_TRACKING';
import CLIENT_TRACKINGINFO from './CLIENT_TRACKINGINFO';
import CLIENT_UNPAUSE from './CLIENT_UNPAUSE';
import CLUSTER_ADDSLOTS from './CLUSTER_ADDSLOTS';
import CLUSTER_ADDSLOTSRANGE from './CLUSTER_ADDSLOTSRANGE';
import CLUSTER_BUMPEPOCH from './CLUSTER_BUMPEPOCH';
import CLUSTER_COUNT_FAILURE_REPORTS from './CLUSTER_COUNT-FAILURE-REPORTS';
import CLUSTER_COUNTKEYSINSLOT from './CLUSTER_COUNTKEYSINSLOT';
import CLUSTER_DELSLOTS from './CLUSTER_DELSLOTS';
import CLUSTER_DELSLOTSRANGE from './CLUSTER_DELSLOTSRANGE';
import CLUSTER_FAILOVER from './CLUSTER_FAILOVER';
import CLUSTER_FLUSHSLOTS from './CLUSTER_FLUSHSLOTS';
import CLUSTER_FORGET from './CLUSTER_FORGET';
import CLUSTER_GETKEYSINSLOT from './CLUSTER_GETKEYSINSLOT';
// import CLUSTER_INFO from './CLUSTER_INFO';
import CLUSTER_KEYSLOT from './CLUSTER_KEYSLOT';
import CLUSTER_LINKS from './CLUSTER_LINKS';
import CLUSTER_MEET from './CLUSTER_MEET';
import CLUSTER_MYID from './CLUSTER_MYID';
// import CLUSTER_NODES from './CLUSTER_NODES';
// import CLUSTER_REPLICAS from './CLUSTER_REPLICAS';
import CLUSTER_REPLICATE from './CLUSTER_REPLICATE';
import CLUSTER_RESET from './CLUSTER_RESET';
import CLUSTER_SAVECONFIG from './CLUSTER_SAVECONFIG';
import CLUSTER_SET_CONFIG_EPOCH from './CLUSTER_SET-CONFIG-EPOCH';
import CLUSTER_SETSLOT from './CLUSTER_SETSLOT';
import CLUSTER_SLOTS from './CLUSTER_SLOTS';
import COMMAND_COUNT from './COMMAND_COUNT';
import COMMAND_GETKEYS from './COMMAND_GETKEYS';
import COMMAND_GETKEYSANDFLAGS from './COMMAND_GETKEYSANDFLAGS';
// import COMMAND_INFO from './COMMAND_INFO';
// import COMMAND_LIST from './COMMAND_LIST';
// import COMMAND from './COMMAND';
import CONFIG_GET from './CONFIG_GET';
import CONFIG_RESETASTAT from './CONFIG_RESETSTAT';
import CONFIG_REWRITE from './CONFIG_REWRITE';
import CONFIG_SET from './CONFIG_SET';
import COPY from './COPY';
import DBSIZE from './DBSIZE';
import DECR from './DECR';
import DECRBY from './DECRBY';
import DEL from './DEL';
import DUMP from './DUMP';
import ECHO from './ECHO';
import EVAL_RO from './EVAL_RO';
import EVAL from './EVAL';
import EVALSHA_RO from './EVALSHA_RO';
import EVALSHA from './EVALSHA';
import GEOADD from './GEOADD';
import GEODIST from './GEODIST';
import GEOHASH from './GEOHASH';
import GEOPOS from './GEOPOS';
import GEORADIUS_RO_WITH from './GEORADIUS_RO_WITH';
import GEORADIUS_RO from './GEORADIUS_RO';
import GEORADIUS_STORE from './GEORADIUS_STORE';
import GEORADIUS_WITH from './GEORADIUS_WITH';
import GEORADIUS from './GEORADIUS';
import GEORADIUSBYMEMBER_RO_WITH from './GEORADIUSBYMEMBER_RO_WITH';
import GEORADIUSBYMEMBER_RO from './GEORADIUSBYMEMBER_RO';
import GEORADIUSBYMEMBER_STORE from './GEORADIUSBYMEMBER_STORE';
import GEORADIUSBYMEMBER_WITH from './GEORADIUSBYMEMBER_WITH';
import GEORADIUSBYMEMBER from './GEORADIUSBYMEMBER';
import GEOSEARCH_WITH from './GEOSEARCH_WITH';
import GEOSEARCH from './GEOSEARCH';
import GEOSEARCHSTORE from './GEOSEARCHSTORE';
import GET from './GET';
import GETBIT from './GETBIT';
import GETDEL from './GETDEL';
import GETEX from './GETEX';
import GETRANGE from './GETRANGE';
import GETSET from './GETSET';
import EXISTS from './EXISTS';
import EXPIRE from './EXPIRE';
import EXPIREAT from './EXPIREAT';
import EXPIRETIME from './EXPIRETIME';
import FLUSHALL from './FLUSHALL';
import FLUSHDB from './FLUSHDB';
import FCALL from './FCALL';
import FCALL_RO from './FCALL_RO';
import FUNCTION_DELETE from './FUNCTION_DELETE';
import FUNCTION_DUMP from './FUNCTION_DUMP';
import FUNCTION_FLUSH from './FUNCTION_FLUSH';
import FUNCTION_KILL from './FUNCTION_KILL';
import FUNCTION_LIST_WITHCODE from './FUNCTION_LIST_WITHCODE';
import FUNCTION_LIST from './FUNCTION_LIST';
import FUNCTION_LOAD from './FUNCTION_LOAD';
import FUNCTION_RESTORE from './FUNCTION_RESTORE';
// import FUNCTION_STATS from './FUNCTION_STATS';
import HDEL from './HDEL';
import HELLO from './HELLO';
import HEXISTS from './HEXISTS';
import HGET from './HGET';
import HGETALL from './HGETALL';
import HINCRBY from './HINCRBY';
import HINCRBYFLOAT from './HINCRBYFLOAT';
import HKEYS from './HKEYS';
import HLEN from './HLEN';
import HMGET from './HMGET';
import HRANDFIELD_COUNT_WITHVALUES from './HRANDFIELD_COUNT_WITHVALUES';
import HRANDFIELD_COUNT from './HRANDFIELD_COUNT';
import HRANDFIELD from './HRANDFIELD';
import HSCAN from './HSCAN';
import HSET from './HSET';
import HSETNX from './HSETNX';
import HSTRLEN from './HSTRLEN';
import HVALS from './HVALS';
import INCR from './INCR';
import INCRBY from './INCRBY';
import INCRBYFLOAT from './INCRBYFLOAT';
import INFO from './INFO';
import KEYS from './KEYS';
import LASTSAVE from './LASTSAVE';
import LATENCY_DOCTOR from './LATENCY_DOCTOR';
import LATENCY_GRAPH from './LATENCY_GRAPH';
import LATENCY_LATEST from './LATENCY_LATEST';
import LCS_IDX_WITHMATCHLEN from './LCS_IDX_WITHMATCHLEN';
import LCS_IDX from './LCS_IDX';
import LCS_LEN from './LCS_LEN';
import LCS from './LCS';
import LINDEX from './LINDEX';
import LINSERT from './LINSERT';
import LLEN from './LLEN';
import LMOVE from './LMOVE';
import LMPOP from './LMPOP';
import LOLWUT from './LOLWUT';
import LPOP_COUNT from './LPOP_COUNT';
import LPOP from './LPOP';
import LPOS_COUNT from './LPOS_COUNT';
import LPOS from './LPOS';
import LPUSH from './LPUSH';
import LPUSHX from './LPUSHX';
import LRANGE from './LRANGE';
import LREM from './LREM';
import LSET from './LSET';
import LTRIM from './LTRIM';
import MEMORY_DOCTOR from './MEMORY_DOCTOR';
import MEMORY_MALLOC_STATS from './MEMORY_MALLOC-STATS';
import MEMORY_PURGE from './MEMORY_PURGE';
import MEMORY_STATS from './MEMORY_STATS';
import MEMORY_USAGE from './MEMORY_USAGE';
import MGET from './MGET';
import MODULE_LIST from './MODULE_LIST';
import MODULE_LOAD from './MODULE_LOAD';
import MODULE_UNLOAD from './MODULE_UNLOAD';
import MOVE from './MOVE';
import MSET from './MSET';
import MSETNX from './MSETNX';
import OBJECT_ENCODING from './OBJECT_ENCODING';
import OBJECT_FREQ from './OBJECT_FREQ';
import OBJECT_IDLETIME from './OBJECT_IDLETIME';
import OBJECT_REFCOUNT from './OBJECT_REFCOUNT';
import PERSIST from './PERSIST';
import PEXPIRE from './PEXPIRE';
import PEXPIREAT from './PEXPIREAT';
import PEXPIRETIME from './PEXPIRETIME';
import PFADD from './PFADD';
import PFCOUNT from './PFCOUNT';
import PFMERGE from './PFMERGE';
import PING from './PING';
import PSETEX from './PSETEX';
import PTTL from './PTTL';
import PUBLISH from './PUBLISH';
import PUBSUB_CHANNELS from './PUBSUB_CHANNELS';
import PUBSUB_NUMPAT from './PUBSUB_NUMPAT';
import PUBSUB_NUMSUB from './PUBSUB_NUMSUB';
import PUBSUB_SHARDCHANNELS from './PUBSUB_SHARDCHANNELS';
import RANDOMKEY from './RANDOMKEY';
import READONLY from './READONLY';
import RENAME from './RENAME';
import RENAMENX from './RENAMENX';
import ROLE from './ROLE';
import RPOP_COUNT from './RPOP_COUNT';
import RPOP from './RPOP';
import RPOPLPUSH from './RPOPLPUSH';
import RPUSH from './RPUSH';
import RPUSHX from './RPUSHX';
import SADD from './SADD';
import SCAN from './SCAN';
import SCARD from './SCARD';
import SCRIPT_DEBUG from './SCRIPT_DEBUG';
import SCRIPT_EXISTS from './SCRIPT_EXISTS';
import SCRIPT_FLUSH from './SCRIPT_FLUSH';
import SCRIPT_KILL from './SCRIPT_KILL';
import SCRIPT_LOAD from './SCRIPT_LOAD';
import SDIFF from './SDIFF';
import SDIFFSTORE from './SDIFFSTORE';
import SET from './SET';
import SETBIT from './SETBIT';
import SETEX from './SETEX';
import SETNX from './SETNX';
import SETRANGE from './SETRANGE';
import SINTER from './SINTER';
import SINTERCARD from './SINTERCARD';
import SINTERSTORE from './SINTERSTORE';
import SISMEMBER from './SISMEMBER';
import SMEMBERS from './SMEMBERS';
import SMISMEMBER from './SMISMEMBER';
import SMOVE from './SMOVE';
import SORT_RO from './SORT_RO';
import SORT_STORE from './SORT_STORE';
import SORT from './SORT';
import SPOP_COUNT from './SPOP_COUNT';
import SPOP from './SPOP';
import SPUBLISH from './SPUBLISH';
import SRANDMEMBER_COUNT from './SRANDMEMBER_COUNT';
import SRANDMEMBER from './SRANDMEMBER';
import SREM from './SREM';
import SSCAN from './SSCAN';
import STRLEN from './STRLEN';
import SUNION from './SUNION';
import SUNIONSTORE from './SUNIONSTORE';
import SWAPDB from './SWAPDB';
import TIME from './TIME';
import TOUCH from './TOUCH';
import TTL from './TTL';
import TYPE from './TYPE';
import UNLINK from './UNLINK';
import UNWATCH from './UNWATCH';
import WAIT from './WAIT';
import WATCH from './WATCH';
import XACK from './XACK';
import XADD_NOMKSTREAM from './XADD_NOMKSTREAM';
import XADD from './XADD';
import XAUTOCLAIM_JUSTID from './XAUTOCLAIM_JUSTID';
import XAUTOCLAIM from './XAUTOCLAIM';
import XCLAIM_JUSTID from './XCLAIM_JUSTID';
import XCLAIM from './XCLAIM';
import XDEL from './XDEL';
import XGROUP_CREATE from './XGROUP_CREATE';
import XGROUP_CREATECONSUMER from './XGROUP_CREATECONSUMER';
import XGROUP_DELCONSUMER from './XGROUP_DELCONSUMER';
import XGROUP_DESTROY from './XGROUP_DESTROY';
import XGROUP_SETID from './XGROUP_SETID';
import XINFO_CONSUMERS from './XINFO_CONSUMERS';
import XINFO_GROUPS from './XINFO_GROUPS';
import XINFO_STREAM from './XINFO_STREAM';
import XLEN from './XLEN';
import XPENDING_RANGE from './XPENDING_RANGE';
import XPENDING from './XPENDING';
import XRANGE from './XRANGE';
import XREAD from './XREAD';
import XREADGROUP from './XREADGROUP';
import XREVRANGE from './XREVRANGE';
import XSETID from './XSETID';
import XTRIM from './XTRIM';
import ZADD_INCR from './ZADD_INCR';
import ZADD from './ZADD';
import ZCARD from './ZCARD';
import ZCOUNT from './ZCOUNT';
import ZDIFF_WITHSCORES from './ZDIFF_WITHSCORES';
import ZDIFF from './ZDIFF';
import ZDIFFSTORE from './ZDIFFSTORE';
import ZINCRBY from './ZINCRBY';
import ZINTER_WITHSCORES from './ZINTER_WITHSCORES';
import ZINTER from './ZINTER';
import ZINTERCARD from './ZINTERCARD';
import ZINTERSTORE from './ZINTERSTORE';
import ZLEXCOUNT from './ZLEXCOUNT';
import ZMPOP from './ZMPOP';
import ZMSCORE from './ZMSCORE';
import ZPOPMAX_COUNT from './ZPOPMAX_COUNT';
import ZPOPMAX from './ZPOPMAX';
import ZPOPMIN_COUNT from './ZPOPMIN_COUNT';
import ZPOPMIN from './ZPOPMIN';
import ZRANDMEMBER_COUNT_WITHSCORES from './ZRANDMEMBER_COUNT_WITHSCORES';
import ZRANDMEMBER_COUNT from './ZRANDMEMBER_COUNT';
import ZRANDMEMBER from './ZRANDMEMBER';
import ZRANGE_WITHSCORES from './ZRANGE_WITHSCORES';
import ZRANGE from './ZRANGE';
import ZRANGEBYLEX from './ZRANGEBYLEX';
import ZRANGEBYSCORE_WITHSCORES from './ZRANGEBYSCORE_WITHSCORES';
import ZRANGEBYSCORE from './ZRANGEBYSCORE';
import ZRANGESTORE from './ZRANGESTORE';
import ZREMRANGEBYSCORE from './ZREMRANGEBYSCORE';
import ZRANK_WITHSCORE from './ZRANK_WITHSCORE';
import ZRANK from './ZRANK';
import ZREM from './ZREM';
import ZREMRANGEBYLEX from './ZREMRANGEBYLEX';
import ZREMRANGEBYRANK from './ZREMRANGEBYRANK';
import ZREVRANK from './ZREVRANK';
import ZSCAN from './ZSCAN';
import ZSCORE from './ZSCORE';
import ZUNION_WITHSCORES from './ZUNION_WITHSCORES';
import ZUNION from './ZUNION';
import ZUNIONSTORE from './ZUNIONSTORE';

export default {
  ACL_CAT,
  aclCat: ACL_CAT,
  ACL_DELUSER,
  aclDelUser: ACL_DELUSER,
  ACL_DRYRUN,
  aclDryRun: ACL_DRYRUN,
  ACL_GENPASS,
  aclGenPass: ACL_GENPASS,
  ACL_GETUSER,
  aclGetUser: ACL_GETUSER,
  ACL_LIST,
  aclList: ACL_LIST,
  ACL_LOAD,
  aclLoad: ACL_LOAD,
  ACL_LOG_RESET,
  aclLogReset: ACL_LOG_RESET,
  ACL_LOG,
  aclLog: ACL_LOG,
  ACL_SAVE,
  aclSave: ACL_SAVE,
  ACL_SETUSER,
  aclSetUser: ACL_SETUSER,
  ACL_USERS,
  aclUsers: ACL_USERS,
  ACL_WHOAMI,
  aclWhoAmI: ACL_WHOAMI,
  APPEND,
  append: APPEND,
  ASKING,
  asking: ASKING,
  AUTH,
  auth: AUTH,
  BGREWRITEAOF,
  bgRewriteAof: BGREWRITEAOF,
  BGSAVE,
  bgSave: BGSAVE,
  BITCOUNT,
  bitCount: BITCOUNT,
  BITFIELD_RO,
  bitFieldRo: BITFIELD_RO,
  BITFIELD,
  bitField: BITFIELD,
  BITOP,
  bitOp: BITOP,
  BITPOS,
  bitPos: BITPOS,
  BLMOVE,
  blMove: BLMOVE,
  BLMPOP,
  blmPop: BLMPOP,
  BLPOP,
  blPop: BLPOP,
  BRPOP,
  brPop: BRPOP,
  BRPOPLPUSH,
  brPopLPush: BRPOPLPUSH,
  BZMPOP,
  bzmPop: BZMPOP,
  BZPOPMAX,
  bzPopMax: BZPOPMAX,
  BZPOPMIN,
  bzPopMin: BZPOPMIN,
  CLIENT_CACHING,
  clientCaching: CLIENT_CACHING,
  CLIENT_GETNAME,
  clientGetName: CLIENT_GETNAME,
  CLIENT_GETREDIR,
  clientGetRedir: CLIENT_GETREDIR,
  CLIENT_ID,
  clientId: CLIENT_ID,
  CLIENT_INFO,
  clientInfo: CLIENT_INFO,
  CLIENT_KILL,
  clientKill: CLIENT_KILL,
  CLIENT_LIST,
  clientList: CLIENT_LIST,
  'CLIENT_NO-EVICT': CLIENT_NO_EVICT,
  clientNoEvict: CLIENT_NO_EVICT,
  CLIENT_PAUSE,
  clientPause: CLIENT_PAUSE,
  CLIENT_SETNAME,
  clientSetName: CLIENT_SETNAME,
  CLIENT_TRACKING,
  clientTracking: CLIENT_TRACKING,
  CLIENT_TRACKINGINFO,
  clientTrackingInfo: CLIENT_TRACKINGINFO,
  CLIENT_UNPAUSE,
  clientUnpause: CLIENT_UNPAUSE,
  CLUSTER_ADDSLOTS,
  clusterAddSlots: CLUSTER_ADDSLOTS,
  CLUSTER_ADDSLOTSRANGE,
  clusterAddSlotsRange: CLUSTER_ADDSLOTSRANGE,
  CLUSTER_BUMPEPOCH,
  clusterBumpEpoch: CLUSTER_BUMPEPOCH,
  'CLUSTER_COUNT-FAILURE-REPORTS': CLUSTER_COUNT_FAILURE_REPORTS,
  clusterCountFailureReports: CLUSTER_COUNT_FAILURE_REPORTS,
  CLUSTER_COUNTKEYSINSLOT,
  clusterCountKeysInSlot: CLUSTER_COUNTKEYSINSLOT,
  CLUSTER_DELSLOTS,
  clusterDelSlots: CLUSTER_DELSLOTS,
  CLUSTER_DELSLOTSRANGE,
  clusterDelSlotsRange: CLUSTER_DELSLOTSRANGE,
  CLUSTER_FAILOVER,
  clusterFailover: CLUSTER_FAILOVER,
  CLUSTER_FLUSHSLOTS,
  clusterFlushSlots: CLUSTER_FLUSHSLOTS,
  CLUSTER_FORGET,
  clusterForget: CLUSTER_FORGET,
  CLUSTER_GETKEYSINSLOT,
  clusterGetKeysInSlot: CLUSTER_GETKEYSINSLOT,
  // CLUSTER_INFO,
  // clusterInfo: CLUSTER_INFO,
  CLUSTER_KEYSLOT,
  clusterKeySlot: CLUSTER_KEYSLOT,
  CLUSTER_LINKS,
  clusterLinks: CLUSTER_LINKS,
  CLUSTER_MEET,
  clusterMeet: CLUSTER_MEET,
  CLUSTER_MYID,
  clusterMyId: CLUSTER_MYID,
  // CLUSTER_NODES,
  // clusterNodes: CLUSTER_NODES,
  // CLUSTER_REPLICAS,
  // clusterReplicas: CLUSTER_REPLICAS,
  CLUSTER_REPLICATE,
  clusterReplicate: CLUSTER_REPLICATE,
  CLUSTER_RESET,
  clusterReset: CLUSTER_RESET,
  CLUSTER_SAVECONFIG,
  clusterSaveConfig: CLUSTER_SAVECONFIG,
  'CLUSTER_SET-CONFIG-EPOCH': CLUSTER_SET_CONFIG_EPOCH,
  clusterSetConfigEpoch: CLUSTER_SET_CONFIG_EPOCH,
  CLUSTER_SETSLOT,
  clusterSetSlot: CLUSTER_SETSLOT,
  CLUSTER_SLOTS,
  clusterSlots: CLUSTER_SLOTS,
  COMMAND_COUNT,
  commandCount: COMMAND_COUNT,
  COMMAND_GETKEYS,
  commandGetKeys: COMMAND_GETKEYS,
  COMMAND_GETKEYSANDFLAGS,
  commandGetKeysAndFlags: COMMAND_GETKEYSANDFLAGS,
  // COMMAND_INFO,
  // commandInfo: COMMAND_INFO,
  // COMMAND_LIST,
  // commandList: COMMAND_LIST,
  // COMMAND,
  // command: COMMAND,
  CONFIG_GET,
  configGet: CONFIG_GET,
  CONFIG_RESETASTAT,
  configResetStat: CONFIG_RESETASTAT,
  CONFIG_REWRITE,
  configRewrite: CONFIG_REWRITE,
  CONFIG_SET,
  configSet: CONFIG_SET,
  COPY,
  copy: COPY,
  DBSIZE,
  dbSize: DBSIZE,
  DECR,
  decr: DECR,
  DECRBY,
  decrBy: DECRBY,
  DEL,
  del: DEL,
  DUMP,
  dump: DUMP,
  ECHO,
  echo: ECHO,
  EVAL_RO,
  evalRo: EVAL_RO,
  EVAL,
  eval: EVAL,
  EVALSHA_RO,
  evalShaRo: EVALSHA_RO,
  EVALSHA,
  evalSha: EVALSHA,
  EXISTS,
  exists: EXISTS,
  EXPIRE,
  expire: EXPIRE,
  EXPIREAT,
  expireAt: EXPIREAT,
  EXPIRETIME,
  expireTime: EXPIRETIME,
  FLUSHALL,
  flushAll: FLUSHALL,
  FLUSHDB,
  flushDb: FLUSHDB,
  FCALL,
  fCall: FCALL,
  FCALL_RO,
  fCallRo: FCALL_RO,
  FUNCTION_DELETE,
  functionDelete: FUNCTION_DELETE,
  FUNCTION_DUMP,
  functionDump: FUNCTION_DUMP,
  FUNCTION_FLUSH,
  functionFlush: FUNCTION_FLUSH,
  FUNCTION_KILL,
  functionKill: FUNCTION_KILL,
  FUNCTION_LIST_WITHCODE,
  functionListWithCode: FUNCTION_LIST_WITHCODE,
  FUNCTION_LIST,
  functionList: FUNCTION_LIST,
  FUNCTION_LOAD,
  functionLoad: FUNCTION_LOAD,
  FUNCTION_RESTORE,
  functionRestore: FUNCTION_RESTORE,
  // FUNCTION_STATS,
  // functionStats: FUNCTION_STATS,
  GEOADD,
  geoAdd: GEOADD,
  GEODIST,
  geoDist: GEODIST,
  GEOHASH,
  geoHash: GEOHASH,
  GEOPOS,
  geoPos: GEOPOS,
  GEORADIUS_RO_WITH,
  geoRadiusRoWith: GEORADIUS_RO_WITH,
  GEORADIUS_RO,
  geoRadiusRo: GEORADIUS_RO,
  GEORADIUS_STORE,
  geoRadiusStore: GEORADIUS_STORE,
  GEORADIUS_WITH,
  geoRadiusWith: GEORADIUS_WITH,
  GEORADIUS,
  geoRadius: GEORADIUS,
  GEORADIUSBYMEMBER_RO_WITH,
  geoRadiusByMemberRoWith: GEORADIUSBYMEMBER_RO_WITH,
  GEORADIUSBYMEMBER_RO,
  geoRadiusByMemberRo: GEORADIUSBYMEMBER_RO,
  GEORADIUSBYMEMBER_STORE,
  geoRadiusByMemberStore: GEORADIUSBYMEMBER_STORE,
  GEORADIUSBYMEMBER_WITH,
  geoRadiusByMemberWith: GEORADIUSBYMEMBER_WITH,
  GEORADIUSBYMEMBER,
  geoRadiusByMember: GEORADIUSBYMEMBER,
  GEOSEARCH_WITH,
  geoSearchWith: GEOSEARCH_WITH,
  GEOSEARCH,
  geoSearch: GEOSEARCH,
  GEOSEARCHSTORE,
  geoSearchStore: GEOSEARCHSTORE,
  GET,
  get: GET,
  GETBIT,
  getBit: GETBIT,
  GETDEL,
  getDel: GETDEL,
  GETEX,
  getEx: GETEX,
  GETRANGE,
  getRange: GETRANGE,
  GETSET,
  getSet: GETSET,
  HDEL,
  hDel: HDEL,
  HELLO,
  hello: HELLO,
  HEXISTS,
  hExists: HEXISTS,
  HGET,
  hGet: HGET,
  HGETALL,
  hGetAll: HGETALL,
  HINCRBY,
  hIncrBy: HINCRBY,
  HINCRBYFLOAT,
  hIncrByFloat: HINCRBYFLOAT,
  HKEYS,
  hKeys: HKEYS,
  HLEN,
  hLen: HLEN,
  HMGET,
  hmGet: HMGET,
  HRANDFIELD_COUNT_WITHVALUES,
  hRandFieldCountWithValues: HRANDFIELD_COUNT_WITHVALUES,
  HRANDFIELD_COUNT,
  hRandFieldCount: HRANDFIELD_COUNT,
  HRANDFIELD,
  hRandField: HRANDFIELD,
  HSCAN,
  hScan: HSCAN,
  HSET,
  hSet: HSET,
  HSETNX,
  hSetNX: HSETNX,
  HSTRLEN,
  hStrLen: HSTRLEN,
  HVALS,
  hVals: HVALS,
  INCR,
  incr: INCR,
  INCRBY,
  incrBy: INCRBY,
  INCRBYFLOAT,
  incrByFloat: INCRBYFLOAT,
  INFO,
  info: INFO,
  KEYS,
  keys: KEYS,
  LASTSAVE,
  lastSave: LASTSAVE,
  LATENCY_DOCTOR,
  latencyDoctor: LATENCY_DOCTOR,
  LATENCY_GRAPH,
  latencyGraph: LATENCY_GRAPH,
  LATENCY_LATEST,
  latencyLatest: LATENCY_LATEST,
  LCS_IDX_WITHMATCHLEN,
  lcsIdxWithMatchLen: LCS_IDX_WITHMATCHLEN,
  LCS_IDX,
  lcsIdx: LCS_IDX,
  LCS_LEN,
  lcsLen: LCS_LEN,
  LCS,
  lcs: LCS,
  LINDEX,
  lIndex: LINDEX,
  LINSERT,
  lInsert: LINSERT,
  LLEN,
  lLen: LLEN,
  LMOVE,
  lMove: LMOVE,
  LMPOP,
  lmPop: LMPOP,
  LOLWUT,
  LPOP_COUNT,
  lPopCount: LPOP_COUNT,
  LPOP,
  lPop: LPOP,
  LPOS_COUNT,
  lPosCount: LPOS_COUNT,
  LPOS,
  lPos: LPOS,
  LPUSH,
  lPush: LPUSH,
  LPUSHX,
  lPushX: LPUSHX,
  LRANGE,
  lRange: LRANGE,
  LREM,
  lRem: LREM,
  LSET,
  lSet: LSET,
  LTRIM,
  lTrim: LTRIM,
  MEMORY_DOCTOR,
  memoryDoctor: MEMORY_DOCTOR,
  'MEMORY_MALLOC-STATS': MEMORY_MALLOC_STATS,
  memoryMallocStats: MEMORY_MALLOC_STATS,
  MEMORY_PURGE,
  memoryPurge: MEMORY_PURGE,
  MEMORY_STATS,
  memoryStats: MEMORY_STATS,
  MEMORY_USAGE,
  memoryUsage: MEMORY_USAGE,
  MGET,
  mGet: MGET,
  MODULE_LIST,
  moduleList: MODULE_LIST,
  MODULE_LOAD,
  moduleLoad: MODULE_LOAD,
  MODULE_UNLOAD,
  moduleUnload: MODULE_UNLOAD,
  MOVE,
  move: MOVE,
  MSET,
  mSet: MSET,
  MSETNX,
  mSetNX: MSETNX,
  OBJECT_ENCODING,
  objectEncoding: OBJECT_ENCODING,
  OBJECT_FREQ,
  objectFreq: OBJECT_FREQ,
  OBJECT_IDLETIME,
  objectIdleTime: OBJECT_IDLETIME,
  OBJECT_REFCOUNT,
  objectRefCount: OBJECT_REFCOUNT,
  PERSIST,
  persist: PERSIST,
  PEXPIRE,
  pExpire: PEXPIRE,
  PEXPIREAT,
  pExpireAt: PEXPIREAT,
  PEXPIRETIME,
  pExpireTime: PEXPIRETIME,
  PFADD,
  pfAdd: PFADD,
  PFCOUNT,
  pfCount: PFCOUNT,
  PFMERGE,
  pfMerge: PFMERGE,
  PING,
  /**
   * ping jsdoc
   */
  ping: PING,
  PSETEX,
  pSetEx: PSETEX,
  PTTL,
  pTTL: PTTL,
  PUBLISH,
  publish: PUBLISH,
  PUBSUB_CHANNELS,
  pubSubChannels: PUBSUB_CHANNELS,
  PUBSUB_NUMPAT,
  pubSubNumPat: PUBSUB_NUMPAT,
  PUBSUB_NUMSUB,
  pubSubNumSub: PUBSUB_NUMSUB,
  PUBSUB_SHARDCHANNELS,
  pubSubShardChannels: PUBSUB_SHARDCHANNELS,
  RANDOMKEY,
  randomKey: RANDOMKEY,
  READONLY,
  readonly: READONLY,
  RENAME,
  rename: RENAME,
  RENAMENX,
  renameNX: RENAMENX,
  RPOP_COUNT,
  rPopCount: RPOP_COUNT,
  ROLE,
  role: ROLE,
  RPOP,
  rPop: RPOP,
  RPOPLPUSH,
  rPopLPush: RPOPLPUSH,
  RPUSH,
  rPush: RPUSH,
  RPUSHX,
  rPushX: RPUSHX,
  SADD,
  sAdd: SADD,
  SCAN,
  scan: SCAN,
  SCARD,
  sCard: SCARD,
  SCRIPT_DEBUG,
  scriptDebug: SCRIPT_DEBUG,
  SCRIPT_EXISTS,
  scriptExists: SCRIPT_EXISTS,
  SCRIPT_FLUSH,
  scriptFlush: SCRIPT_FLUSH,
  SCRIPT_KILL,
  scriptKill: SCRIPT_KILL,
  SCRIPT_LOAD,
  scriptLoad: SCRIPT_LOAD,
  SDIFF,
  sDiff: SDIFF,
  SDIFFSTORE,
  sDiffStore: SDIFFSTORE,
  SET,
  set: SET,
  SETBIT,
  setBit: SETBIT,
  SETEX,
  setEx: SETEX,
  SETNX,
  setNX: SETNX,
  SETRANGE,
  setRange: SETRANGE,
  SINTER,
  sInter: SINTER,
  SINTERCARD,
  sInterCard: SINTERCARD,
  SINTERSTORE,
  sInterStore: SINTERSTORE,
  SISMEMBER,
  sIsMember: SISMEMBER,
  SMEMBERS,
  sMembers: SMEMBERS,
  SMISMEMBER,
  smIsMember: SMISMEMBER,
  SMOVE,
  sMove: SMOVE,
  SORT_RO,
  sortRo: SORT_RO,
  SORT_STORE,
  sortStore: SORT_STORE,
  SORT,
  sort: SORT,
  SPOP_COUNT,
  sPopCount: SPOP_COUNT,
  SPOP,
  sPop: SPOP,
  SPUBLISH,
  sPublish: SPUBLISH,
  SRANDMEMBER_COUNT,
  sRandMemberCount: SRANDMEMBER_COUNT,
  SRANDMEMBER,
  sRandMember: SRANDMEMBER,
  SREM,
  sRem: SREM,
  SSCAN,
  sScan: SSCAN,
  STRLEN,
  strLen: STRLEN,
  SUNION,
  sUnion: SUNION,
  SUNIONSTORE,
  sUnionStore: SUNIONSTORE,
  SWAPDB,
  swapDb: SWAPDB,
  TIME,
  time: TIME,
  TOUCH,
  touch: TOUCH,
  TTL,
  ttl: TTL,
  TYPE,
  type: TYPE,
  UNLINK,
  unlink: UNLINK,
  UNWATCH,
  unwatch: UNWATCH,
  WAIT,
  wait: WAIT,
  WATCH,
  watch: WATCH,
  XACK,
  xAck: XACK,
  XADD_NOMKSTREAM,
  xAddNoMkStream: XADD_NOMKSTREAM,
  XADD,
  xAdd: XADD,
  XAUTOCLAIM_JUSTID,
  xAutoClaimJustId: XAUTOCLAIM_JUSTID,
  XAUTOCLAIM,
  xAutoClaim: XAUTOCLAIM,
  XCLAIM_JUSTID,
  xClaimJustId: XCLAIM_JUSTID,
  XCLAIM,
  xClaim: XCLAIM,
  XDEL,
  xDel: XDEL,
  XGROUP_CREATE,
  xGroupCreate: XGROUP_CREATE,
  XGROUP_CREATECONSUMER,
  xGroupCreateConsumer: XGROUP_CREATECONSUMER,
  XGROUP_DELCONSUMER,
  xGroupDelConsumer: XGROUP_DELCONSUMER,
  XGROUP_DESTROY,
  xGroupDestroy: XGROUP_DESTROY,
  XGROUP_SETID,
  xGroupSetId: XGROUP_SETID,
  XINFO_CONSUMERS,
  xInfoConsumers: XINFO_CONSUMERS,
  XINFO_GROUPS,
  xInfoGroups: XINFO_GROUPS,
  XINFO_STREAM,
  xInfoStream: XINFO_STREAM,
  XLEN,
  xLen: XLEN,
  XPENDING_RANGE,
  xPendingRange: XPENDING_RANGE,
  XPENDING,
  xPending: XPENDING,
  XRANGE,
  xRange: XRANGE,
  XREAD,
  xRead: XREAD,
  XREADGROUP,
  xReadGroup: XREADGROUP,
  XREVRANGE,
  xRevRange: XREVRANGE,
  XSETID,
  xSetId: XSETID,
  XTRIM,
  xTrim: XTRIM,
  ZADD_INCR,
  zAddIncr: ZADD_INCR,
  ZADD,
  zAdd: ZADD,
  ZCARD,
  zCard: ZCARD,
  ZCOUNT,
  zCount: ZCOUNT,
  ZDIFF_WITHSCORES,
  zDiffWithScores: ZDIFF_WITHSCORES,
  ZDIFF,
  zDiff: ZDIFF,
  ZDIFFSTORE,
  zDiffStore: ZDIFFSTORE,
  ZINCRBY,
  zIncrBy: ZINCRBY,
  ZINTER_WITHSCORES,
  zInterWithScores: ZINTER_WITHSCORES,
  ZINTER,
  zInter: ZINTER,
  ZINTERCARD,
  zInterCard: ZINTERCARD,
  ZINTERSTORE,
  zInterStore: ZINTERSTORE,
  ZLEXCOUNT,
  zLexCount: ZLEXCOUNT,
  ZMPOP,
  zmPop: ZMPOP,
  ZMSCORE,
  zmScore: ZMSCORE,
  ZPOPMAX_COUNT,
  zPopMaxCount: ZPOPMAX_COUNT,
  ZPOPMAX,
  zPopMax: ZPOPMAX,
  ZPOPMIN_COUNT,
  zPopMinCount: ZPOPMIN_COUNT,
  ZPOPMIN,
  zPopMin: ZPOPMIN,
  ZRANDMEMBER_COUNT_WITHSCORES,
  zRandMemberCountWithScores: ZRANDMEMBER_COUNT_WITHSCORES,
  ZRANDMEMBER_COUNT,
  zRandMemberCount: ZRANDMEMBER_COUNT,
  ZRANDMEMBER,
  zRandMember: ZRANDMEMBER,
  ZRANGE_WITHSCORES,
  zRangeWithScores: ZRANGE_WITHSCORES,
  ZRANGE,
  zRange: ZRANGE,
  ZRANGEBYLEX,
  zRangeByLex: ZRANGEBYLEX,
  ZRANGEBYSCORE_WITHSCORES,
  zRangeByScoreWithScores: ZRANGEBYSCORE_WITHSCORES,
  ZRANGEBYSCORE,
  zRangeByScore: ZRANGEBYSCORE,
  ZRANGESTORE,
  zRangeStore: ZRANGESTORE,
  ZRANK_WITHSCORE,
  zRankWithScore: ZRANK_WITHSCORE,
  ZRANK,
  zRank: ZRANK,
  ZREM,
  zRem: ZREM,
  ZREMRANGEBYLEX,
  zRemRangeByLex: ZREMRANGEBYLEX,
  ZREMRANGEBYRANK,
  zRemRangeByRank: ZREMRANGEBYRANK,
  ZREMRANGEBYSCORE,
  zRemRangeByScore: ZREMRANGEBYSCORE,
  ZREVRANK,
  zRevRank: ZREVRANK,
  ZSCAN,
  zScan: ZSCAN,
  ZSCORE,
  zScore: ZSCORE,
  ZUNION_WITHSCORES,
  zUnionWithScores: ZUNION_WITHSCORES,
  ZUNION,
  zUnion: ZUNION,
  ZUNIONSTORE,
  zUnionStore: ZUNIONSTORE
} as const satisfies RedisCommands;
