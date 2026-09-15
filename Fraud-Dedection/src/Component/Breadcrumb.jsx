import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const LABELS = {
  dashboard: "Dashboard",
  alerts: "Alerts",
  detections: "Detection Modules",
  cases: "Cases",
  correlation: "Correlation",
  evidence: "Evidence",
  reports: "Reports",
  "audit-log": "Audit Logs",
  team: "Team",
  settings: "Settings",
  profile: "Profile",
  email: "Phishing Email",
  url: "Phishing URL",
  voice: "AI Voice",
  deepfake: "Deepfake",
  insurance: "Insurance Claims",
  card: "Credit Card",
};

function formatSegment(segment) {
  return (
    LABELS[segment] ||
    segment
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/dashboard" className="breadcrumb-home" aria-label="Dashboard">
        <Home size={13} />
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isCurrent = index === segments.length - 1;
        return (
          <span className="breadcrumb-item" key={path}>
            <ChevronRight size={13} aria-hidden="true" />
            {isCurrent ? (
              <span aria-current="page">{formatSegment(segment)}</span>
            ) : (
              <Link to={path}>{formatSegment(segment)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
