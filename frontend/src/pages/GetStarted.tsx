import { useState } from "react";

export default function GetStarted() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h1>Get Started</h1>

      <section aria-labelledby="hero-checklist">
        <h2 id="hero-checklist">Send Your First Letter in 5 Simple Steps</h2>

        <ol style={{ fontSize: "1.125rem", lineHeight: "1.75" }}>
          <li>
            <strong>Write</strong> your message
          </li>
          <li>
            <strong>Address</strong> the envelope
          </li>
          <li>
            <strong>Stamp</strong> it properly
          </li>
          <li>
            <strong>Seal</strong> with care
          </li>
          <li>
            <strong>Mail</strong> it off!
          </li>
        </ol>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          style={{
            marginTop: "1rem",
            fontSize: "1.125rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
          }}
        >
          {expanded ? "Hide Details" : "I'm ready — show me how"}
        </button>
      </section>

      {expanded && (
        <section aria-label="Detailed steps">
          <article style={{ marginTop: "2rem" }}>
            <h3>Step 1 — Write</h3>
            <p>Choose from three simple letter structures:</p>
            <ul>
              <li>
                <strong>One-paragraph check-in</strong>: "Hi! Just wanted to say
                hello and share..."
              </li>
              <li>
                <strong>Short gratitude note</strong>: "Thank you for..."
              </li>
              <li>
                <strong>Postcard blurb</strong>: A few sentences + "Wish you
                were here!"
              </li>
            </ul>
            <p>
              <a href="/inspiration">Use AI to get a starter prompt →</a>
            </p>
          </article>

          <article style={{ marginTop: "2rem" }}>
            <h3>Step 2 — Addressing</h3>
            <p>Label your envelope clearly:</p>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginTop: "0.5rem",
                fontFamily: "monospace",
              }}
            >
              <div>
                <strong>To:</strong>
              </div>
              <div>Recipient Name</div>
              <div>123 Main Street</div>
              <div>City, State ZIP</div>
              <div style={{ marginTop: "1rem" }}>
                <strong>From:</strong> (top-left corner)
              </div>
              <div>Your Name</div>
              <div>Your Address</div>
            </div>
            <p style={{ marginTop: "1rem" }}>
              <a href="/resources#addressing">
                See formats for domestic vs international mail →
              </a>
            </p>
          </article>

          <article style={{ marginTop: "2rem" }}>
            <h3>Step 3 — Stamping & Postage</h3>
            <p>
              Place your stamp in the <strong>top-right corner</strong> of the
              envelope.
            </p>
            <p>
              <a href="/resources#postage">
                Check postal guidelines for rates →
              </a>
            </p>
            <p>
              <em>If in doubt, take it to the post office.</em>
            </p>
          </article>

          <article style={{ marginTop: "2rem" }}>
            <h3>Step 4 — Drop-off</h3>
            <p>Choose one:</p>
            <ul>
              <li>
                <strong>Mailbox</strong>: Drop it in a blue USPS mailbox
              </li>
              <li>
                <strong>Post office</strong>: Hand it to the clerk
              </li>
              <li>
                <strong>Home pick-up</strong>: Place it in your mailbox with the
                flag up
              </li>
            </ul>
            <p>
              <strong>Remember</strong>: Secure the envelope and include a
              return address.
            </p>
          </article>

          <article style={{ marginTop: "2rem" }}>
            <h3>Step 5 — Follow-up (optional)</h3>
            <ul>
              <li>
                Save a photo to <a href="/archive">your archive</a>
              </li>
              <li>Set a reminder to check back in a week</li>
              <li>Log it in a time capsule</li>
            </ul>
          </article>
        </section>
      )}

      <section
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          backgroundColor: "#f3f4f6",
          borderRadius: "0.375rem",
        }}
      >
        <h2>Mini-FAQ</h2>
        <details>
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
            My mail returned — why?
          </summary>
          <p>
            Usually due to an incorrect address or insufficient postage.{" "}
            <a href="/resources#troubleshooting">See detailed answers →</a>
          </p>
        </details>
        <details style={{ marginTop: "1rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
            How do I mail a package?
          </summary>
          <p>
            <a href="/resources#packages">Check our packaging guide →</a>
          </p>
        </details>
      </section>
    </div>
  );
}
