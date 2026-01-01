import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Resources() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="resources-page">
      <header className="page-header">
        <h1>Resources Library</h1>
        <p className="tagline">Everything you need to master snail mail.</p>
      </header>

      <nav className="resources-nav">
        <Link to="/resources#guidelines">Postal Guidelines</Link>
        <Link to="getting-started">Getting Started</Link>
        <Link to="design-and-craft">Design &amp; Craft</Link>
        <Link to="sending-international">Sending International</Link>
        <Link to="archiving-and-preservation">
          Archiving &amp; Preservation
        </Link>
      </nav>

      <Outlet />

      {showScrollTop && (
        <button
          className="scroll-to-top"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
}
