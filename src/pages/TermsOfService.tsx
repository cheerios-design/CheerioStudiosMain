import LegalPageLayout from '@/pages/LegalPageLayout'

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="April 18, 2026">
      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">1. Acceptance of Terms</h2>
        <p>
          By accessing or using this website and related services, you agree to be bound by these Terms of Service
          ("Terms"). If you do not agree, do not use the site or services.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">2. Services</h2>
        <p>
          Cheerio Studio provides creative and digital services including branding, web development, digital design,
          consulting, and related support. Specific project scope, deliverables, pricing, timelines, and ownership
          terms may be defined in separate agreements or statements of work.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">3. Eligibility and User Conduct</h2>
        <p>You agree to use our website and services only for lawful purposes. You must not:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Violate applicable laws or regulations.</li>
          <li>Attempt unauthorized access to systems, networks, or accounts.</li>
          <li>Interfere with site security, performance, or availability.</li>
          <li>Submit false, misleading, or infringing content.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">4. Intellectual Property</h2>
        <p>
          Unless otherwise stated, all content on this website (text, visuals, code, branding, layout) is owned by
          Cheerio Studio or its licensors and is protected by intellectual property laws. No rights are granted except
          as expressly provided.
        </p>
        <p className="mt-3">
          Project deliverable ownership and license terms are governed by the applicable client agreement.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">5. Third-Party Links and Services</h2>
        <p>
          Our site may include links to third-party websites or tools. We do not control and are not responsible for
          third-party content, practices, or policies.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">6. Quotes, Payments, and Project Terms</h2>
        <p>
          Pricing, invoicing, taxes, payment terms, revisions, cancellation, and delivery schedules are set out in
          project-specific documents. In case of conflict, signed project agreements control over these general Terms.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">7. Disclaimers</h2>
        <p>
          The website and content are provided on an "as is" and "as available" basis without warranties of any kind,
          whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement,
          to the fullest extent permitted by law.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Cheerio Studio will not be liable for indirect, incidental, special,
          consequential, or punitive damages, including lost profits, data loss, or business interruption arising from
          or related to use of the website or services.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Cheerio Studio from claims, losses, liabilities, and costs resulting
          from your misuse of the website or violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">10. Suspension and Termination</h2>
        <p>
          We may suspend or terminate access to our site or services for violations of these Terms, security concerns,
          legal obligations, or operational reasons.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">11. Governing Law and Jurisdiction</h2>
        <p>
          These Terms are governed by the laws of the Republic of Turkey, without regard to conflict-of-law rules.
          Unless mandatory consumer protection law requires otherwise, disputes arising out of or related to these
          Terms will be subject to the exclusive jurisdiction of the courts and enforcement offices of Bolu, Turkey.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">12. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the website after updates constitutes
          acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="font-dazzle text-brand-gold text-2xl mb-3 uppercase">13. Contact</h2>
        <p>
          Questions regarding these Terms can be sent to:
          <a href="mailto:sam.d@cheeriostudios.com" className="text-brand-gold hover:underline ml-1">
            sam.d@cheeriostudios.com
          </a>
        </p>
        <p className="mt-3">Cheerio Studio, Bolu, Turkey</p>
      </section>
    </LegalPageLayout>
  )
}
