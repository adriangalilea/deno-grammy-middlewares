import { Context, NextFunction } from "../../deps.ts";

/**
 * Middleware that ignores messages older than the specified threshold
 * @param threshold - Time threshold in seconds (default: 5 minutes)
 * @param debug - Optional debug callback for logging ignored messages
 */
export const ignoreOld = <T extends Context>(
  threshold = 5 * 60,
  debug?: (message: string) => void,
) =>
(ctx: T, next: NextFunction) => {
  if (
    ctx.msg?.date &&
    new Date().getTime() / 1000 - ctx.msg.date > threshold
  ) {
    const debugMessage =
      `Ignoring old message from user ${ctx.from?.id} at chat ${ctx.chat?.id} (${
        new Date().getTime() / 1000
      }:${ctx.msg.date})`;
    debug?.(debugMessage);
    return;
  }
  return next();
};
