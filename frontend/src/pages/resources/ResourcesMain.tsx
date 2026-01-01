export default function ResourcesMain() {
  return (
    <div className="resources-page">
      <section id="guidelines" className="resource-section">
        <h2>Postal Guidelines</h2>

        <div className="subsection">
          <h3>How Postage Works</h3>
          <p>
            Postage is the fee you pay to have your mail delivered. The cost
            depends on size, weight, destination, and speed.
          </p>
          <ul>
            <li>
              <strong>Size:</strong> Standard letters, large envelopes, packages
            </li>
            <li>
              <strong>Weight:</strong> 1 oz, 2 oz, 3 oz, etc.
            </li>
            <li>
              <strong>Destination:</strong> Domestic vs. international
            </li>
            <li>
              <strong>Speed:</strong> First-Class, Priority, Express
            </li>
          </ul>
          <p className="tip">
            💡 <strong>Tip:</strong> Forever stamps (US) always cover the
            current First-Class letter rate, even if prices increase.
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
            Sending mail internationally requires additional postage and may
            need customs forms for packages. Key points:
          </p>
          <ul>
            <li>
              Use clear, complete addresses in the destination country's format
            </li>
            <li>Include country name in English and local language</li>
            <li>Allow 1-3 weeks for delivery (varies widely)</li>
            <li>
              Customs forms (CN22/CN23) required for packages over certain
              values
            </li>
          </ul>
          <a
            href="https://www.usps.com/international/"
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            USPS International Services →
          </a>
        </div>
      </section>
    </div>
  );
}
