export default function GetStarted() {
  return (
    <div className="get-started-page">
      <header className="page-header">
        <h1>Get Started: Send Your First Letter</h1>
        <p className="tagline">A simple 5-step guide to sending physical mail</p>
      </header>

      <section className="quick-checklist">
        <h2>Quick Start Checklist</h2>
        <ol className="checklist">
          <li>
            <input type="checkbox" id="step1" />
            <label htmlFor="step1">Write your letter or card</label>
          </li>
          <li>
            <input type="checkbox" id="step2" />
            <label htmlFor="step2">Address the envelope</label>
          </li>
          <li>
            <input type="checkbox" id="step3" />
            <label htmlFor="step3">Add postage stamp</label>
          </li>
          <li>
            <input type="checkbox" id="step4" />
            <label htmlFor="step4">Seal the envelope</label>
          </li>
          <li>
            <input type="checkbox" id="step5" />
            <label htmlFor="step5">Drop in mailbox or post office</label>
          </li>
        </ol>
      </section>

      <section className="detailed-steps">
        <div className="step">
          <h3>Step 1: Write Your Letter</h3>
          <p>
            Start with a simple greeting and write from the heart. Don't worry about being 
            perfect—the thought and effort matter most.
          </p>
          <div className="tips">
            <h4>Writing Tips:</h4>
            <ul>
              <li>Keep it conversational and personal</li>
              <li>Share news, ask questions, express gratitude</li>
              <li>Use quality paper and a pen you enjoy writing with</li>
            </ul>
          </div>
          <a href="/inspiration" className="action-link">Need inspiration? Get a writing prompt →</a>
        </div>

        <div className="step">
          <h3>Step 2: Address the Envelope</h3>
          <div className="addressing-diagram">
            <div className="envelope-example">
              <div className="return-address">
                <strong>Your Name</strong><br />
                123 Your Street<br />
                Your City, ST 12345
              </div>
              <div className="stamp-area">STAMP</div>
              <div className="recipient-address">
                <strong>Recipient Name</strong><br />
                456 Their Street<br />
                Their City, ST 67890
              </div>
            </div>
          </div>
          <div className="tips">
            <h4>Addressing Guidelines:</h4>
            <ul>
              <li><strong>Return address</strong> (yours) goes in the upper left corner</li>
              <li><strong>Recipient address</strong> goes in the center, slightly to the right</li>
              <li><strong>Stamp</strong> goes in the upper right corner</li>
              <li>Use clear, legible handwriting or print labels</li>
              <li>Include full ZIP/postal codes</li>
            </ul>
          </div>
        </div>

        <div className="step">
          <h3>Step 3: Add Postage</h3>
          <p>
            Purchase stamps from your local post office, online, or at many retail stores. 
            The cost depends on the size, weight, and destination of your mail.
          </p>
          <div className="tips">
            <h4>Postage Tips:</h4>
            <ul>
              <li>Standard letter (1 oz): usually one Forever stamp in the US</li>
              <li>Heavier or larger items may need additional postage</li>
              <li>International mail requires international stamps or extra postage</li>
              <li>If unsure, take it to the post office—they'll weigh it and advise</li>
            </ul>
          </div>
          <a href="/resources#postage" className="action-link">See detailed postage guidelines →</a>
        </div>

        <div className="step">
          <h3>Step 4: Seal & Double-Check</h3>
          <p>
            Before sealing, make sure your letter is inside and everything is addressed correctly.
          </p>
          <div className="checklist-inline">
            <ul>
              <li>✓ Letter is inside the envelope</li>
              <li>✓ Recipient address is correct and complete</li>
              <li>✓ Return address is present</li>
              <li>✓ Stamp is affixed in the upper right</li>
            </ul>
          </div>
        </div>

        <div className="step">
          <h3>Step 5: Mail It!</h3>
          <p>You have several options for sending your mail:</p>
          <div className="mailing-options">
            <div className="option">
              <h4>🏠 Home Mailbox</h4>
              <p>Place outgoing mail in your mailbox and raise the flag (if you have one). Your mail carrier will pick it up.</p>
            </div>
            <div className="option">
              <h4>📮 Public Mailbox</h4>
              <p>Drop your letter in any blue USPS mailbox (or equivalent in your country). Check collection times posted on the box.</p>
            </div>
            <div className="option">
              <h4>🏤 Post Office</h4>
              <p>Hand your mail directly to a clerk at the counter. Great for packages, international mail, or if you need tracking.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="next-steps">
        <h2>You Did It! 🎉</h2>
        <p>
          Your letter is on its way. Delivery typically takes 2-5 days domestically, 
          1-3 weeks internationally (varies by country).
        </p>
        <div className="action-buttons">
          <a href="/mailbox" className="btn btn-primary">Archive This Letter</a>
          <a href="/resources" className="btn btn-secondary">Explore More Resources</a>
        </div>
      </section>
    </div>
  );
}
