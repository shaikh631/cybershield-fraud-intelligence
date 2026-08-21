import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button className={`button button-${variant} ${className}`.trim()} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark">
        <Shield size={18} />
      </span>
      <span>
        <strong>CYBERSHIELD</strong>
        <small>UNIFIED FRAUD INTELLIGENCE</small>
      </span>
    </Link>
  );
}

export function Badge({ children, tone }) {
  return (
    <span
      className={`badge badge-${tone || String(children).toLowerCase().replaceAll(" ", "-")}`}
    >
      {children}
    </span>
  );
}

export function PageTitle({ eyebrow, title, copy, action }) {
  return (
    <div className="page-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  );
}
