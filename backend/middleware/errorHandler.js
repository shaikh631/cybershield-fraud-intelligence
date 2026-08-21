import { isProduction } from "../config/env.js";
import { fail } from "../utils/responses.js";

export function notFound(req, res) {
  return fail(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = error.statusCode || error.status || 500;
  const message =
    status >= 500 && isProduction
      ? "Internal server error"
      : error.message || "Internal server error";
  return fail(res, message, status, isProduction ? undefined : error.details);
}
