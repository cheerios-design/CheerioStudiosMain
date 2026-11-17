'use client';

import { motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import BriefForm from '../BriefForm';
import { BOOKING_URL, CONTACT_LINKS, EMAIL } from '@/lib/site';

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-lime px-5 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center justify-between">
          <span className="label font-bold">( 05 )</span>
          <span className="note text-ink/60">( Currently booking new projects )</span>
        </div>

        <div className="mb-16 flex items-end justify-between gap-6 sm:mb-24">
          <GlyphText as="h2" text={"LET'S\nTALK"} size="min(12vw, 9rem)" interactive hoverColor="currentColor" />
          <motion.div
            className="hidden md:block"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.4 }}
          >
            <Glyph shapes={['smiley', 'heart', 'sparkle']} size="min(22vw, 18rem)" interval={2200} />
          </motion.div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="flex flex-col gap-10">
            <p className="max-w-md text-xl leading-relaxed text-ink/75">
              Tell us where your current workflow is breaking down, and we&apos;ll shape a focused plan that brings
              strategy, visuals and execution together.
            </p>
            <div className="flex flex-col gap-4 rounded-tile border border-ink/20 p-6">
              <span className="label font-bold">Free 30-minute strategy session</span>
              <p className="max-w-md leading-relaxed text-ink/75">
                Rather talk it through? Pick a time and we&apos;ll look at your brand and website together, no strings
                attached.
              </p>
              <a
                href={BOOKING_URL}
                data-umami-event="Book a call"
                data-umami-event-from="contact"
                target="_blank"
                rel="noopener noreferrer"
                className="label w-fit rounded-full bg-ink px-6 py-3.5 font-bold text-lime transition-opacity hover:opacity-85"
              >
                Book a call ↗
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label font-bold">Complimentary website audit</span>
              <p className="max-w-md leading-relaxed text-ink/75">
                Pick &ldquo;Free Website Audit&rdquo; in the form and share your URL. We&apos;ll send back the three fixes
                that would make the biggest difference.
              </p>
            </div>
            <a href={`mailto:${EMAIL}`} data-umami-event="Email click" className="group w-fit">
              <span className="label mb-2 block text-ink/60">Or email directly</span>
              <span className="relative font-display text-[clamp(1.3rem,2.6vw,2.2rem)] font-bold">
                {EMAIL}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-glyph group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
            <div className="flex flex-wrap gap-3">
              {CONTACT_LINKS.filter((l) => l.name !== 'Email').map((l) => (
                <a
                  key={l.name}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-full border border-ink/25 px-5 py-3 font-bold transition-colors duration-300 hover:bg-ink hover:text-lime"
                >
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          <BriefForm />
        </div>
      </div>
    </section>
  );
}
