export default function FamousLetters() {
  return (
    <div className="inspiration-page">
      <h1>Famous Letters</h1>
      <p className="tagline">
        Historic and influential letters that inspire writing.
      </p>

      <section className="resource-section">
        <h2>Civil Rights & Social Change</h2>
        <div className="template-grid">
          <div className="template-card">
            <h3>Letter from Birmingham Jail (1963)</h3>
            <p>
              Martin Luther King Jr. defends nonviolent resistance and urges
              moral action.
            </p>
            <a
              href="https://www.africa.upenn.edu/Articles_Gen/Letter_Birmingham.html"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Read online →
            </a>
          </div>
          <div className="template-card">
            <h3>Letter to My Children (1947)</h3>
            <p>
              Jackie Robinson reflects on dignity, perseverance, and
              responsibility.
            </p>
            <a
              href="https://www.si.com/mlb/2017/04/14/jackie-robinson-letter-to-my-children"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Read article →
            </a>
          </div>
        </div>
      </section>

      <section className="resource-section">
        <h2>Politics & Leadership</h2>
        <div className="template-grid">
          <div className="template-card">
            <h3>Abraham Lincoln to Mrs. Bixby (1864)</h3>
            <p>
              A condolence letter recognizing profound sacrifice during the
              Civil War.
            </p>
            <a
              href="https://www.loc.gov/exhibits/lincoln/treasures_bixby.html"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Library of Congress →
            </a>
          </div>
          <div className="template-card">
            <h3>George Washington’s Farewell Address (1796)</h3>
            <p>
              A public letter cautioning against partisanship and foreign
              entanglements.
            </p>
            <a
              href="https://avalon.law.yale.edu/18th_century/washing.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Yale Avalon Project →
            </a>
          </div>
        </div>
      </section>

      <section className="resource-section">
        <h2>Arts & Culture</h2>
        <div className="template-grid">
          <div className="template-card">
            <h3>Vincent van Gogh to Theo</h3>
            <p>
              Intimate letters detailing art, health, and hope between brothers.
            </p>
            <a
              href="https://www.vangoghletters.org/vg/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Van Gogh Museum archive →
            </a>
          </div>
          <div className="template-card">
            <h3>Oscar Wilde’s De Profundis</h3>
            <p>
              A reflective prison letter on suffering, love, and creativity.
            </p>
            <a
              href="https://www.gutenberg.org/ebooks/921"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Project Gutenberg →
            </a>
          </div>
        </div>
      </section>

      <section className="resource-section">
        <h2>Science & Curiosity</h2>
        <div className="template-grid">
          <div className="template-card">
            <h3>Albert Einstein to Phyllis (1936)</h3>
            <p>
              Einstein explains science and faith with empathy to a young
              student.
            </p>
            <a
              href="https://www.einstein-website.de/z_philosophie/faith.html"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Background & text →
            </a>
          </div>
          <div className="template-card">
            <h3>Rosalind Franklin’s Correspondence</h3>
            <p>
              Professional letters revealing rigor behind DNA structural
              research.
            </p>
            <a
              href="https://profiles.nlm.nih.gov/spotlight/qq/feature/biographical-overview"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              NLM profiles →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
