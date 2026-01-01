export default function SendingInternationalResources() {
  return (
    <div className="resources-page">
      <h1>Sending International</h1>
      <p className="tagline">
        Navigate customs, addressing, and delivery times abroad.
      </p>

      <section className="resource-section">
        <h2>Addressing & Formats</h2>
        <p>
          Follow country-specific addressing conventions and include country
          names in uppercase on the last line. Place international stamps
          appropriately.
        </p>
      </section>

      <section className="resource-section">
        <h2>Customs & Restrictions</h2>
        <ul>
          <li>Letter content restrictions vary by country</li>
          <li>Prohibited items list and customs declarations</li>
          <li>Expected delivery windows and tracking options</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Tips</h2>
        <ul>
          <li>Use clear block lettering and avoid slang</li>
          <li>Consider including a return email for faster replies</li>
          <li>Check local holidays that may delay delivery</li>
        </ul>
      </section>
    </div>
  );
}
