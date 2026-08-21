import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Zap,
  Globe,
  Lock,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { PublicHeader } from "../../Component/PublicHeader";
import { PublicFooter } from "../../Component/PublicFooter";
const GROQ_KEY = ""; // Enter your Groq API key here
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const STEPS = [
  {
    icon: Globe,
    title: "Enter URL",
    desc: "Input any suspicious URL you'd like to analyze",
  },
  {
    icon: Zap,
    title: "Advanced Analysis",
    desc: "Our AI-powered algorithm scans for phishing patterns",
  },
  {
    icon: ShieldCheck,
    title: "Instant Results",
    desc: "Get immediate feedback on URL safety",
  },
  {
    icon: Lock,
    title: "Stay Protected",
    desc: "Shield yourself from online threats",
  },
];

async function analyzeUrl(url) {
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
          content: `You are a cybersecurity expert specializing in phishing URL detection. Analyze the given URL and return a JSON object with these fields:
- "score": risk score 0-100 (0=safe, 100=definitely phishing)
- "verdict": one of "SAFE", "SUSPICIOUS", "DANGEROUS"
- "summary": a one-line summary of the verdict
- "factors": array of objects with "name" (string) and "severity" (string: "low", "medium", "high", "critical") describing why the URL is suspicious or safe
- "details": a full paragraph explaining the analysis

Return ONLY valid JSON, no markdown wrapping.`,
        },
        {
          role: "user",
          content: `Analyze this URL for phishing indicators: ${url}`,
        },
      ],
      temperature: 0.3,
    }),
  });
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "{}";
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

function getSeverityColor(sev) {
  const map = {
    low: "#58db9a",
    medium: "#f4d060",
    high: "#f4b860",
    critical: "#ff637f",
  };
  return map[sev] || "#8090a3";
}

function getVerdictConfig(verdict) {
  if (verdict === "SAFE")
    return {
      color: "#58db9a",
      bg: "rgba(88,219,154,0.08)",
      border: "rgba(88,219,154,0.35)",
      Icon: CheckCircle2,
      label: "Safe",
    };
  if (verdict === "SUSPICIOUS")
    return {
      color: "#f4b860",
      bg: "rgba(244,184,96,0.08)",
      border: "rgba(244,184,96,0.35)",
      Icon: AlertTriangle,
      label: "Suspicious",
    };
  return {
    color: "#ff637f",
    bg: "rgba(255,99,127,0.08)",
    border: "rgba(255,99,127,0.35)",
    Icon: XCircle,
    label: "Dangerous",
  };
}

export function PhishingUrl() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeUrl(url.trim());
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  const v = result ? getVerdictConfig(result.verdict) : null;

  return (
    <div className="public-page">
      <PublicHeader />
      <main className="phishing-page">
        {/* Hero */}
        <div className="phishing-hero">
          <motion.div
            className="phishing-hero-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Shield size={38} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Phishing URL Detector
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Check if a URL is potentially dangerous
          </motion.p>
        </div>

        {/* Input */}
        <motion.form
          className="phishing-form"
          onSubmit={handleAnalyze}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="phishing-input-wrap">
            <Search size={18} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze..."
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="button button-primary phishing-btn"
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="spin" /> Analyzing...
              </>
            ) : (
              <>
                <Zap size={16} /> Analyze
              </>
            )}
          </button>
        </motion.form>

        {/* Error */}
        {error && (
          <motion.div
            className="phishing-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertTriangle size={16} /> {error}
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            className="phishing-result"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="phishing-verdict"
              style={{
                borderColor: v.border,
                background: v.bg,
              }}
            >
              <div className="verdict-header">
                <div className="verdict-icon" style={{ color: v.color }}>
                  <v.Icon size={32} />
                </div>
                <div>
                  <span className="verdict-label" style={{ color: v.color }}>
                    {v.label}
                  </span>
                  <div className="verdict-score">
                    <strong style={{ color: v.color }}>{result.score}</strong>
                    <span>/100 risk score</span>
                  </div>
                </div>
              </div>
              <p className="verdict-summary">{result.summary}</p>
            </div>

            <div className="phishing-factors">
              <h3>
                <ShieldAlert size={18} /> Risk Factors
              </h3>
              <div className="factors-list">
                {result.factors?.map((f, i) => (
                  <div className="factor-item" key={i}>
                    <span
                      className="factor-dot"
                      style={{ background: getSeverityColor(f.severity) }}
                    />
                    <span className="factor-name">{f.name}</span>
                    <span
                      className="factor-severity"
                      style={{ color: getSeverityColor(f.severity) }}
                    >
                      {f.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="phishing-details">
              <h3>Detailed Analysis</h3>
              <p>{result.details}</p>
            </div>
          </motion.div>
        )}

        {/* How it works */}
        <div className="phishing-steps-section">
          <h2>How it works</h2>
          <div className="phishing-steps">
            {STEPS.map((s, i) => (
              <motion.div
                className="phishing-step"
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 * i + 0.4 }}
              >
                <div className="step-number">{i + 1}</div>
                <div className="step-icon-wrap">
                  <s.icon size={22} />
                </div>
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

export default PhishingUrl;
