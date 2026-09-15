import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function PublicFooter() {
  return (
    <footer>
      <div>
        <Logo />
        <p>Unified intelligence for the fraud signals that matter.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/platform">Platform</Link>
        <Link to="/modules">Modules</Link>
        <Link to="/security">Security</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="footer-status">
        <span className="status-dot" /> All systems operational
        <br />
        <small>© 2026 Cybershield</small>
      </div>
    </footer>
  );
}

export default PublicFooter;
