import { analyzeFraud } from "../services/ai.js";
import { fail, ok } from "../utils/responses.js";

export async function analyze(req, res) {
  const { message, source, context, type } = req.body;
  if (!message && !source && !context) return fail(res, "Provide a message, source, or context to analyze", 400);
  try {
    return ok(res, { response: await analyzeFraud({ message, source, context, type }) });
  } catch (error) {
    return fail(res, error.status === 503 ? error.message : "AI analysis is temporarily unavailable", error.status || 502);
  }
}
