export function transformArguments(key: string, string: string): Array<string> {
  return ["FT.SUGDEL", key, string];
}

export { transformBooleanReply as transformReply } from "@valkey/client/dist/lib/commands/generic-transformers";
