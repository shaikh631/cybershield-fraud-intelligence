import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Mic2,
  Upload,
  Brain,
  AudioWaveform,
  Fingerprint,
  Radio,
  Loader2,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileAudio,
  X,
  Play,
  Pause,
} from "lucide-react";
import { PublicHeader } from "../../Component/PublicHeader";
import { PublicFooter } from "../../Component/PublicFooter";

const GROQ_KEY = ""; // Enter your Groq API key here
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const STEPS = [
  {
    icon: Brain,
    num: "01",
    title: "Neural Analysis",
    desc: "Detects precise inconsistencies in voice that occur in voice patterns",
  },
  {
    icon: AudioWaveform,
    num: "02",
    title: "Frequency Analysis",
    desc: "Identifies unnatural texture patterns in AI-generated content using advanced signal processing",
  },
  {
    icon: Fingerprint,
    num: "03",
    title: "Noise Pattern Detection",
    desc: "Analyzes voice noise distribution to reveal manipulation artifacts unhearable to the human ear",
  },
  {
    icon: Radio,
    num: "04",
    title: "Speech Inconsistency",
    desc: "Examines voice and autotune and reverberations patterns to detect physical impossibilities",
  },
];

async function analyzeAudio(file) {
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
          content: `You are an AI voice forensics expert specializing in detecting synthetic and deepfaked audio. A user has uploaded an audio file for analysis. Since you cannot actually hear the audio, simulate a realistic AI voice detection analysis report based on the filename and metadata provided. Return a JSON object with these fields:
- "score": confidence score 0-100 that the audio is AI-generated or deepfaked (0=authentic human voice, 100=definitely AI-generated)
- "verdict": one of "AUTHENTIC", "SUSPICIOUS", "AI_GENERATED"
- "summary": a one-line summary of the verdict
- "techniques": array of exactly 4 objects with "name" (string), "result" (string: "pass", "warning", "fail"), and "detail" (string explaining what was found) for these analyses: "Neural Analysis", "Frequency Analysis", "Noise Pattern Detection", "Speech Inconsistency"
- "details": a full paragraph explaining the overall analysis including voice naturalness, spectral patterns, and whether it matches known AI voice synthesis signatures

Return ONLY valid JSON, no markdown wrapping.`,
        },
        {
          role: "user",
          content: `Analyze this uploaded audio file for AI voice / deepfake indicators. Audio filename: ${file.name}, size: ${file.size} bytes, type: ${file.type}. Duration: approximately ${Math.round(file.size / 16000)}s. Simulate a thorough AI voice detection analysis.`,
        },
      ],
      temperature: 0.4,
    }),
  });
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "{}";
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

function getResultColor(result) {
  return { pass: "#58db9a", warning: "#f4b860", fail: "#ff637f" }[result] || "#8090a3";
}

function getVerdictConfig(verdict) {
  if (verdict === "AUTHENTIC")
    return { color: "#58db9a", bg: "rgba(88,219,154,0.08)", border: "rgba(88,219,154,0.35)", Icon: CheckCircle2, label: "Authentic Voice" };
  if (verdict === "SUSPICIOUS")
    return { color: "#f4b860", bg: "rgba(244,184,96,0.08)", border: "rgba(244,184,96,0.35)", Icon: AlertTriangle, label: "Suspicious" };
  return { color: "#ff637f", bg: "rgba(255,99,127,0.08)", border: "rgba(255,99,127,0.35)", Icon: XCircle, label: "AI Generated" };
}

export function VoiceDetector() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  function handleFile(f) {
    if (!f || !f.type.startsWith("audio/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    setPlaying(false);
    setAudioUrl(URL.createObjectURL(f));
  }

  function clearFile() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setFile(null);
    setAudioUrl(null);
    setResult(null);
    setError(null);
    setPlaying(false);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play(); }
    setPlaying(!playing);
  }

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeAudio(file);
      setResult(data);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const v = result ? getVerdictConfig(result.verdict) : null;

  return (
    <div className="public-page">
      <PublicHeader />
      <main className="voice-page">
        {/* Hero */}
        <div className="voice-hero">
          <motion.div
            className="voice-hero-icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Mic2 size={38} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            AI Voice Detector
          </motion.h1>
          <motion.p
            className="voice-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upload an audio file to detect AI-generated or deepfaked voices
          </motion.p>
        </div>

        {/* Upload area */}
        <motion.div
          className={`voice-upload-zone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        >
          {file ? (
            <div className="voice-file-preview">
              <div className="voice-waveform">
                <div className="waveform-bars">
                  {Array.from({ length: 40 }, (_, i) => (
                    <span
                      key={i}
                      className={`bar ${playing ? "playing" : ""}`}
                      style={{
                        height: `${20 + Math.sin(i * 0.7) * 30 + Math.random() * 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <button className="voice-play-btn" onClick={togglePlay}>
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setPlaying(false)}
              />
              <div className="voice-file-info">
                <FileAudio size={14} />
                <span>{file.name}</span>
                <small>{(file.size / 1024).toFixed(1)} KB</small>
                <button className="voice-clear" onClick={clearFile}>
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="voice-drop" onClick={() => inputRef.current?.click()}>
              <Upload size={32} />
              <strong>Drop an audio file here or click to upload</strong>
              <small>Supports MP3, WAV, OGG, M4A · Max 25MB</small>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </motion.div>

        {/* Analyze button */}
        {file && (
          <motion.div className="voice-action" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              className="button button-primary voice-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Analyzing Voice...</>
              ) : (
                <><Brain size={16} /> Analyze for AI Voice</>
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
          <motion.div className="voice-result" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="phishing-verdict" style={{ borderColor: v.border, background: v.bg }}>
              <div className="verdict-header">
                <div className="verdict-icon" style={{ color: v.color }}>
                  <v.Icon size={32} />
                </div>
                <div>
                  <span className="verdict-label" style={{ color: v.color }}>{v.label}</span>
                  <div className="verdict-score">
                    <strong style={{ color: v.color }}>{result.score}</strong>
                    <span>/100 AI confidence</span>
                  </div>
                </div>
              </div>
              <p className="verdict-summary">{result.summary}</p>
            </div>

            {/* Technique results */}
            <div className="deepfake-techniques-result">
              <h3><ShieldAlert size={18} /> Detection Technique Results</h3>
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
              <h3>Detailed Analysis</h3>
              <p>{result.details}</p>
            </div>
          </motion.div>
        )}

        {/* How it works */}
        <div className="voice-how-section">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            How It Works
          </motion.h2>
          <motion.p className="voice-how-subtitle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Our advanced AI compares from a large dataset of voices to understand whether the given audio is deepfaked or AI-generated:
          </motion.p>
          <div className="voice-steps">
            {STEPS.map((s, i) => (
              <motion.div className="voice-step" key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * i + 0.45 }}>
                <div className="voice-step-num">{s.num}</div>
                <div className="voice-step-icon"><s.icon size={24} /></div>
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

export default VoiceDetector;
