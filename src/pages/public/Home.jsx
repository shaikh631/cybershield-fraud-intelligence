import { useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, Network, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Badge, Button } from "../../components/ui";
import { SplineHero } from "../../components/SplineHero";
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

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Scope the full-height scroll-snap behaviour to this page only.
  useEffect(() => {
    document.body.classList.add("snap-scroll");
    const hero = heroRef.current;
    let frameId = 0;

    const updateHeroProgress = () => {
      frameId = 0;
      if (!hero) return;

      const progress = Math.min(
        1,
        Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight),
      );
      hero.style.setProperty("--hero-progress", progress.toFixed(3));
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
      document.body.classList.remove("snap-scroll");
    };
  }, []);

  return (
    <div className="public-page">
      <PublicHeader />
      <main className="home-main">
        <section className="hero section-full" ref={heroRef}>
          <SplineHero />
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="eyebrow">AI-POWERED FRAUD INTELLIGENCE</span>
            <h1 className="text">
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
              <Button
                className="header-demo-button"
                icon={ArrowRight}
                onClick={() => navigate("/contact")}
              >
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
          </motion.div>
        </section>

        <section className="section section-full pairing-section">
          <motion.div className="section-title" {...fadeUp}>
            <div>
              <span className="eyebrow">THE SIGNAL FLOW</span>
              <h2>One case connects every signal.</h2>
              <p>
                Attackers move across channels. Cybershield turns six disconnected
                alerts into one connected fraud campaign.
              </p>
            </div>
          </motion.div>
          <motion.div className="pairing-flow" {...fadeUp}>
            <div className="pairing-track">
              {detectionModules.map((module, index) => (
                <div className="pairing-step" key={module.key}>
                  <div className="pairing-icon">
                    <module.icon size={19} />
                  </div>
                  <span className="pairing-number">0{index + 1}</span>
                  <strong>{module.name}</strong>
                  <small>Signal detected</small>
                </div>
              ))}
            </div>
            <div className="pairing-result">
              <Network size={23} />
              <div>
                <span>KEY POINT</span>
                <p>The signals are connected into one unified case for faster investigation and a clear audit trail.</p>
              </div>
            </div>
            <div className="pairing-footer">
              <span>Ready to investigate the full picture?</span>
              <Button variant="dark" icon={ArrowRight} onClick={() => navigate("/login")}>
                Enter workspace
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="section section-full">
          <motion.div className="section-title" {...fadeUp}>
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
          </motion.div>
          <div className="module-carousel-viewport">
            <div className="module-grid module-carousel-track">
              {[...detectionModules, ...detectionModules].map(
                (module, index) => {
                  const cardIndex = index % detectionModules.length;
                  const isClone = index >= detectionModules.length;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: cardIndex * 0.06 }}
                      whileHover={{ y: -5 }}
                      className="module-card"
                      style={{ "--module": module.color }}
                      key={`${module.key}-${isClone ? "clone" : "original"}`}
                      aria-hidden={isClone}
                    >
                      <div className="module-icon">
                        <module.icon size={20} />
                      </div>
                      <div className="module-top">
                        <span>0{cardIndex + 1}</span>
                        <Badge tone={module.score > 92 ? "critical" : "high"}>
                          {module.score} risk
                        </Badge>
                      </div>
                      <h3>{module.name}</h3>
                      <p>{module.description}</p>
                      <div className="meter">
                        <span style={{ width: `${module.score}%` }} />
                      </div>
                      <Link
                        to={`/detections/${module.key}`}
                        className="arrow-link"
                        tabIndex={isClone ? -1 : 0}
                      >
                        View module <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        <section className="section band section-full workflow-band">
          <motion.div className="section-title" {...fadeUp}>
            <div>
              <span className="eyebrow">INVESTIGATION WORKFLOW</span>
              <h2>From detection to resolution.</h2>
              <p>A single operating rhythm for every fraud signal.</p>
            </div>
          </motion.div>
          <div className="steps">
            {workflow.map(([title, description], index) => (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="step"
                key={title}
              >
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section className="cta section-full" {...fadeUp}>
          <div>
            <span className="eyebrow">THE CYBERSHIELD DIFFERENCE</span>
            <h2>See fraud as a connected attack.</h2>
            <p>Move from isolated detection to unified intelligence.</p>
          </div>
          <Button icon={ArrowRight} onClick={() => navigate("/login")}>
            Enter demo workspace
          </Button>
        </motion.section>
      </main>
      <PublicFooter />
    </div>
  );
}

export default Home;
