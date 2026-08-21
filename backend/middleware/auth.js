import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { fail } from "../utils/responses.js";

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  if (!token) return fail(res, "Authentication required", 401);
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return fail(res, "Invalid or expired token", 401);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return fail(res, "Insufficient permissions", 403);
    return next();
  };
}

export const requireAuth = authenticate;
export const requireRole = authorize;
