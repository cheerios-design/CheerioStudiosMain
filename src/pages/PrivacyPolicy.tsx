import LegalPageLayout from '@/pages/LegalPageLayout'

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 18, 2026">
      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">1. Who We Are</h2>
        <p>
          Cheerio Studio ("we", "us", "our") provides branding, web development, digital design,
          and related creative services. This Privacy Policy explains how we collect, use, share,
          and protect personal data when you use our website and services.
        </p>
        <p className="mt-3">
          Data Controller: Cheerio Studio<br />
          Location: Bolu, Turkey<br />
          Contact: sam.d@cheeriostudios.com
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">2. Scope</h2>
        <p>
          This policy applies to information collected through our website, contact forms, direct email,
          and client communications. It is designed to align with generally applicable privacy frameworks,
          including GDPR principles, California privacy rights concepts (where applicable), and Turkey's
          Law No. 6698 on the Protection of Personal Data (KVKK) where relevant.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">3. Data We Collect</h2>
        <p>Depending on your interaction with us, we may collect:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Identity and contact data such as name, company, email address, and phone number.</li>
          <li>Inquiry details such as project requirements, service interests, and messages.</li>
          <li>Technical data such as IP address, browser type, device type, referring pages, and timestamps.</li>
          <li>Usage data such as pages viewed, session behavior, and interaction events.</li>
          <li>Cookie and similar tracking data as described in our Cookie Policy.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">4. Legal Bases for Processing</h2>
        <p>We process personal data under one or more of the following legal bases:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Your consent (for optional cookies, marketing where required, and certain communications).</li>
          <li>Performance of a contract or pre-contract steps (for project requests and service delivery).</li>
          <li>Legitimate interests (for website improvement, security, and basic analytics).</li>
          <li>Compliance with legal obligations (tax, accounting, fraud prevention, and regulatory duties).</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">5. How We Use Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Responding to inquiries and managing client communications.</li>
          <li>Providing and improving services and website functionality.</li>
          <li>Maintaining security, monitoring abuse, and preventing fraud.</li>
          <li>Meeting legal and contractual obligations.</li>
          <li>Sending service-related updates and, where permitted, marketing communications.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">6. Data Sharing</h2>
        <p>We do not sell personal data. We may share data with:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Service providers that support hosting, analytics, email, and operations.</li>
          <li>Professional advisors (legal, accounting, compliance) when required.</li>
          <li>Authorities or law enforcement where legally required.</li>
          <li>Successors in the event of business restructuring, merger, or acquisition.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">7. International Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your own.
          Where required, we apply appropriate safeguards such as contractual protections and
          security controls to maintain lawful transfer standards.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">8. Retention</h2>
        <p>
          We retain personal data only as long as necessary for the purposes described in this policy,
          including legal, accounting, and dispute resolution obligations. Retention periods depend on
          data type, regulatory requirements, and operational need.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">9. Your Rights</h2>
        <p>Subject to applicable law, you may have rights to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Access, correct, update, or delete your personal data.</li>
          <li>Restrict or object to certain processing activities.</li>
          <li>Request portability of your data where technically feasible.</li>
          <li>Withdraw consent at any time where processing depends on consent.</li>
          <li>Lodge a complaint with a competent supervisory authority.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">10. Security</h2>
        <p>
          We apply reasonable technical and organizational measures to protect personal information.
          No method of transmission or storage is fully secure, so absolute security cannot be guaranteed.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">11. Children</h2>
        <p>
          Our services are not directed to children under 13 (or higher age where required by local law).
          We do not knowingly collect personal data from children.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes become effective when posted on this page,
          and we will revise the "Last updated" date accordingly.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">13. Contact</h2>
        <p>
          For privacy requests, rights inquiries, or data protection questions, contact us at:
          <a href="mailto:sam.d@cheeriostudios.com" className="text-brand-gold hover:underline ml-1">
            sam.d@cheeriostudios.com
          </a>
        </p>
        <p className="mt-3">Mailing location: Bolu, Turkey</p>
      </section>
    </LegalPageLayout>
  )
}
