'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import { StaticGlyph } from './glyph/Glyph';
import CheerioLogo from './CheerioLogo';
import Magnetic from './chrome/Magnetic';
import Footer from './sections/Footer';
import PixelBand from './sections/PixelBand';
import PanelStory from './PanelStory';
import { BOOKING_URL, LIME, SITE_URL } from '@/lib/site';
import { FACTS, INTRO } from '@/lib/sdmt-panel';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PanelWalkthrough() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Inside the SDMT Panel',
    description: INTRO.lede,
    url: `${SITE_URL}/pages/baibu-cinema/panel/`,
    isPartOf: { '@type': 'CreativeWork', url: `${SITE_URL}/pages/baibu-cinema/` },
    creator: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-lime" style={{ scaleX: progress }} />

      <main className="bg-ink">
        <header className="dot-grid relative px-5 pb-20 pt-6 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-20 flex items-center justify-between pr-20">
              <Link href="/" className="group flex items-center gap-3">
                <CheerioLogo size={28} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
                <span className="label text-paper">Cheerio Studios</span>
              </Link>
              <Link href="/pages/baibu-cinema/" className="note hidden text-mute transition-colors hover:text-lime sm:block">
                ( Back to the SDMT case study )
              </Link>
            </div>

            <p className="label mb-8 text-lime">( 03 ) — {INTRO.kicker}</p>
            <GlyphText as="h1" text={INTRO.title} fit="width" leading={2} delay={0.1} className="text-paper" />

            <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <motion.p
                className="max-w-2xl text-[clamp(1.15rem,1.7vw,1.45rem)] leading-relaxed text-paper/85"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              >
                {INTRO.lede}
              </motion.p>
              <motion.p
                className="flex max-w-sm items-start gap-3 rounded-chip border border-ink-3 p-4 text-sm leading-relaxed text-mute"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
              >
                <span className="mt-0.5 text-lime">
                  <StaticGlyph shape="eye" size={16} />
                </span>
                {INTRO.note}
              </motion.p>
            </div>
          </div>
        </header>

        <section aria-label="Panel walkthrough" className="border-t border-ink-3 pt-20">
          <PanelStory />
        </section>

        {/* Facts */}
        <section aria-labelledby="facts-h" className="border-t border-ink-3 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <h2 id="facts-h" className="label mb-12 text-mute">( Under the hood )</h2>
            <dl className="grid gap-px overflow-hidden rounded-tile border border-ink-3 bg-ink-3 sm:grid-cols-2 lg:grid-cols-4">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex flex-col gap-4 bg-ink p-8"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                >
                  <dt className="order-2 text-paper/75">{f.label}</dt>
                  <dd className="order-1">
                    <GlyphText text={f.value} size="clamp(3rem, 6vw, 5rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* Call to action */}
        <section className="px-5 pb-28 sm:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-10 rounded-tile bg-lime p-8 text-ink sm:p-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="label mb-4 font-bold">( Your turn )</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-tight">
                Running your organisation on chats and spreadsheets?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/75">
                We design and build the system behind the brand: secure, role-based tools your team actually enjoys using.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-bold text-lime">
                  Book a free strategy call
                  <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
                </a>
              </Magnetic>
              <Link href="/#contact" className="label inline-flex items-center rounded-full border border-ink/30 px-7 py-4 font-bold transition-colors hover:bg-ink hover:text-lime">
                Send a brief
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[1440px] border-t border-ink-3 pt-10 text-center">
            <Link href="/pages/baibu-cinema/" className="group inline-flex items-center gap-3 font-display text-lg font-bold text-lime">
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
              </span>
              Back to the SDMT case study
            </Link>
          </div>
        </section>

        <PixelBand />
      </main>
      <Footer />
    </>
  );
}
