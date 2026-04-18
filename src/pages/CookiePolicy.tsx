import LegalPageLayout from '@/pages/LegalPageLayout'

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="April 18, 2026">
      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">1. What This Policy Covers</h2>
        <p>
          This Cookie Policy explains how Cheerio Studio uses cookies and similar tracking technologies
          on this website, what categories we use, and how you can control them.
        </p>
        <p className="mt-3">
          Controller: Cheerio Studio (Bolu, Turkey). For cookie-related questions, contact
          <a href="mailto:sam.d@cheeriostudios.com" className="text-brand-gold hover:underline ml-1">
            sam.d@cheeriostudios.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">2. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device by your browser. Similar technologies include
          local storage, pixels, and device identifiers. They help websites operate, remember preferences,
          and understand usage patterns.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">3. Cookie Categories We Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Strictly Necessary Cookies: Required for core functionality, security, and network management.
            These cannot be disabled in our systems.
          </li>
          <li>
            Functional Cookies: Remember preferences (such as language or interface settings) to improve usability.
          </li>
          <li>
            Analytics Cookies: Help us understand site traffic and behavior to improve performance and content.
          </li>
          <li>
            Marketing Cookies: May be used to measure campaign performance and deliver relevant content.
            Used only where lawful basis exists.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">4. Cookie Duration</h2>
        <p>
          Some cookies are session cookies (deleted when you close your browser), while others are persistent
          cookies (remain until they expire or are deleted manually).
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">5. Third-Party Cookies</h2>
        <p>
          We may allow trusted third-party providers (for example analytics or hosting partners) to set cookies.
          Their processing is governed by their own privacy and cookie policies.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">6. Legal Basis</h2>
        <p>
          Where required by law, we rely on consent for non-essential cookies and legitimate interest or necessity
          for strictly required cookies. You may withdraw consent at any time through browser controls and applicable
          site-level controls. For users in Turkey, cookie processing is handled in line with Law No. 6698 (KVKK)
          and related guidance where applicable.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">7. How to Manage Cookies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Adjust browser settings to block or delete cookies.</li>
          <li>Use private/incognito mode to reduce stored data persistence.</li>
          <li>Clear existing site data from browser privacy settings.</li>
          <li>Note that blocking some cookies may impact website functionality.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">8. Do Not Track</h2>
        <p>
          Browser "Do Not Track" signals are not yet standardized across services. We handle tracking controls
          based on applicable law and available consent mechanisms.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">9. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy to reflect changes in technologies, law, or business practices.
          The latest version is always published on this page.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">10. Contact</h2>
        <p>
          For questions about our cookie use, contact:
          <a href="mailto:sam.d@cheeriostudios.com" className="text-brand-gold hover:underline ml-1">
            sam.d@cheeriostudios.com
          </a>
        </p>
      </section>
    </LegalPageLayout>
  )
}
