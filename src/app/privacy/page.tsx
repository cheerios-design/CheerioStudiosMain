import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';
import { EMAIL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses and protects the personal data you share through this website.`,
  alternates: { canonical: '/privacy/' },
};

const UPDATED = '2 October 2026';

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: 'Who we are',
    body: [
      `${SITE_NAME} is a digital creative studio run by Sam Daramroei. We are the data controller for personal data collected through this website. You can reach us at ${EMAIL}.`,
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'When you send the contact form we receive your name, email address, and anything else you choose to give us: your company, website, the topic you picked and your message.',
      'When you book a call, Calendly collects your name, email and the time you choose on our behalf.',
      'We do not use advertising cookies or sell your data.',
    ],
  },
  {
    heading: 'Why we use it',
    body: [
      'We use your details only to reply to your enquiry, prepare for a call you booked, and, if we work together, deliver the project. Our legal basis is your consent and our legitimate interest in answering requests you make (GDPR Art. 6(1)(a) and (f); KVKK Art. 5).',
    ],
  },
  {
    heading: 'Who processes it',
    body: [
      'Form messages are delivered by Web3Forms and stored in our email inbox. Bookings are handled by Calendly. The site is hosted on GitHub Pages. These providers may process data outside your country under their own safeguards, such as standard contractual clauses.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiries that do not lead to a project are deleted within 12 months. Client records are kept as long as the law requires for invoicing and accounting.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You can ask to see, correct, export or delete your data, or object to how we use it, at any time by emailing ${EMAIL}. We reply within 30 days. You can also complain to your local data protection authority, such as the KVKK Board in Türkiye or your EU supervisory authority.`,
    ],
  },
];

export default function Page() {
  return (
    <>
      <main className="bg-ink px-5 pb-24 pt-10 text-paper sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="label text-mute transition-colors hover:text-lime">
            ← Back to the main page
          </Link>
          <h1 className="mb-3 mt-16 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-tight">
            Privacy Policy
          </h1>
          <p className="label mb-16 text-mute">Last updated {UPDATED}</p>
          {SECTIONS.map((s) => (
            <section key={s.heading} className="mb-12">
              <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight text-lime">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mb-4 text-lg leading-relaxed text-mute">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
