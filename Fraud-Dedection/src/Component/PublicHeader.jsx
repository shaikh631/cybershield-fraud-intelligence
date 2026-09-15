import { ArrowRight, Home, LogIn, Menu, ShieldCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-brand-group">
        <Link to="/" className="public-brand" aria-label="Cybershield home">
          <span className="public-brand-mark">
            <ShieldCheck size={22} strokeWidth={1.9} />
          </span>
          <span>
            <strong>Cybershield</strong>
            <small>Fraud Intelligence</small>
          </span>
        </Link>
      </div>
      
      <nav aria-label="Public navigation">
          <NavLink to="/" className="public-home-link" aria-label="Home">
          <Home size={30} strokeWidth={1.9} />
        </NavLink>
        <NavLink to="/platform">Platform</NavLink>
        <NavLink to="/modules">Modules</NavLink>
        <NavLink to="/security">Security</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="header-actions">
        <Link to="/login" className="text-link">
          Sign in <LogIn size={14} />
        </Link>
        <Link to="/contact" className="button button-primary header-demo-button">
          Request demo <ArrowRight size={15} />
        </Link>
      </div>
      <button className="icon-button mobile-only" aria-label="Open navigation">
        <Menu size={18} />
      </button>
    </header>
  );
}

export default PublicHeader;
