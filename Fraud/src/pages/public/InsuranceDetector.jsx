import { useState } from "react";
import { motion } from "motion/react";
import {
  HeartPulse,
  FileText,
  Brain,
  Network,
  Database,
  Search,
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
    icon: Brain,
    num: "01",
    title: "AI Content Detection",
    desc: "Analyzes claim descriptions for patterns indicative of AI-generated or scripted narratives",
  },
  {
    icon: Database,
    num: "02",
    title: "Historical Pattern Matching",
    desc: "Compares claim details against a massive dataset of known fraudulent insurance typologies",
  },
  {
    icon: Search,
    num: "03",
    title: "Inconsistency Analysis",
    desc: "Identifies logical impossibilities in timelines, locations, and incident details",
  },
  {
    icon: Network,
    num: "04",
    title: "Network Graphing",
    desc: "Links claim entities to organized fraud rings and synthetic identities within our intelligence network",
  },
];

async function analyzeClaim(formData) {
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
          content: `You are an AIML insurance fraud analyst. Evaluate this insurance claim. Return a JSON object with:
- "score": fraud risk score 0-100 (0=legitimate, 100=highly fraudulent)
- "verdict": one of "LEGITIMATE", "SUSPICIOUS", "FRAUDULENT"
- "summary": one-line summary
- "techniques": array of 4 objects with "name" (string), "result" (string: "pass", "warning", "fail"), and "detail" for: "AI Content Detection", "Pattern Matching", "Inconsistency Analysis", "Network Graphing"
- "details": full paragraph explaining the anomalies or legitimacy indicators

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
  if (verdict === "LEGITIMATE")
    return { color: "#58db9a", bg: "rgba(88,219,154,0.08)", border: "rgba(88,219,154,0.35)", Icon: CheckCircle2, label: "Legitimate Claim" };
  if (verdict === "SUSPICIOUS")
    return { color: "#f4b860", bg: "rgba(244,184,96,0.08)", border: "rgba(244,184,96,0.35)", Icon: AlertTriangle, label: "Suspicious Activity" };
  return { color: "#ff637f", bg: "rgba(255,99,127,0.08)", border: "rgba(255,99,127,0.35)", Icon: XCircle, label: "Fraudulent Claim" };
}

export function InsuranceDetector() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    claimType: "auto",
    amount: "",
    date: "",
    description: "",
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
      const data = await analyzeClaim(formData);
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
      <main className="insurance-page">
        {/* Hero */}
        <div className="insurance-hero">
          <motion.div
            className="insurance-hero-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HeartPulse size={38} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Insurance Claims AI Analysis
          </motion.h1>
          <motion.p
            className="insurance-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Submit claim details to detect historical deception patterns and AI-generated narratives
          </motion.p>
        </div>

        {/* Input Form */}
        <motion.div
          className="insurance-form-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="insurance-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Policy Number</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. POL-19283746"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Claim Type</label>
                <select
                  value={formData.claimType}
                  onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                >
                  <option value="auto">Auto Insurance</option>
                  <option value="health">Health / Medical</option>
                  <option value="property">Home / Property</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
              <div className="form-group">
                <label>Claim Amount ($)</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 15000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Incident Date</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Incident Description</label>
              <textarea
                required
                rows={5}
                placeholder="Describe exactly what happened..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="button button-primary insurance-btn"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Running ML Models...</>
              ) : (
                <><FileText size={16} /> Analyze Claim</>
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
          <motion.div className="insurance-result" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="phishing-verdict" style={{ borderColor: v.border, background: v.bg }}>
              <div className="verdict-header">
                <div className="verdict-icon" style={{ color: v.color }}>
                  <v.Icon size={32} />
                </div>
                <div>
                  <span className="verdict-label" style={{ color: v.color }}>{v.label}</span>
                  <div className="verdict-score">
                    <strong style={{ color: v.color }}>{result.score}</strong>
                    <span>/100 fraud risk</span>
                  </div>
                </div>
              </div>
              <p className="verdict-summary">{result.summary}</p>
            </div>

            <div className="deepfake-techniques-result">
              <h3><ShieldAlert size={18} /> AIML Analysis Results</h3>
              <div className="technique-results-grid">
                {result.techniques?.map((t, i) => {
                  const StepIcon = STEPS[i]?.icon || Brain;
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
              <h3>Detailed Explanations</h3>
              <p>{result.details}</p>
            </div>
          </motion.div>
        )}

        {/* How it works */}
        <div className="insurance-how-section">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            How AIML Detects Fraud
          </motion.h2>
          <motion.p className="insurance-how-subtitle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Our advanced AI algorithms compare claim details against a massive dataset of known fraud patterns:
          </motion.p>
          <div className="insurance-steps">
            {STEPS.map((s, i) => (
              <motion.div className="insurance-step" key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * i + 0.45 }}>
                <div className="insurance-step-num">{s.num}</div>
                <div className="insurance-step-icon"><s.icon size={24} /></div>
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

export default InsuranceDetector;
