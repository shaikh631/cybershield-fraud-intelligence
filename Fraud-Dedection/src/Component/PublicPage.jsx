import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";

export function PublicPage({ eyebrow, title, copy, children }) {
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

export default PublicPage;
