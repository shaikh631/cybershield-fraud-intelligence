import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { fail, ok } from "../utils/responses.js";

const publicUser = (user) => {
  const { password: _password, ...publicFields } = user.toObject ? user.toObject() : user;
  return publicFields;
};
const tokenFor = (user) => jwt.sign({ sub: user.email, email: user.email, role: user.role, name: user.name }, env.jwtSecret, { expiresIn: "8h" });

export async function register(req, res) {
  const { name, company, email, password, role = "Analyst" } = req.body;
  if (!name || !email || !password || password.length < 8) return fail(res, "Name, email, and a password of at least 8 characters are required", 400);
  const normalizedEmail = email.toLowerCase();
  if (await User.exists({ email: normalizedEmail })) return fail(res, "An account with that email already exists", 409);
  const user = await User.create({ name, email: normalizedEmail, role: ["Admin", "Analyst", "Investigator"].includes(role) ? role : "Analyst", department: company || "Fraud Operations", password: await bcrypt.hash(password, 12) });
  return ok(res, { token: tokenFor(user), user: publicUser(user) }, 201);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(password || "", user.password).catch(() => false))) return fail(res, "Invalid email or password", 401);
  return ok(res, { token: tokenFor(user), user: publicUser(user) });
}

export function me(req, res) {
  return User.findOne({ email: req.user.email }).then((user) => user ? ok(res, { user: publicUser(user) }) : fail(res, "User not found", 404));
}
