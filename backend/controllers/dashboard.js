import { Alert } from "../models/Alert.js";
import { Case } from "../models/Case.js";
import { User } from "../models/User.js";
import { ok } from "../utils/responses.js";

export async function dashboard(_req, res) {
  const [alerts, cases, users] = await Promise.all([
    Alert.find().sort({ createdAt: 1 }).lean(),
    Case.find().sort({ createdAt: 1 }).lean(),
    User.find().select("-password").sort({ name: 1 }).lean(),
  ]);
  const severity = alerts.reduce((result, alert) => { result[alert.severity] = (result[alert.severity] || 0) + 1; return result; }, {});
  return ok(res, { alerts, cases, users, severity });
}
