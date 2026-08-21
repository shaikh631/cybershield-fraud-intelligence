import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export function Home() {
  const go = useNavigate();
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
              <Button icon={ArrowRight} onClick={() => go("/contact")}>
                Request a demo
              </Button>
              <Button
                variant="ghost"
                icon={Play}
                onClick={() => go("/platform")}
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
          <Title
            eyebrow="THE PROBLEM"
            title="Fraud doesn't happen in silos."
            copy="Attackers move across channels. Cybershield connects the signals so your team can see one campaign, not six disconnected alerts."
          />
          <div className="merge">
            <div>
              {MODULES.map((m) => (
                <div className="merge-signal" key={m.key}>
                  <m.icon size={17} style={{ color: m.color }} />
                  <span>{m.name}</span>
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
          <Title
            eyebrow="SIX DETECTION ENGINES"
            title="Six threat vectors. One defense."
            copy="Purpose-built AI engines work together across the full fraud lifecycle."
            action={
              <Link className="arrow-link" to="/modules">
                View all modules <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="module-grid">
            {MODULES.map((m, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                className="module-card"
                style={{ "--module": m.color }}
                key={m.key}
              >
                <div className="module-icon">
                  <m.icon size={20} />
                </div>
                <div className="module-top">
                  <span>0{i + 1}</span>
                  <Badge tone={m.score > 92 ? "critical" : "high"}>
                    {m.score} risk
                  </Badge>
                </div>
                <h3>{m.name}</h3>
                <p>{m.description}</p>
                <div className="meter">
                  <span style={{ width: `${m.score}%` }} />
                </div>
                <Link to={`/detections/${m.key}`} className="arrow-link">
                  View module <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="section band">
          <Title
            eyebrow="INVESTIGATION WORKFLOW"
            title="From detection to resolution."
            copy="A single operating rhythm for every fraud signal."
          />
          <div className="steps">
            {["Detect", "Analyze", "Correlate", "Investigate", "Report"].map(
              (s, i) => (
                <div className="step" key={s}>
                  <span>0{i + 1}</span>
                  <strong>{s}</strong>
                  <p>
                    {
                      [
                        "Signals enter in real time.",
                        "Explainable risk factors surface.",
                        "Related alerts form a campaign.",
                        "Evidence moves into a case.",
                        "Outcomes leave audit-ready.",
                      ][i]
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
        <section className="cta">
          <div>
            <span className="eyebrow">THE CYBERSHIELD DIFFERENCE</span>
            <h2>See fraud as a connected attack.</h2>
            <p>Move from isolated detection to unified intelligence.</p>
          </div>
          <Button icon={ArrowRight} onClick={() => go("/login")}>
            Enter demo workspace
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}