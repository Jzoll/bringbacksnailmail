export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bring Back Snail Mail</h1>
        <p className="tagline">
          Rediscover the joy of handwritten correspondence
        </p>
        <p className="subtitle">
          Learn to send physical mail, find creative prompts, and archive your
          meaningful letters.
        </p>
        <div className="cta-buttons">
          <a href="/get-started" className="btn btn-primary">
            Get Started
          </a>
          <a href="/inspiration" className="btn btn-secondary">
            Find Inspiration
          </a>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h2>📝 Learn the Basics</h2>
          <p>
            Step-by-step guides for addressing, stamping, and sending your first
            letter.
          </p>
        </div>
        <div className="feature">
          <h2>✨ Get Inspired</h2>
          <p>Creative writing and drawing prompts to spark your next letter.</p>
        </div>
        <div className="feature">
          <h2>📮 Archive Your Mail</h2>
          <p>Keep a private collection of sent and received correspondence.</p>
        </div>
      </section>

      <section className="about">
        <h2>Why Snail Mail?</h2>
        <p>
          In a world of instant messages, taking the time to write and send a
          physical letter is a meaningful act. It shows care, thoughtfulness,
          and a commitment to slowing down.
        </p>
        <p>
          Whether you're writing to a friend, family member, or pen pal,
          physical mail creates lasting memories and tangible connections.
        </p>
      </section>
    </div>
  );
}
