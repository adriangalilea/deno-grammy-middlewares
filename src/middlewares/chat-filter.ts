import { Context, NextFunction } from "../../deps.ts";

/**
 * Helper function to create chat type middleware
 *
 * @param isPrivate - Whether the chat should be private
 * @param errorHandler - The error handler to use if the chat is not the correct type
 */
const createChatTypeMiddleware =
  <T extends Context>(isPrivate: boolean, errorHandler?: (ctx: T) => unknown) =>
  (ctx: T, next: NextFunction) => {
    if ((ctx.chat?.type === "private") === isPrivate) {
      return next();
    }
    return errorHandler?.(ctx);
  };

/**
 * Middleware that only allows messages from public chats (non-private)
 *
 * @param errorHandler - The error handler to use if the chat is not public
 */
export const onlyPublic = <T extends Context>(
  errorHandler?: (ctx: T) => unknown,
) => createChatTypeMiddleware(false, errorHandler);

/**
 * Middleware that only allows messages from private chats (private)
 *
 * @param errorHandler - The error handler to use if the chat is not private
 */
export const onlyPrivate = <T extends Context>(
  errorHandler?: (ctx: T) => unknown,
) => createChatTypeMiddleware(true, errorHandler);
