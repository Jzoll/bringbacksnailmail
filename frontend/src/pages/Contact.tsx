export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Questions, feedback, or just want to share your snail mail story?</p>

      <div style={{ marginTop: "2rem", maxWidth: "600px" }}>
        <h2>Get in Touch</h2>
        <p>
          While this is a demo MVP, we'd love to hear from you! For now, feel
          free to reach out via:
        </p>

        <ul style={{ lineHeight: "1.8", marginTop: "1rem" }}>
          <li>
            <strong>Email</strong>:{" "}
            <a href="mailto:hello@bringbacksnailmail.com">
              hello@bringbacksnailmail.com
            </a>
          </li>
          <li>
            <strong>Social</strong>: Share your mail photos with{" "}
            <code>#BringBackSnailMail</code>
          </li>
        </ul>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Community Guidelines</h3>
          <p style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
            The Showcase Wall (coming soon) will be a safe space for sharing
            physical mail. All submissions will be moderated before approval. No
            personal information, inappropriate content, or spam will be
            tolerated.
          </p>
        </div>
      </div>
    </div>
  );
}
