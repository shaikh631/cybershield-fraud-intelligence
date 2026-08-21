import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Upload,
  Brain,
  Globe2,
  FileWarning,
  Link2,
  Loader2,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Type,
  X,
  Search,
} from "lucide-react";
import { PublicHeader } from "../../Component/PublicHeader";
import { PublicFooter } from "../../Component/PublicFooter";

const GROQ_KEY = ""; // Enter your Groq API key here
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const STEPS = [
  {
    icon: Brain,
    num: "01",
    title: "Plagiarism & AI Detection",
    desc: "Identifies email patterns to determine whether the content is AI-generated or scripted",
  },
  {
    icon: Globe2,
    num: "02",
    title: "Domain Intelligence",
    desc: "Cross-references sender headers against a massive dataset of reported phishing campaigns",
  },
  {
    icon: FileWarning,
    num: "03",
    title: "Social Engineering",
    desc: "Detects urgency, fear flags, manipulative phrasing, and psychological pressure tactics",
  },
  {
    icon: Link2,
    num: "04",
    title: "Payload Analysis",
    desc: "Scans for malicious links, hidden homoglyph domains, and suspicious attachments",
  },
];

async function analyzeEmail(payload) {
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
          content: `You are an AI phishing email forensics expert. Evaluate this email input. Return a JSON object with:
- "score": phishing risk score 0-100 (0=safe, 100=highly malicious)
- "verdict": one of "CLEAN", "SUSPICIOUS", "PHISHING"
- "summary": one-line summary
- "techniques": array of 4 objects with "name" (string), "result" (string: "pass", "warning", "fail"), and "detail" for: "Plagiarism & AI Detection", "Domain Intelligence", "Social Engineering", "Payload Analysis"
- "details": full paragraph explaining the risk factors or why it's considered safe

Return ONLY valid JSON.`,
        },
        {
          role: "user",
          content: typeof payload === "string" 
            ? `Analyze this raw email text for phishing indicators: \n\n${payload}`
            : `Analyze this uploaded email screenshot for phishing indicators. Filename: ${payload.name}, size: ${payload.size} bytes. (Simulate visual analysis of email headers, content, and links).`,
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
  if (verdict === "CLEAN")
    return { color: "#58db9a", bg: "rgba(88,219,154,0.08)", border: "rgba(88,219,154,0.35)", Icon: CheckCircle2, label: "Clean Email" };
  if (verdict === "SUSPICIOUS")
    return { color: "#f4b860", bg: "rgba(244,184,96,0.08)", border: "rgba(244,184,96,0.35)", Icon: AlertTriangle, label: "Suspicious Warning" };
  return { color: "#ff637f", bg: "rgba(255,99,127,0.08)", border: "rgba(255,99,127,0.35)", Icon: XCircle, label: "Phishing Detected" };
}

export function EmailDetector() {
  const [mode, setMode] = useState("text"); // "text" or "image"
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  function handleFile(f) {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  }

  const handleSubmit = async () => {
    if (mode === "text" && !textInput.trim()) return;
    if (mode === "image" && !file) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeEmail(mode === "text" ? textInput : file);
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
      <main className="email-page">
        {/* Hero */}
        <div className="email-hero">
          <motion.div
            className="email-hero-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Mail size={38} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Phishing Email Detector
          </motion.h1>
          <motion.p
            className="email-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Paste email content or upload a screenshot to detect AI-generated phishing patterns
          </motion.p>
        </div>

        {/* Input Toggle */}
        <motion.div className="email-mode-toggle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <button className={mode === "text" ? "active" : ""} onClick={() => setMode("text")}>
            <Type size={16} /> Text Analysis
          </button>
          <button className={mode === "image" ? "active" : ""} onClick={() => setMode("image")}>
            <ImageIcon size={16} /> Image Scan
          </button>
        </motion.div>

        {/* Input Area */}
        <motion.div
          className="email-input-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {mode === "text" ? (
            <textarea
              className="email-textarea"
              placeholder="Paste the raw email content or headers here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          ) : (
            <div
              className={`email-upload-zone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            >
              {file ? (
                <div className="email-file-preview">
                  <img src={previewUrl} alt="Email Screenshot" />
                  <div className="email-file-info">
                    <ImageIcon size={14} />
                    <span>{file.name}</span>
                    <button className="email-clear" onClick={clearFile}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="email-drop" onClick={() => inputRef.current?.click()}>
                  <Upload size={32} />
                  <strong>Drop email screenshot here or click to upload</strong>
                  <small>Supports JPG, PNG, WebP · Max 10MB</small>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          )}
        </motion.div>

        {/* Analyze button */}
        {(mode === "text" ? textInput.trim().length > 0 : file) && (
          <motion.div className="email-action" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              className="button button-primary email-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Scanning with AI...</>
              ) : (
                <><Search size={16} /> Analyze Email</>
              )}
            </button>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div className="phishing-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertTriangle size={16} /> {error}
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div className="email-result" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="phishing-verdict" style={{ borderColor: v.border, background: v.bg }}>
              <div className="verdict-header">
                <div className="verdict-icon" style={{ color: v.color }}>
                  <v.Icon size={32} />
                </div>
                <div>
                  <span className="verdict-label" style={{ color: v.color }}>{v.label}</span>
                  <div className="verdict-score">
                    <strong style={{ color: v.color }}>{result.score}</strong>
                    <span>/100 phishing probability</span>
                  </div>
                </div>
              </div>
              <p className="verdict-summary">{result.summary}</p>
            </div>

            <div className="deepfake-techniques-result">
              <h3><ShieldAlert size={18} /> Phishing Vectors Analysis</h3>
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
              <h3>Contextual Review</h3>
              <p>{result.details}</p>
            </div>
          </motion.div>
        )}

        {/* How it works */}
        <div className="email-how-section">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            How It Works
          </motion.h2>
          <motion.p className="email-how-subtitle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Our plagiarism detection identifies patterns comparing against a dataset of reported suspicious emails:
          </motion.p>
          <div className="email-steps">
            {STEPS.map((s, i) => (
              <motion.div className="email-step" key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * i + 0.45 }}>
                <div className="email-step-num">{s.num}</div>
                <div className="email-step-icon"><s.icon size={24} /></div>
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

export default EmailDetector;
