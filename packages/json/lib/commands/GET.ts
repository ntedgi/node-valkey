import { pushVerdictArguments } from "@valkey/client/dist/lib/commands/generic-transformers";
import { ValkeyCommandArguments } from "@valkey/client/dist/lib/commands";

export const FIRST_KEY_INDEX = 1;

export const IS_READ_ONLY = true;

interface GetOptions {
  path?: string | Array<string>;
  INDENT?: string;
  NEWLINE?: string;
  SPACE?: string;
  NOESCAPE?: true;
}

export function transformArguments(
  key: string,
  options?: GetOptions
): ValkeyCommandArguments {
  let args: ValkeyCommandArguments = ["JSON.GET", key];

  if (options?.path) {
    args = pushVerdictArguments(args, options.path);
  }

  if (options?.INDENT) {
    args.push("INDENT", options.INDENT);
  }

  if (options?.NEWLINE) {
    args.push("NEWLINE", options.NEWLINE);
  }

  if (options?.SPACE) {
    args.push("SPACE", options.SPACE);
  }

  if (options?.NOESCAPE) {
    args.push("NOESCAPE");
  }

  return args;
}

export { transformValkeyJsonNullReply as transformReply } from ".";
