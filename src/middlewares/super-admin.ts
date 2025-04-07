import { Context, NextFunction } from "../../deps.ts";

/**
 * Middleware that only allows super admin users to proceed
 * @param superAdminId - The Telegram user ID(s) of the super admin(s)
 * @param errorHandler - Optional custom error handler
 */
export const onlySuperAdmin = <T extends Context>(
  superAdminId: number | number[],
  errorHandler?: (ctx: T) => unknown,
) =>
(ctx: T, next: NextFunction) => {
  const ids = Array.isArray(superAdminId) ? superAdminId : [superAdminId];

  if (!ctx.from?.id || !ids.includes(ctx.from.id)) {
    return errorHandler?.(ctx);
  }
  return next();
};
