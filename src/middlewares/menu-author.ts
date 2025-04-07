import { Context, NextFunction } from "../../deps.ts";

/**
 * Middleware that only allows the original menu creator to interact with it
 *
 * @param errorHandler - The error handler to use if the user is not the menu author
 */
export const onlyMenuAuthor =
  <T extends Context>(errorHandler?: (ctx: T) => unknown) =>
  (ctx: T, next: NextFunction) => {
    // Not enough data to check, just pass through
    if (
      !ctx.msg?.reply_to_message?.message_id ||
      !ctx.from?.id ||
      ctx.msg.reply_to_message.message_id === ctx.from.id
    ) {
      return next();
    }
    // Not the creator of the menu
    return errorHandler?.(ctx);
  };
