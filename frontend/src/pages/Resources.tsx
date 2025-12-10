export default function Resources() {
  return (
    <div className="resources-page">
      <header className="page-header">
        <h1>Resources Library</h1>
        <p className="tagline">Everything you need to master the art of snail mail</p>
      </header>

      <nav className="resources-nav">
        <a href="#guidelines">Postal Guidelines</a>
        <a href="#templates">Templates</a>
        <a href="#supplies">Supplies</a>
        <a href="#how-to">How-To Guides</a>
        <a href="#links">External Links</a>
        <a href="#glossary">Glossary</a>
      </nav>

      <section id="guidelines" className="resource-section">
        <h2>Postal Guidelines</h2>
        
        <div className="subsection">
          <h3>How Postage Works</h3>
          <p>
            Postage is the fee you pay to have your mail delivered. The cost depends on:
          </p>
          <ul>
            <li><strong>Size:</strong> Standard letters, large envelopes, packages</li>
            <li><strong>Weight:</strong> 1 oz, 2 oz, 3 oz, etc.</li>
            <li><strong>Destination:</strong> Domestic vs. international</li>
            <li><strong>Speed:</strong> First-Class, Priority, Express</li>
          </ul>
          <p className="tip">
            💡 <strong>Tip:</strong> Forever stamps (US) always cover the current First-Class letter rate, 
            even if prices increase.
          </p>
        </div>

        <div className="subsection">
          <h3>Address Formats</h3>
          <div className="format-examples">
            <div className="format">
              <h4>United States</h4>
              <pre>{`RECIPIENT NAME
123 MAIN STREET APT 4B
CITY NAME, ST 12345-6789`}</pre>
            </div>
            <div className="format">
              <h4>United Kingdom</h4>
              <pre>{`Recipient Name
123 High Street
Town Name
County
POSTCODE`}</pre>
            </div>
            <div className="format">
              <h4>Japan</h4>
              <pre>{`〒123-4567
Prefecture, City
District 1-2-3
Recipient Name`}</pre>
            </div>
          </div>
        </div>

        <div className="subsection">
          <h3 id="postage">Size & Weight Categories</h3>
          <table className="postal-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Dimensions</th>
                <th>Weight</th>
                <th>Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Letter</td>
                <td>Max 11.5" × 6.125"</td>
                <td>Up to 3.5 oz</td>
                <td>Standard mail, cards</td>
              </tr>
              <tr>
                <td>Large Envelope (Flat)</td>
                <td>Max 15" × 12" × 0.75"</td>
                <td>Up to 13 oz</td>
                <td>Documents, photos</td>
              </tr>
              <tr>
                <td>Package</td>
                <td>Varies</td>
                <td>Up to 70 lbs</td>
                <td>Gifts, books, goods</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="subsection">
          <h3>International Mail</h3>
          <p>
            Sending mail internationally requires additional postage and may need customs forms 
            for packages. Key points:
          </p>
          <ul>
            <li>Use clear, complete addresses in the destination country's format</li>
            <li>Include country name in English and local language</li>
            <li>Allow 1-3 weeks for delivery (varies widely)</li>
            <li>Customs forms (CN22/CN23) required for packages over certain values</li>
          </ul>
          <a href="https://www.usps.com/international/" target="_blank" rel="noopener noreferrer" className="external-link">
            USPS International Services →
          </a>
        </div>
      </section>

      <section id="templates" className="resource-section">
        <h2>Templates & Examples</h2>
        <div className="template-grid">
          <div className="template-card">
            <h3>Letter Template</h3>
            <p>Printable lined stationery with margins</p>
            <button className="btn btn-secondary">Download PDF</button>
          </div>
          <div className="template-card">
            <h3>Envelope Template</h3>
            <p>Practice addressing with this printable</p>
            <button className="btn btn-secondary">Download PDF</button>
          </div>
          <div className="template-card">
            <h3>Postcard Layout</h3>
            <p>Front and back postcard template</p>
            <button className="btn btn-secondary">Download PDF</button>
          </div>
          <div className="template-card">
            <h3>Example Letters</h3>
            <p>Sample friendly letter, thank-you note, etc.</p>
            <button className="btn btn-secondary">View Examples</button>
          </div>
        </div>
      </section>

      <section id="supplies" className="resource-section">
        <h2>Supplies & Tools</h2>
        
        <div className="supply-category">
          <h3>Paper & Envelopes</h3>
          <ul>
            <li><strong>Stationery:</strong> Quality letter paper (20-24 lb weight recommended)</li>
            <li><strong>Envelopes:</strong> Standard #10 (business), A7 (5x7 cards), or custom sizes</li>
            <li><strong>Postcards:</strong> 4" × 6" minimum, sturdy cardstock</li>
          </ul>
        </div>

        <div className="supply-category">
          <h3>Writing Tools</h3>
          <ul>
            <li>Ballpoint, gel, or fountain pens</li>
            <li>Pencils for drafts</li>
            <li>Colored pens or markers for creative touches</li>
          </ul>
        </div>

        <div className="supply-category">
          <h3>Extras</h3>
          <ul>
            <li>Stamps (decorative or standard)</li>
            <li>Washi tape or stickers for decoration</li>
            <li>Return address labels or stamps</li>
            <li>Envelope moistener or glue stick</li>
          </ul>
        </div>

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

      <section id="how-to" className="resource-section">
        <h2>How-To Deep Dives</h2>
        <div className="guide-list">
          <div className="guide-item">
            <h3>Photographing Mail for Your Archive</h3>
            <p>Tips for capturing high-quality images of your letters and postcards before sending.</p>
          </div>
          <div className="guide-item">
            <h3>Preserving Paper Correspondence</h3>
            <p>Best practices for storing and protecting physical letters long-term.</p>
          </div>
          <div className="guide-item">
            <h3>Beginner Hand-Lettering</h3>
            <p>Simple calligraphy techniques to add flair to your envelopes.</p>
          </div>
          <div className="guide-item">
            <h3>International Addressing Guide</h3>
            <p>Country-specific address formats and customs requirements.</p>
          </div>
        </div>
      </section>

      <section id="links" className="resource-section">
        <h2>External Links</h2>
        <div className="link-category">
          <h3>Official Postal Services</h3>
          <ul>
            <li><a href="https://www.usps.com" target="_blank" rel="noopener noreferrer">United States Postal Service (USPS)</a></li>
            <li><a href="https://www.royalmail.com" target="_blank" rel="noopener noreferrer">Royal Mail (UK)</a></li>
            <li><a href="https://www.canadapost.ca" target="_blank" rel="noopener noreferrer">Canada Post</a></li>
            <li><a href="https://www.auspost.com.au" target="_blank" rel="noopener noreferrer">Australia Post</a></li>
          </ul>
        </div>
        <div className="link-category">
          <h3>Pen Pal & Letter Writing Communities</h3>
          <ul>
            <li><a href="https://www.interpals.net" target="_blank" rel="noopener noreferrer">InterPals</a></li>
            <li><a href="https://www.reddit.com/r/penpals/" target="_blank" rel="noopener noreferrer">r/penpals on Reddit</a></li>
            <li><a href="https://www.postcrossing.com" target="_blank" rel="noopener noreferrer">Postcrossing</a></li>
          </ul>
        </div>
      </section>

      <section id="glossary" className="resource-section">
        <h2>Glossary</h2>
        <dl className="glossary">
          <dt>Postage</dt>
          <dd>The fee paid for mail delivery, usually via stamps.</dd>

          <dt>First-Class Mail</dt>
          <dd>Standard mail service for letters and lightweight packages; typical delivery in 1-5 days domestically.</dd>

          <dt>Forever Stamp (US)</dt>
          <dd>A stamp that always covers the current First-Class letter rate, regardless of price changes.</dd>

          <dt>Airmail</dt>
          <dd>Mail transported by air; typically used for international mail.</dd>

          <dt>Registered Mail</dt>
          <dd>Mail service with tracking and insurance for valuable items.</dd>

          <dt>Return Receipt</dt>
          <dd>Proof of delivery service that provides a signature confirmation.</dd>

          <dt>Postmark</dt>
          <dd>The official mark stamped on mail by the postal service, showing date and location.</dd>

          <dt>ZIP Code / Postal Code</dt>
          <dd>Numerical code used to identify delivery areas (ZIP in US, postcode in UK, etc.).</dd>
        </dl>
      </section>
    </div>
  );
}
