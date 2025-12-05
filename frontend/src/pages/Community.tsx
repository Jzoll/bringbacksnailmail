export default function Community() {
  return (
    <div>
      <h1>Community Showcase Wall</h1>
      <p style={{ fontStyle: "italic", color: "#6b7280", marginTop: "1rem" }}>
        Coming soon! Share your snail mail with the world.
      </p>

      <div style={{ marginTop: "2rem", maxWidth: "700px" }}>
        <h2>What is the Showcase Wall?</h2>
        <p style={{ lineHeight: "1.6" }}>
          The Showcase Wall will be a curated gallery where you can share photos
          of your beautifully crafted letters, postcards, and stamps with other
          snail mail enthusiasts. Every submission will be reviewed by our
          moderation team before going live to ensure a safe and welcoming
          community.
        </p>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: "0.5rem",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#92400e" }}>
            🚧 Under Construction
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.6",
              color: "#78350f",
              marginBottom: 0,
            }}
          >
            We're building the Showcase Wall with safety and privacy as our top
            priorities. Features will include:
          </p>
          <ul
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.6",
              color: "#78350f",
              marginBottom: 0,
            }}
          >
            <li>Pre-publication moderation of all submissions</li>
            <li>Automated content filtering for inappropriate images</li>
            <li>Community reporting and takedown requests</li>
            <li>Optional Writing Buddy Matching (roadmap)</li>
          </ul>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h3>Moderation Guidelines</h3>
          <p style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
            To keep our community safe and welcoming, all submissions must
            adhere to these rules:
          </p>
          <ul style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
            <li>
              ✅ Photos of handwritten letters, postcards, stamps, or stationery
            </li>
            <li>
              ✅ Redact any personal information (addresses, phone numbers, full
              names)
            </li>
            <li>✅ Respectful and encouraging content only</li>
            <li>❌ No hate speech, harassment, or explicit content</li>
            <li>❌ No spam, advertisements, or off-topic content</li>
            <li>❌ No personally identifiable information visible in photos</li>
          </ul>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            disabled
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#9ca3af",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "not-allowed",
            }}
          >
            Submit to Showcase (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
