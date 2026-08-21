import { ArrowRight, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";

export function PublicHeader() {
  return (
    <header className="public-header">
      <Logo />
      <nav aria-label="Public navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/platform">Platform</NavLink>
        <NavLink to="/modules">Modules</NavLink>
        <NavLink to="/security">Security</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="header-actions">
        <Link to="/login" className="text-link">
          Sign in
        </Link>
        <Link to="/contact" className="button button-primary">
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
