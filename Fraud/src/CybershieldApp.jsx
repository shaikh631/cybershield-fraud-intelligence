import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Database,
  FileBarChart,
  FileSearch,
  Fingerprint,
  HeartPulse,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  Mic2,
  MoreHorizontal,
  Network,
  PanelLeftClose,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles as SparklesIcon,
  Target,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { AuthFlow, ForgotPassword, Verification } from "./AuthPages";
import { detectionModules as MODULES, users as USERS } from "./data/mockData";
import { FraudProvider, useFraud } from "./context/FraudContext";
import { Badge, Button, Logo, PageTitle as Title } from "./components/ui";
import { IntelligenceCore, ThreeScene } from "./components/IntelligenceCore";
import { PublicHeader } from "./Component/PublicHeader";
import { PublicFooter } from "./Component/PublicFooter";
import { Breadcrumb } from "./Component/Breadcrumb";
import "./cybershield.css";

function PublicPage({ eyebrow, title, copy, children }) {
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="public-main">
        <div className="intro">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
export function Platform() {
  return (
    <PublicPage
      eyebrow="PLATFORM"
      title="One platform for complete fraud intelligence"
      copy="Bring detection, correlation, investigation, and reporting into one operating system for fraud teams."
    >
      <div className="architecture">
        {[
          "INPUTS",
          "SIX DETECTION ENGINES",
          "CORRELATION ENGINE",
          "CASE MANAGEMENT",
          "REPORTING",
        ].map((x, i) => (
          <div key={x}>
            <span>0{i + 1}</span>
            <strong>{x}</strong>
            {i < 4 && <ArrowRight size={16} />}
          </div>
        ))}
      </div>
      <div className="feature-grid">
        {[
          ["Real-time detection", Activity],
          ["Cross-module correlation", Network],
          ["Case management", BriefcaseBusiness],
          ["Compliance reporting", FileBarChart],
          ["Audit trail", FileSearch],
          ["Explainable AI", Target],
        ].map(([x, I]) => (
          <div className="feature" key={x}>
            <I size={19} />
            <strong>{x}</strong>
            <span>
              Operational <Check size={14} />
            </span>
          </div>
        ))}
      </div>
    </PublicPage>
  );
}
export function Modules() {
  return (
    <PublicPage
      eyebrow="DETECTION MODULES"
      title="Six detection engines"
      copy="Specialized intelligence for the fraud vectors converging on modern financial institutions."
    >
      <div className="module-grid large">
        {MODULES.map((m) => (
          <Link
            to={`/detections/${m.key}`}
            className="module-card"
            style={{ "--module": m.color }}
            key={m.key}
          >
            <div className="module-icon">
              <m.icon size={23} />
            </div>
            <div className="module-top">
              <span>ACTIVE ENGINE</span>
              <Badge tone="success">Online</Badge>
            </div>
            <h3>{m.name}</h3>
            <p>{m.description}</p>
            <div className="score-line">
              <strong>{m.score}</strong>
              <span>/100 median risk score</span>
            </div>
            <span className="arrow-link">
              Open engine <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </PublicPage>
  );
}
export function Security() {
  return (
    <PublicPage
      eyebrow="TRUST & CONTROL"
      title="Security built for financial intelligence"
      copy="Every workflow is designed around least privilege, traceability, and controlled investigation access."
    >
      <div className="security-layout">
        <div className="security-visual">
          <ShieldCheck size={47} />
          <strong>CONTROL PLANE</strong>
          <span>All systems operational</span>
        </div>
        <div className="security-list">
          {[
            ["Authentication", "2FA · SSO · Role-based access", LockKeyhole],
            [
              "Data security",
              "Encryption · PII protection · Access controls",
              Database,
            ],
            [
              "Monitoring",
              "Audit logs · Security events · Health signals",
              Activity,
            ],
            ["Compliance", "PCI-DSS · GDPR · SOC 2 · SOX", Check],
          ].map(([x, y, I]) => (
            <div className="security-item" key={x}>
              <I size={20} />
              <div>
                <strong>{x}</strong>
                <p>{y}</p>
              </div>
              <ChevronRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </PublicPage>
  );
}
export function About() {
  return (
    <PublicPage
      eyebrow="ABOUT CYBERSHIELD"
      title="Connecting the signals behind modern fraud"
      copy="Cybershield gives financial institutions a unified intelligence layer for detecting and investigating multi-vector fraud."
    >
      <div className="about-grid">
        {[
          [
            "Problem",
            "Fraud teams are asked to understand connected attacks with disconnected tools.",
          ],
          [
            "Solution",
            "Six specialized detection engines feed one correlation and investigation workflow.",
          ],
          [
            "Vision",
            "Make every signal explainable, every case actionable, and every outcome audit-ready.",
          ],
        ].map(([x, y], i) => (
          <div className="about-card" key={x}>
            <span>0{i + 1}</span>
            <h3>{x}</h3>
            <p>{y}</p>
          </div>
        ))}
      </div>
      <div className="mission">
        <SparklesIcon size={22} />
        <strong>Our mission</strong>
        <p>
          Give financial institutions a unified intelligence layer for detecting
          and investigating modern multi-vector fraud.
        </p>
      </div>
    </PublicPage>
  );
}
export function Contact() {
  const { notify } = useFraud();
  const [sent, setSent] = useState(false);
  return (
    <PublicPage
      eyebrow="ENTERPRISE CONTACT"
      title="Bring unified intelligence to your fraud team"
      copy="Tell us where your investigation workflow needs more signal. This demo form is frontend-only."
    >
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          notify("Demo request received in mock workspace");
        }}
      >
        {["Name", "Company", "Work email", "Phone"].map((x) => (
          <label key={x}>
            {x}
            <input required placeholder={`Enter ${x.toLowerCase()}`} />
          </label>
        ))}
        <label>
          Company size
          <select>
            <option>500 - 1,000</option>
            <option>1,000 - 5,000</option>
            <option>5,000+</option>
          </select>
        </label>
        <label>
          Message
          <textarea rows="5" placeholder="What are you trying to detect?" />
        </label>
        <Button icon={sent ? Check : ArrowRight}>
          {sent ? "Request received" : "Request a demo"}
        </Button>
      </form>
    </PublicPage>
  );
}
const NAV = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Alerts", path: "/alerts", icon: AlertTriangle },
  { label: "Cases", path: "/cases", icon: BriefcaseBusiness },
  { label: "Correlation", path: "/correlation", icon: Network },
  { label: "Evidence", path: "/evidence", icon: FileSearch },
  { label: "Reports", path: "/reports", icon: FileBarChart },
  { label: "Audit Logs", path: "/audit-log", icon: Activity, roles: ["Admin"] },
  { label: "Team", path: "/team", icon: Users, roles: ["Admin"] },
  { label: "Settings", path: "/settings", icon: Settings },
];
export function Shell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("cybershield_user") || "{}");
  const nav = NAV.filter(
    (x) => !x.roles || x.roles.includes(user.role || "Admin"),
  );
  return (
    <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="side-head">
          <Logo />
          <button className="icon-button" onClick={() => setCollapsed(true)}>
            <PanelLeftClose size={16} />
          </button>
        </div>
        <div className="demo-tag">
          <span className="status-dot" /> DEMO ENVIRONMENT
        </div>
        <nav className="side-nav">
          <span className="side-label">WORKSPACE</span>
          {nav.map((x) => (
            <NavLink key={x.path} to={x.path}>
              <x.icon size={16} />
              <span>{x.label}</span>
            </NavLink>
          ))}
          <span className="side-label">DETECTION MODULES</span>
          {MODULES.map((x) => (
            <NavLink key={x.key} to={`/detections/${x.key}`}>
              <x.icon size={16} />
              <span>{x.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <NavLink to="/profile">
            <CircleUserRound size={16} />
            <span>{user.name || "Ayan Shaikh"}</span>
          </NavLink>
          <button
            onClick={() => {
              localStorage.removeItem("cybershield_user");
              navigate("/login");
            }}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <main className="app-main">
        <header className="topbar">
          <button
            className="icon-button expand"
            onClick={() => setCollapsed(false)}
          >
            <Menu size={18} />
          </button>
          <Breadcrumb />
          <div className="global-search">
            <Search size={15} />
            <input placeholder="Search alerts, cases, entities..." />
          </div>
          <div className="top-actions">
            <span className="system">
              <span className="status-dot" /> Operational
            </span>
            <Bell size={17} />
            <div className="user-chip">
              <span className="avatar">AS</span>
              <span>
                <strong>{user.name || "Ayan Shaikh"}</strong>
                <small>{user.role || "Admin"} · Demo</small>
              </span>
            </div>
          </div>
        </header>
        <motion.div
          className="app-content"
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
function AppPage({ eyebrow, title, copy, action, children }) {
  return (
    <>
      <Title eyebrow={eyebrow} title={title} copy={copy} action={action} />
      {children}
    </>
  );
}
function KPI({ label, value, detail, tone = "" }) {
  return (
    <div className="kpi">
      <span className={`kpi-icon ${tone}`}>
        <Activity size={15} />
      </span>
      <small>{label}</small>
      <strong>{value}</strong>
      <em>{detail}</em>
    </div>
  );
}
function RiskMeter() {
  return (
    <div className="risk-meter">
      <div className="meter-circle">
        <div>
          <strong>87</strong>
          <span>HIGH RISK</span>
        </div>
      </div>
      <div className="risk-breakdown">
        <span>
          <i className="red" />
          Critical <b>184</b>
        </span>
        <span>
          <i className="orange" />
          High <b>427</b>
        </span>
        <span>
          <i className="yellow" />
          Medium <b>1,284</b>
        </span>
        <span>
          <i className="blue" />
          Low <b>10,952</b>
        </span>
      </div>
    </div>
  );
}
function AlertTable({ rows }) {
  const { updateAlert } = useFraud();
  const navigate = useNavigate();
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Source</th>
            <th>Threat</th>
            <th>Risk</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Assigned</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const m = MODULES.find((x) => x.key === a.source);
            return (
              <tr key={a.id} onClick={() => navigate(`/alerts/${a.id}`)}>
                <td className="mono">{a.id}</td>
                <td>
                  <span className="source">
                    <m.icon size={14} style={{ color: m.color }} />
                    {m.name}
                  </span>
                </td>
                <td className="threat">{a.threat}</td>
                <td>
                  <strong
                    className={a.riskScore > 90 ? "risk-critical" : "risk-high"}
                  >
                    {a.riskScore}
                  </strong>
                </td>
                <td>
                  <Badge tone={a.severity.toLowerCase()}>{a.severity}</Badge>
                </td>
                <td>{a.status}</td>
                <td>{a.assignedTo}</td>
                <td>
                  <button
                    className="icon-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAlert(
                        a.id,
                        a.status === "Resolved" ? "Open" : "Resolved",
                      );
                    }}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export function Dashboard() {
  const { alerts, cases } = useFraud();
  const chart = [
    { n: "08:00", v: 18 },
    { n: "10:00", v: 35 },
    { n: "12:00", v: 28 },
    { n: "14:00", v: 48 },
    { n: "16:00", v: 42 },
    { n: "18:00", v: 62 },
  ];
  return (
    <AppPage
      eyebrow="OVERVIEW"
      title="Good morning, Ayan."
      copy="Here's your fraud intelligence overview."
    >
      <div className="kpi-grid">
        <KPI label="Total alerts" value="12,847" detail="+12.8% vs last week" />
        <KPI
          label="Critical alerts"
          value="184"
          detail="21 need attention"
          tone="red"
        />
        <KPI
          label="Open cases"
          value={327 + cases.length}
          detail="8 due today"
          tone="orange"
        />
        <KPI
          label="Fraud prevented"
          value="₹4.82 Cr"
          detail="+18.4% this month"
          tone="green"
        />
        <KPI
          label="Detection accuracy"
          value="96.4%"
          detail="Across 6 engines"
          tone="violet"
        />
      </div>
      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">SIGNAL VOLUME</span>
              <h3>Detection activity</h3>
            </div>
            <Badge tone="success">Live · 24h</Badge>
          </div>
          <ResponsiveContainer width="100%" height={245}>
            <AreaChart data={chart}>
              <defs>
                <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#39d6ff" stopOpacity=".35" />
                  <stop offset="1" stopColor="#39d6ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff10" vertical={false} />
              <XAxis
                dataKey="n"
                stroke="#65758b"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#65758b" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#111925",
                  border: "1px solid #26364b",
                }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#39d6ff"
                fill="url(#fill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">RISK OVERVIEW</span>
              <h3>Current posture</h3>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <RiskMeter />
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">LIVE ALERTS</span>
            <h3>Latest signals</h3>
          </div>
          <Link className="arrow-link" to="/alerts">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <AlertTable rows={alerts.slice(0, 7)} />
      </div>
    </AppPage>
  );
}
export function AlertsPage() {
  const { alerts } = useFraud();
  const [q, setQ] = useState("");
  return (
    <AppPage
      eyebrow="ALERT MANAGEMENT"
      title="All alerts"
      copy="Prioritize, assign, and investigate every signal across the six engines."
      action={<Button icon={Plus}>Create alert</Button>}
    >
      <div className="toolbar">
        <div className="field-search">
          <Search size={15} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search alerts..."
          />
        </div>
        <Button variant="ghost">
          Source <ChevronRight size={14} />
        </Button>
        <Button variant="ghost">
          Severity <ChevronRight size={14} />
        </Button>
        <Button variant="ghost">
          Status <ChevronRight size={14} />
        </Button>
      </div>
      <div className="panel">
        <AlertTable
          rows={alerts.filter((a) =>
            `${a.id} ${a.threat} ${a.source}`
              .toLowerCase()
              .includes(q.toLowerCase()),
          )}
        />
      </div>
    </AppPage>
  );
}
export function AlertDetails({ id }) {
  const { alerts, createCase, updateAlert } = useFraud();
  const alert = alerts.find((a) => a.id === id) || alerts[0];
  const m = MODULES.find((x) => x.key === alert.source);
  return (
    <AppPage
      eyebrow="ALERT DETAILS"
      title={alert.threat}
      copy={`${alert.id} · Detected ${alert.timestamp} · Assigned to ${alert.assignedTo}`}
      action={
        <>
          <Button
            variant="ghost"
            onClick={() => updateAlert(alert.id, "Resolved")}
          >
            Dismiss
          </Button>
          <Button icon={BriefcaseBusiness} onClick={() => createCase(alert)}>
            Create case
          </Button>
        </>
      }
    >
      <div className="detail-grid">
        <div className="panel score-panel">
          <div className="score-big" style={{ color: m.color }}>
            {alert.riskScore}
            <small>/ 100</small>
          </div>
          <Badge tone="critical">{alert.severity}</Badge>
          <p>
            Risk score calculated from the {m.name} engine with explainable
            contributing factors.
          </p>
          <div className="detail-meta">
            <span>
              Status<strong>{alert.status}</strong>
            </span>
            <span>
              Source<strong>{m.name}</strong>
            </span>
            <span>
              Case<strong>{alert.caseId || "Unlinked"}</strong>
            </span>
          </div>
        </div>
        <div className="panel">
          <span className="eyebrow">RISK FACTORS</span>
          <h3>Why this was flagged</h3>
          <div className="factors">
            {[
              "Suspicious sender",
              "Unusual location",
              "New device",
              "Known phishing pattern",
              "Behavior deviation",
            ].map((x, i) => (
              <div key={x}>
                <span>{x}</span>
                <b>
                  <i style={{ width: `${96 - i * 7}%` }} />
                </b>
                <small>{96 - i * 7}%</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">EVIDENCE</span>
            <h3>Associated investigation artifacts</h3>
          </div>
          <Button variant="ghost" icon={FileSearch}>
            Open evidence
          </Button>
        </div>
        <div className="evidence-grid">
          {[
            "Raw signal payload",
            "Reputation snapshot",
            "Entity relationship",
            "Analyst notes",
          ].map((x) => (
            <div className="evidence-tile" key={x}>
              <FileSearch size={18} />
              <span>{x}</span>
              <small>Available · mock</small>
            </div>
          ))}
        </div>
      </div>
    </AppPage>
  );
}
export function Detection({ type }) {
  const m = MODULES.find((x) => x.key === type) || MODULES[0];
  const [done, setDone] = useState(false);
  return (
    <AppPage
      eyebrow="DETECTION WORKBENCH"
      title={m.name}
      copy={m.description}
      action={<Badge tone="success">Engine online · v2.4.1</Badge>}
    >
      <div className="workbench">
        <div className="panel form-panel">
          <span className="eyebrow">ANALYSIS INPUT</span>
          <h3>Submit a signal</h3>
          <label>
            Source identifier
            <input
              placeholder={
                type === "url"
                  ? "https://secure-bank-verification.example"
                  : type === "email"
                    ? "security@bank-alerts.example"
                    : "Upload or enter signal reference"
              }
            />
          </label>
          <label>
            Context
            <textarea
              rows="5"
              placeholder="Add optional context for the mock analysis..."
            />
          </label>
          <div className="upload">
            <FileSearch size={20} />
            <strong>Drop files here or browse</strong>
            <small>Frontend demo · no data leaves your browser</small>
          </div>
          <Button icon={Zap} onClick={() => setDone(true)}>
            {done ? "Analysis complete" : "Analyze signal"}
          </Button>
        </div>
        <div className="panel result-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">AI ANALYSIS</span>
              <h3>{done ? "Signal assessment" : "Ready for signal"}</h3>
            </div>
            <span className="live">
              <span className="status-dot" /> Simulated
            </span>
          </div>
          {done ? (
            <>
              <div className="result-score">
                <strong>{m.score}</strong>
                <span>/100</span>
                <Badge tone={m.score > 92 ? "critical" : "high"}>
                  {m.score > 92 ? "Critical" : "High"}
                </Badge>
              </div>
              <div className="factors">
                {[
                  "Urgency language",
                  "Sender spoofing",
                  "Credential harvesting",
                  "Known threat pattern",
                ].map((x, i) => (
                  <div key={x}>
                    <span>{x}</span>
                    <b>
                      <i
                        style={{
                          width: `${m.score - i * 8}%`,
                          background: m.color,
                        }}
                      />
                    </b>
                    <small>{m.score - i * 8}%</small>
                  </div>
                ))}
              </div>
              <div className="analysis-note">
                <Target size={17} />
                <span>
                  <strong>Explainable recommendation</strong>Quarantine signal
                  and initiate investigation.
                </span>
              </div>
            </>
          ) : (
            <div className="empty">
              <Target size={38} />
              <strong>Awaiting input</strong>
              <p>
                Run a simulated analysis to see risk factors and recommended
                action.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppPage>
  );
}
export function Correlation() {
  return (
    <AppPage
      eyebrow="CORRELATION ENGINE"
      title="See the attack as a connected chain."
      copy="Join signals across modules into one explainable campaign view."
      action={<Button icon={BriefcaseBusiness}>Create unified case</Button>}
    >
      <div className="correlation">
        <div className="graph">
          <IntelligenceCore compact />
          <span className="graph-node a">
            <Mail size={15} /> Phishing email <small>AL-10482</small>
          </span>
          <span className="graph-node b">
            <Link2 size={15} /> Malicious URL <small>AL-10480</small>
          </span>
          <span className="graph-node c">
            <Mic2 size={15} /> Synthetic voice <small>AL-10477</small>
          </span>
          <span className="graph-node d">
            <CreditCard size={15} /> Card transaction <small>AL-10481</small>
          </span>
        </div>
        <div className="correlation-copy">
          <span className="eyebrow">CAMPAIGN DETECTED</span>
          <h2>Coordinated financial fraud</h2>
          <strong className="confidence">
            96% <small>correlation confidence</small>
          </strong>
          <p>
            Four alerts share an entity, device fingerprint, and temporal
            sequence consistent with a coordinated attack.
          </p>
          {[
            ["Related alerts", "4"],
            ["Entities linked", "7"],
            ["Recommended action", "Investigate"],
          ].map(([x, y]) => (
            <div className="summary-row" key={x}>
              <span>{x}</span>
              <b>{y}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="panel chain">
        <div className="panel-head">
          <div>
            <span className="eyebrow">CONNECTED SIGNALS</span>
            <h3>Attack chain</h3>
          </div>
          <Badge tone="critical">Critical campaign</Badge>
        </div>
        <div className="chain-row">
          {[
            "Phishing email",
            "Malicious URL",
            "User identity",
            "Synthetic voice",
            "Device fingerprint",
            "Card transaction",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <strong>{x}</strong>
              {i < 5 && <ArrowRight size={14} />}
            </div>
          ))}
        </div>
      </div>
    </AppPage>
  );
}
export function Cases({ id }) {
  const { cases } = useFraud();
  if (id) {
    const c = cases.find((x) => x.id === id) || cases[0];
    return (
      <AppPage
        eyebrow="CASE INVESTIGATION"
        title={c.title}
        copy={`${c.id} · Assigned to ${c.investigator}`}
        action={<Button icon={Check}>Close case</Button>}
      >
        <div className="case-banner">
          <div>
            <span>RISK SCORE</span>
            <strong>98</strong>
          </div>
          <div>
            <span>SEVERITY</span>
            <Badge tone="critical">Critical</Badge>
          </div>
          <div>
            <span>STATUS</span>
            <strong>{c.status}</strong>
          </div>
          <div>
            <span>SLA REMAINING</span>
            <strong className="risk-critical">{c.sla}</strong>
          </div>
        </div>
        <div className="case-layout">
          <div className="panel">
            <span className="eyebrow">INVESTIGATION TIMELINE</span>
            <h3>Connected activity</h3>
            <div className="timeline">
              {[
                ["10:12", "Phishing email detected"],
                ["10:14", "Malicious URL detected"],
                ["10:20", "User interaction detected"],
                ["10:27", "Synthetic voice detected"],
                ["10:32", "Suspicious transaction detected"],
                ["10:33", "Alerts correlated"],
                ["10:34", "Case automatically created"],
              ].map(([t, x], i) => (
                <div key={t}>
                  <span>{t}</span>
                  <i className={i === 6 ? "current" : ""} />
                  <p>
                    {x}
                    <small>Signal recorded in mock workspace</small>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <span className="eyebrow">CASE ENTITIES</span>
            <h3>Evidence & entities</h3>
            <div className="entities">
              {[
                "Ayan Shaikh · account holder",
                "Device · DF-88A1C",
                "Domain · hdfc-secure.co",
                "Transaction · ₹1,85,000",
              ].map((x) => (
                <div key={x}>
                  <Fingerprint size={15} />
                  {x}
                  <ChevronRight size={14} />
                </div>
              ))}
            </div>
            <Button variant="ghost" icon={Plus}>
              Add evidence
            </Button>
          </div>
        </div>
      </AppPage>
    );
  }
  return (
    <AppPage
      eyebrow="INVESTIGATIONS"
      title="Investigation cases"
      copy="Move from correlated signals to accountable outcomes."
      action={<Button icon={Plus}>Create case</Button>}
    >
      <div className="toolbar">
        <Button variant="ghost">
          All statuses <ChevronRight size={14} />
        </Button>
        <Button variant="ghost">
          Critical <ChevronRight size={14} />
        </Button>
      </div>
      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Alerts</th>
              <th>Investigator</th>
              <th>Status</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td className="threat">{c.title}</td>
                <td>
                  <Badge tone={c.severity.toLowerCase()}>{c.severity}</Badge>
                </td>
                <td>{c.alerts}</td>
                <td>{c.investigator}</td>
                <td>{c.status}</td>
                <td className="mono">{c.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppPage>
  );
}
export function Simple({ type }) {
  const { users } = useFraud();
  const isTeam = type === "team";
  const title =
    type === "evidence"
      ? "Evidence library"
      : type === "reports"
        ? "Reports"
        : type === "audit-log"
          ? "Audit trail"
          : "Team & access management";
  const rows = isTeam
    ? users
    : type === "evidence"
      ? [
        "Email payload",
        "URL screenshot",
        "Call recording",
        "KYC frame",
        "Claim document",
        "Transaction receipt",
      ]
      : type === "reports"
        ? [
          "Case summary · CS-10482",
          "Monthly fraud posture",
          "Compliance evidence pack",
          "Investigator findings",
        ]
        : [
          "Created Case · CS-10482",
          "Viewed Alert · AL-10482",
          "Changed assignment · CS-10481",
          "Exported report · RP-2219",
        ];
  return (
    <AppPage
      eyebrow={type.replace("-", " ").toUpperCase()}
      title={title}
      copy="A realistic mock view connected to the same investigation workspace."
      action={
        <Button icon={Plus}>
          {isTeam
            ? "Add user"
            : type === "reports"
              ? "Generate report"
              : "Add item"}
        </Button>
      }
    >
      <div className="toolbar">
        <div className="field-search">
          <Search size={15} />
          <input placeholder={`Search ${title.toLowerCase()}...`} />
        </div>
        <Button variant="ghost">
          Filter <ChevronRight size={14} />
        </Button>
      </div>
      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              {isTeam ? (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th />
                </>
              ) : (
                <>
                  <th>Name / action</th>
                  <th>Type</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th />
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={typeof row === "string" ? row : row.name}>
                {isTeam ? (
                  <>
                    <td className="threat">
                      <span className="user-cell">
                        <span className="avatar">
                          {row.name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </span>
                        {row.name}
                      </span>
                    </td>
                    <td>{row.email}</td>
                    <td>
                      <Badge tone="high">{row.role}</Badge>
                    </td>
                    <td>{row.department}</td>
                    <td>
                      <Badge tone="success">{row.status}</Badge>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="threat">{row}</td>
                    <td>
                      {type === "evidence"
                        ? "Evidence"
                        : type === "audit-log"
                          ? "System event"
                          : "Case report"}
                    </td>
                    <td>
                      {type === "audit-log" ? USERS[i]?.name : "Ayan Shaikh"}
                    </td>
                    <td>
                      <Badge tone="success">Available</Badge>
                    </td>
                    <td className="mono">{i + 2}m ago</td>
                  </>
                )}
                <td>
                  <MoreHorizontal size={15} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppPage>
  );
}
export function Profile({ settings = false }) {
  return (
    <AppPage
      eyebrow={settings ? "CONTROL CENTER" : "ACCOUNT"}
      title={settings ? "Settings" : "Profile"}
      copy={
        settings
          ? "Configure workspace preferences and detection thresholds."
          : "Manage your workspace identity and session security."
      }
    >
      <div className={settings ? "settings-grid" : "profile-grid"}>
        {(settings
          ? [
            "Profile",
            "Security",
            "Notifications",
            "Detection thresholds",
            "Alert preferences",
            "Appearance",
          ]
          : ["Identity", "Security status"]
        ).map((x) => (
          <div className="panel setting-card" key={x}>
            <Settings size={18} />
            <h3>{x}</h3>
            <p>Manage {x.toLowerCase()} for your demo workspace.</p>
            <Button variant="ghost">
              Configure <ArrowRight size={14} />
            </Button>
          </div>
        ))}
      </div>
    </AppPage>
  );
}
export function ErrorPage({ code, title, copy }) {
  return (
    <div className="error">
      <Logo />
      <div>
        <b>{code}</b>
        <h1>{title}</h1>
        <p>{copy}</p>
        <Link className="button button-primary" to="/">
          Return home <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
function RouterApp() {
  const path = useLocation().pathname;
  const user = JSON.parse(localStorage.getItem("cybershield_user") || "null");
  const protectedPath =
    path === "/dashboard" ||
    path.startsWith("/alerts") ||
    path.startsWith("/detections") ||
    path === "/correlation" ||
    path.startsWith("/cases") ||
    [
      "/evidence",
      "/reports",
      "/audit-log",
      "/team",
      "/settings",
      "/profile",
    ].includes(path);
  if (path === "/") return <Home />;
  if (path === "/platform") return <Platform />;
  if (path === "/modules") return <Modules />;
  if (path === "/security") return <Security />;
  if (path === "/about") return <About />;
  if (path === "/contact") return <Contact />;
  if (path === "/login") return <AuthFlow />;
  if (path === "/signup") return <AuthFlow signup />;
  if (path === "/forgot-password") return <ForgotPassword />;
  if (path === "/verify-otp") return <Verification />;
  if (path === "/2fa") return <Verification twoFactor />;
  if (path === "/403")
    return (
      <ErrorPage
        code="403"
        title="Access restricted"
        copy="You don't have permission to access this workspace view."
      />
    );
  if (!user && protectedPath)
    return (
      <ErrorPage
        code="SESSION"
        title="Session expired"
        copy="Please sign in again to enter the demo workspace."
      />
    );
  if (user?.role !== "Admin" && path === "/team")
    return (
      <ErrorPage
        code="403"
        title="Access restricted"
        copy="Team management is available to administrators only."
      />
    );
  let page;
  if (path === "/dashboard") page = <Dashboard />;
  else if (path === "/alerts") page = <AlertsPage />;
  else if (path.startsWith("/alerts/"))
    page = <AlertDetails id={path.split("/")[2]} />;
  else if (path.startsWith("/detections/"))
    page = <Detection type={path.split("/")[2]} />;
  else if (path === "/correlation") page = <Correlation />;
  else if (path === "/cases") page = <Cases />;
  else if (path.startsWith("/cases/")) page = <Cases id={path.split("/")[2]} />;
  else if (["evidence", "reports", "audit-log", "team"].includes(path.slice(1)))
    page = <Simple type={path.slice(1)} />;
  else if (path === "/settings") page = <Profile settings />;
  else if (path === "/profile") page = <Profile />;
  else
    return (
      <ErrorPage
        code="404"
        title="Page not found"
        copy="The view you are looking for doesn't exist in this demo workspace."
      />
    );
  return <Shell>{page}</Shell>;
}
export default function CybershieldApp() {
  return (
    <FraudProvider>
      <RouterApp />
    </FraudProvider>
  );
}
