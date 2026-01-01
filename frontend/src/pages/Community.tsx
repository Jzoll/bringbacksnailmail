import "../styles/Community.css";
import { useEffect, useState } from "react";

export default function Community() {
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
    <div className="community-page">
      <section
        className="community-hero"
        style={{
          textAlign: "center",
          padding: "2rem",
          marginBottom: "2rem",
          background: "#fff",
          border: "2px solid #dee2e6",
          borderRadius: 12,
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>
          Join the Snail Mail Community
        </h1>
        <p className="subtitle" style={{ marginBottom: "1rem" }}>
          A warm, welcoming space to share and celebrate physical
          correspondence.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/inspiration" className="btn btn-secondary">
            Find Inspiration
          </a>
          <a href="/mailbox" className="btn btn-primary">
            Archive Your Mail
          </a>
        </div>
      </section>
      <header className="community-header">
        <h1>Community Wall</h1>
        <p className="subtitle">
          Share your letters and drawings with fellow mail enthusiasts
        </p>
      </header>

      <section className="coming-soon">
        <div className="status-badge">Coming Soon</div>
        <h2>Community Features Are in Development</h2>
        <p className="lead">
          We're building a safe, moderated space for sharing your snail mail
          creations.
        </p>

        <div className="roadmap">
          <h3>What's Coming</h3>
          <ul className="feature-list">
            <li>
              <strong>Moderation-First Approach</strong>
              <p>
                All submissions will be reviewed before appearing on the
                Community Wall to ensure a safe, respectful environment.
              </p>
            </li>
            <li>
              <strong>Share Your Mail</strong>
              <p>
                Upload photos of your sent letters, postcards, and artwork to
                inspire others.
              </p>
            </li>
            <li>
              <strong>Browse & Discover</strong>
              <p>
                Explore creative examples from other members, organized by
                category and style.
              </p>
            </li>
            <li>
              <strong>Privacy Controls</strong>
              <p>Choose what you share and manage your visibility settings.</p>
            </li>
            <li>
              <strong>Reporting & Safety</strong>
              <p>
                Easy tools to report inappropriate content and block users if
                needed.
              </p>
            </li>
          </ul>
        </div>

        <div className="why-moderation">
          <h3>Why Moderation?</h3>
          <p>
            We're committed to creating a positive, encouraging space for
            everyone. Moderation helps us maintain quality, protect privacy, and
            prevent spam or inappropriate content. Your submissions will be
            reviewed within 24-48 hours.
          </p>
        </div>

        <div className="stay-updated">
          <h3>In the Meantime</h3>
          <p>
            While we build the Community Wall, you can still use your private{" "}
            <a href="/mailbox">My Mailbox</a> to archive your correspondence,
            and visit the <a href="/inspiration">Inspiration</a> page for
            creative prompts.
          </p>
        </div>
      </section>

      <section className="faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-item">
          <h4>When will the Community Wall launch?</h4>
          <p>
            We're targeting early 2026. Follow our updates for the latest news.
          </p>
        </div>
        <div className="faq-item">
          <h4>Will my personal information be visible?</h4>
          <p>
            No. You control what you share. By default, only your username and
            the images you choose to submit will be visible.
          </p>
        </div>
        <div className="faq-item">
          <h4>Can I share letters I've received from others?</h4>
          <p>
            Only with explicit permission from the sender. Privacy and consent
            are paramount.
          </p>
        </div>
      </section>

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
