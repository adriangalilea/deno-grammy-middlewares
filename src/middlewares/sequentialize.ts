import { baseSequentialize, Context } from "../../deps.ts";

/**
 * Default function to get the sequential identifier from context
 * @param ctx - The context to get the identifier from
 * @returns The sequential identifier
 */
export const defaultGetSessionKey = <T extends Context>(
  ctx: T,
): string | undefined => {
  return ctx.chat?.id.toString();
};

/**
 * Basic sequentialize middleware to avoid race conditions
 * Uses the chat id as a sequential identifier by default
 *
 * TODO: Will be updated when grammY 2.0 is released.
 *
 * @returns Middleware that sequentializes updates
 */
export const sequentialize = <T extends Context>() =>
  baseSequentialize<T>(defaultGetSessionKey);
