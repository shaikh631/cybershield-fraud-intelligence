import { useState } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  Search,
  MapPin,
  Clock,
  Activity,
  ShieldCheck,
  Building2,
  Loader2,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { PublicHeader } from "../../Component/PublicHeader";
import { PublicFooter } from "../../Component/PublicFooter";

const GROQ_KEY = ""; // Enter your Groq API key here
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const STEPS = [
  {
    icon: Activity,
    num: "01",
    title: "Transaction Patterns",
    desc: "Identifies irregular usage combining amounts, time, and purchase typologies",
  },
  {
    icon: MapPin,
    num: "02",
    title: "Geofencing",
    desc: "Detects geographically impossible transactions based on the user's previously established locations",
  },
  {
    icon: Clock,
    num: "03",
    title: "Velocity Checks",
    desc: "Analyzes rapid sequential authorization attempts and over-limit pressure",
  },
  {
    icon: Building2,
    num: "04",
    title: "Merchant Risk",
    desc: "Cross-references the merchant terminal with known high-risk categories and compromised entities",
  },
];

async function analyzeTransaction(formData) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are an AI credit card fraud analyst. Evaluate this transaction. Return a JSON object with:
- "score": fraud risk score 0-100 (0=safe, 100=highly fraudulent)
- "verdict": one of "APPROVED", "REVIEW", "DECLINED"
- "summary": one-line summary
- "techniques": array of 4 objects with "name" (string), "result" (string: "pass", "warning", "fail"), and "detail" for: "Transaction Patterns", "Geofencing", "Velocity Checks", "Merchant Risk"
- "details": full paragraph explaining the risk factors or why it's considered safe

Return ONLY valid JSON.`,
        },
        {
          role: "user",
          content: JSON.stringify(formData),
        },
      ],
      temperature: 0.3,
    }),
  });
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "{}";
  return JSON.parse(raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
}

function getResultColor(result) {
  return { pass: "#58db9a", warning: "#f4b860", fail: "#ff637f" }[result] || "#8090a3";
}

function getVerdictConfig(verdict) {
  if (verdict === "APPROVED")
    return { color: "#58db9a", bg: "rgba(88,219,154,0.08)", border: "rgba(88,219,154,0.35)", Icon: CheckCircle2, label: "Transaction Approved" };
  if (verdict === "REVIEW")
    return { color: "#f4b860", bg: "rgba(244,184,96,0.08)", border: "rgba(244,184,96,0.35)", Icon: AlertTriangle, label: "Manual Review Needed" };
  return { color: "#ff637f", bg: "rgba(255,99,127,0.08)", border: "rgba(255,99,127,0.35)", Icon: XCircle, label: "Transaction Declined (Fraudulent)" };
}

export function CardDetector() {
  const [formData, setFormData] = useState({
    cardNumber: "**** **** **** ",
    amount: "",
    currency: "USD",
    merchant: "",
    location: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeTransaction(formData);
      setResult(data);
    } catch {
      setError("AI Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const v = result ? getVerdictConfig(result.verdict) : null;

  return (
    <div className="public-page">
      <PublicHeader />
      <main className="card-page">
        {/* Hero */}
        <div className="card-hero">
          <motion.div
            className="card-hero-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CreditCard size={38} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Credit Card Fraud Detector
          </motion.h1>
          <motion.p
            className="card-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Analyze transaction parameters in real-time to detect anomalous patterns and block fraud
          </motion.p>
        </div>

        {/* Input Form */}
        <motion.div
          className="insurance-form-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="insurance-form card-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Card Number (Last 4)</label>
                <input
                  type="text"
                  placeholder="**** **** **** 1234"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </div>
              <div className="form-group amount-group">
                <label>Transaction Amount</label>
                <div className="amount-input">
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="250.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Merchant Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Best Buy #1294"
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Merchant Location</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Miami, FL"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="form-group full-width">
                <label>Time & Device Context (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 03:14 AM local time, Mobile Web"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="button button-primary card-btn"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Analyzing Transaction...</>
              ) : (
                <><ShieldCheck size={16} /> Authorize Check</>
              )}
            </button>
          </form>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div className="phishing-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertTriangle size={16} /> {error}
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div className="card-result" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="phishing-verdict" style={{ borderColor: v.border, background: v.bg }}>
              <div className="verdict-header">
                <div className="verdict-icon" style={{ color: v.color }}>
                  <v.Icon size={32} />
                </div>
                <div>
                  <span className="verdict-label" style={{ color: v.color }}>{v.label}</span>
                  <div className="verdict-score">
                    <strong style={{ color: v.color }}>{result.score}</strong>
                    <span>/100 risk score</span>
                  </div>
                </div>
              </div>
              <p className="verdict-summary">{result.summary}</p>
            </div>

            <div className="deepfake-techniques-result">
              <h3><ShieldAlert size={18} /> Risk Factors Analysis</h3>
              <div className="technique-results-grid">
                {result.techniques?.map((t, i) => {
                  const StepIcon = STEPS[i]?.icon || Search;
                  return (
                    <div className="technique-result-card" key={i} style={{ borderColor: getResultColor(t.result) + "40" }}>
                      <div className="technique-result-header">
                        <StepIcon size={18} style={{ color: getResultColor(t.result) }} />
                        <span className="technique-result-name">{t.name}</span>
                        <span className="technique-result-badge" style={{ color: getResultColor(t.result), borderColor: getResultColor(t.result) + "55", background: getResultColor(t.result) + "0d" }}>
                          {t.result.toUpperCase()}
                        </span>
                      </div>
                      <p className="technique-result-detail">{t.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="phishing-details">
              <h3>Detailed Context</h3>
              <p>{result.details}</p>
            </div>
          </motion.div>
        )}

        {/* How it works */}
        <div className="card-how-section">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            How It Works
          </motion.h2>
          <motion.p className="card-how-subtitle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Our AI analysis helps detect credit card fraudulent usage by analyzing transaction patterns in real-time:
          </motion.p>
          <div className="card-steps">
            {STEPS.map((s, i) => (
              <motion.div className="card-step" key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * i + 0.45 }}>
                <div className="card-step-num">{s.num}</div>
                <div className="card-step-icon"><s.icon size={24} /></div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

export default CardDetector;
