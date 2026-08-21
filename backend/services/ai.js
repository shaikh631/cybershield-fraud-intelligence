import axios from "axios";
import { env } from "../config/env.js";

function parseAnalysis(content) {
  try {
    const parsed = JSON.parse(content.replace(/^```json\s*|\s*```$/g, ""));
    return parsed;
  } catch {
    return { riskLevel: "UNKNOWN", riskScore: null, isFraud: null, reason: content, recommendation: "Review manually" };
  }
}

export async function analyzeFraud(input) {
  if (!env.groqApiKey) {
    const error = new Error("AI service is not configured");
    error.status = 503;
    throw error;
  }
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: env.groqModel,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a fraud analyst. Return only JSON with riskLevel (LOW, MEDIUM, HIGH, CRITICAL), riskScore (0-100), isFraud (boolean), reason (string), and recommendation (string)." },
        { role: "user", content: JSON.stringify(input) },
      ],
    },
    { headers: { Authorization: `Bearer ${env.groqApiKey}`, "Content-Type": "application/json" }, timeout: 30000 },
  );
  return parseAnalysis(response.data.choices?.[0]?.message?.content || "No analysis returned");
}
