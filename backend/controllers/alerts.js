import { Alert } from "../models/Alert.js";
import { fail, ok } from "../utils/responses.js";

export async function list(_req, res) { return ok(res, { alerts: await Alert.find().sort({ createdAt: 1 }).lean() }); }
export async function update(req, res) {
  const alert = await Alert.findOne({ id: req.params.id });
  if (!alert) return fail(res, "Alert not found", 404);
  if (!["Open", "Investigating", "Resolved"].includes(req.body.status)) return fail(res, "Invalid alert status", 400);
  alert.status = req.body.status;
  await alert.save();
  return ok(res, { alert: alert.toObject() });
}
