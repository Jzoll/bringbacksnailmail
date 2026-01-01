export default function GettingStartedResources() {
  return (
    <div className="resources-page">
      <h1>Getting Started</h1>
      <p className="tagline">
        Basics, addressing, and starter kits to begin with confidence.
      </p>

      <section className="resource-section">
        <h2>Basics</h2>
        <p>
          Start simple: write your letter, address the envelope, add the right
          postage, and drop it in a mailbox or post office. See Postal
          Guidelines for detailed rules.
        </p>
        <a href="#guidelines" className="action-link">
          Jump to Postal Guidelines →
        </a>
      </section>

      <section className="resource-section">
        <h2>Addressing</h2>
        <p>
          Ensure your recipient and return addresses follow the local format.
          Include complete postal codes and place your stamp in the upper-right.
        </p>
        <a href="#guidelines" className="action-link">
          See Address Formats →
        </a>
      </section>

      <section className="resource-section">
        <h2>Starter Kits</h2>
        <div className="starter-kits">
          <h4>Curated Starter Kits</h4>
          <div className="kit-options">
            <div className="kit">
              <h5>Budget Kit ($15-20)</h5>
              <p>Basic stationery, envelopes, stamps, pen</p>
            </div>
            <div className="kit">
              <h5>Standard Kit ($30-40)</h5>
              <p>Quality paper, decorative stamps, gel pens, extras</p>
            </div>
            <div className="kit">
              <h5>Premium Kit ($60+)</h5>
              <p>Luxury stationery, fountain pen, wax seal, storage box</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
