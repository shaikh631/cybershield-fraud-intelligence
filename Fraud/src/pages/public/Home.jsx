import { ArrowRight, ChevronRight, Network, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Badge, Button } from "../../components/ui";
import {
  IntelligenceCore,
  ThreeScene,
} from "../../components/IntelligenceCore";
import { detectionModules } from "../../data/mockData";
import { PublicFooter } from "../../Component/PublicFooter";
import { PublicHeader } from "../../Component/PublicHeader";

const workflow = [
  ["Detect", "Signals enter in real time."],
  ["Analyze", "Explainable risk factors surface."],
  ["Correlate", "Related alerts form a campaign."],
  ["Investigate", "Evidence moves into a case."],
  ["Report", "Outcomes leave audit-ready."],
];

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="public-page">
      <PublicHeader />
      <main>
        <section className="hero">
          <ThreeScene />
          <div className="hero-copy">
            <span className="eyebrow">AI-POWERED FRAUD INTELLIGENCE</span>
            <h1>
              One platform.
              <br />
              Six fraud vectors.
              <br />
              <em>Unified intelligence.</em>
            </h1>
            <p>
              Cybershield detects, analyzes, correlates, investigates, and
              reports sophisticated financial fraud before it becomes a larger
              loss.
            </p>
            <div className="hero-actions">
              <Button icon={ArrowRight} onClick={() => navigate("/contact")}>
                Request a demo
              </Button>
              <Button
                variant="ghost"
                icon={Play}
                onClick={() => navigate("/platform")}
              >
                Explore platform
              </Button>
            </div>
            <div className="workflow">
              DETECT <ChevronRight /> ANALYZE <ChevronRight /> CORRELATE{" "}
              <ChevronRight /> INVESTIGATE <ChevronRight /> REPORT
            </div>
          </div>
          <IntelligenceCore />
        </section>
        <section className="section">
          <div className="section-title">
            <div>
              <span className="eyebrow">THE PROBLEM</span>
              <h2>Fraud doesn't happen in silos.</h2>
              <p>
                Attackers move across channels. Cybershield connects the signals
                so your team can see one campaign, not six disconnected alerts.
              </p>
            </div>
          </div>
          <div className="merge">
            <div>
              {detectionModules.map((module) => (
                <div className="merge-signal" key={module.key}>
                  <module.icon size={17} style={{ color: module.color }} />
                  <span>{module.name}</span>
                  <small>signal detected</small>
                </div>
              ))}
            </div>
            <div className="merge-result">
              <Network size={23} />
              <div>
                <strong>ONE UNIFIED CASE</strong>
                <small>4 alerts correlated · 96% confidence</small>
              </div>
              <Badge tone="critical">Critical</Badge>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="section-title">
            <div>
              <span className="eyebrow">SIX DETECTION ENGINES</span>
              <h2>Six threat vectors. One defense.</h2>
              <p>
                Purpose-built AI engines work together across the full fraud
                lifecycle.
              </p>
            </div>
            <Link className="arrow-link" to="/modules">
              View all modules <ArrowRight size={14} />
            </Link>
          </div>
          <div className="module-grid">
            {detectionModules.map((module, index) => (
              <motion.div
                whileHover={{ y: -5 }}
                className="module-card"
                style={{ "--module": module.color }}
                key={module.key}
              >
                <div className="module-icon">
                  <module.icon size={20} />
                </div>
                <div className="module-top">
                  <span>0{index + 1}</span>
                  <Badge tone={module.score > 92 ? "critical" : "high"}>
                    {module.score} risk
                  </Badge>
                </div>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <div className="meter">
                  <span style={{ width: `${module.score}%` }} />
                </div>
                <Link to={`/detections/${module.key}`} className="arrow-link">
                  View module <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="section band">
          <div className="section-title">
            <div>
              <span className="eyebrow">INVESTIGATION WORKFLOW</span>
              <h2>From detection to resolution.</h2>
              <p>A single operating rhythm for every fraud signal.</p>
            </div>
          </div>
          <div className="steps">
            {workflow.map(([title, description], index) => (
              <div className="step" key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="cta">
          <div>
            <span className="eyebrow">THE CYBERSHIELD DIFFERENCE</span>
            <h2>See fraud as a connected attack.</h2>
            <p>Move from isolated detection to unified intelligence.</p>
          </div>
          <Button icon={ArrowRight} onClick={() => navigate("/login")}>
            Enter demo workspace
          </Button>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

export default Home;
