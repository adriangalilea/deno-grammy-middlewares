import { Context, NextFunction } from "../../deps.ts";

/**
 * Middleware that only allows admin users to proceed
 *
 * @param errorHandler - The error handler to use if the user is not an admin
 */
export const onlyAdmin =
  <T extends Context>(errorHandler?: (ctx: T) => unknown) =>
  async (ctx: T, next: NextFunction): Promise<unknown> => {
    // No chat = no service
    if (!ctx.chat) {
      return;
    }

    // Channels and private chats are only postable by admins
    if (["channel", "private"].includes(ctx.chat.type)) {
      return next();
    }

    // Anonymous users are always admins
    if (ctx.from?.username === "GroupAnonymousBot") {
      return next();
    }

    // Surely not an admin
    if (!ctx.from?.id) {
      return;
    }

    try {
      // Check the member status
      const chatMember = await ctx.getChatMember(ctx.from.id);
      if (["creator", "administrator"].includes(chatMember.status)) {
        return next();
      }
    } catch (error: unknown) {
      // Bot might have been kicked from the chat or other API errors
      // In this case, we can't verify admin status, so we'll deny access
      console.error(`Failed to get chat member: ${error instanceof Error ? error.message : String(error)}`);
      return errorHandler?.(ctx);
    }

    // Not an admin
    return errorHandler?.(ctx);
  };
