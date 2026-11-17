'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import Glyph, { StaticGlyph } from './glyph/Glyph';
import CheerioLogo from './CheerioLogo';
import Magnetic from './chrome/Magnetic';
import BriefForm from './BriefForm';
import Footer from './sections/Footer';
import PixelBand from './sections/PixelBand';
import { ServiceRow } from './sections/Services';
import { ValueTile } from './sections/About';
import Chapter, { EASE, type ChapterMeta } from './case-study/Chapter';
import ChapterRail from './case-study/ChapterRail';
import { useLenis } from './SmoothScroll';
import { BOOKING_URL, LIME, SITE_URL } from '@/lib/site';
import {
  SPRINT,
  SPRINT_ADDONS,
  SPRINT_FAQ,
  SPRINT_FIT,
  SPRINT_GAPS,
  SPRINT_INCLUDED,
  SPRINT_PRICE_POINTS,
  SPRINT_STEPS,
  SPRINT_SUMMARY,
} from '@/lib/sprint';

const CHAPTERS_ID = 'chapters';
const BRIEF_ID = 'brief';

// Same chapter pattern as the case studies: numbered as they appear
const CHAPTERS: ChapterMeta[] = [
  { id: 'gap', label: 'The gap' },
  { id: 'included', label: 'Included' },
  { id: 'process', label: 'Process' },
  { id: 'price', label: 'Price' },
  { id: 'faq', label: 'FAQ' },
].map((c, i, all) => ({ ...c, num: String(i + 1).padStart(2, '0'), total: String(all.length).padStart(2, '0') }));

const meta = (id: string) => CHAPTERS.find((c) => c.id === id)!;
const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function Sprint() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [ctaHover, setCtaHover] = useState(false);
  const [priceHover, setPriceHover] = useState(false);

  const founding = SPRINT.foundingSpots > 0;
  const price = founding ? SPRINT.foundingPrice : SPRINT.regularPrice;
  const spots = `${SPRINT.foundingSpots} ${SPRINT.foundingSpots === 1 ? 'SPOT' : 'SPOTS'}`;
  const cta = founding ? 'Claim a founding spot' : 'Start your sprint';

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // The title drifts down and fades as the hero scrolls away
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  /** Glide to a section on this page */
  const jump = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { duration: 1.4, force: true });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  const stats = useMemo(
    () => [
      { value: `${SPRINT.days} DAYS`, label: 'From brief to live page' },
      { value: `${price} USD`, label: founding ? 'Founding price, all-in' : 'Fixed price, all-in' },
      founding ? { value: spots, label: 'Left at the founding price' } : { value: '2 ROUNDS', label: 'Of revisions, built in' },
    ],
    [founding, price, spots]
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SPRINT.name} for SaaS founders`,
    serviceType: 'Landing page design and development',
    description: SPRINT_SUMMARY,
    url: `${SITE_URL}/sprint/`,
    provider: { '@id': `${SITE_URL}/#organization` },
    audience: { '@type': 'BusinessAudience', name: 'SaaS founders' },
    offers: { '@type': 'Offer', price: String(price), priceCurrency: 'USD', url: `${SITE_URL}/sprint/` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Reading progress */}
      <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-lime" style={{ scaleX: progress }} />
      <ChapterRail chapters={CHAPTERS} wrapperId={CHAPTERS_ID} />

      <main className="bg-ink">
        <header ref={heroRef} className="dot-grid relative flex min-h-[100svh] flex-col px-5 pb-10 pt-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
            <div className="flex items-center justify-between pr-20">
              <Link href="/" className="group flex items-center gap-3">
                <CheerioLogo size={28} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
                <span className="label text-paper">Cheerio Studios</span>
              </Link>
              <Link href="/#services" className="note hidden text-mute transition-colors hover:text-lime sm:block">
                ( Back to all services )
              </Link>
            </div>

            <motion.div className="mt-auto pt-20" style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <GlyphText text={`${SPRINT.days} DAYS`} size="clamp(2.6rem, 8vw, 7rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
                <motion.span
                  className="grid h-24 w-24 place-items-center rounded-tile bg-lime text-ink sm:h-32 sm:w-32"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.3 }}
                >
                  <Glyph shapes={['bolt', 'sparkle', 'smiley']} size="58%" interval={2200} />
                </motion.span>
              </div>

              <GlyphText as="h1" text={'LAUNCH\nSPRINT'} fit="width" leading={2} delay={0.2} className="text-paper" />

              <motion.div
                className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              >
                <div className="max-w-xl">
                  <p className="label mb-4 text-lime">For SaaS founders</p>
                  <p className="text-lg leading-relaxed text-mute">
                    <span className="text-paper">Your product is ready. Your page should be too.</span> A conversion-focused
                    landing page and mini brand kit, designed and built in {SPRINT.days} days. Fixed scope, fixed price.
                  </p>
                </div>
                <Magnetic>
                  <a
                    href={`#${BRIEF_ID}`}
                    onClick={jump(BRIEF_ID)}
                    data-umami-event="Sprint CTA"
                    data-umami-event-from="hero"
                    onPointerEnter={() => setCtaHover(true)}
                    onPointerLeave={() => setCtaHover(false)}
                    className="group flex items-center gap-4 rounded-full bg-lime py-3 pl-7 pr-3 text-ink"
                  >
                    <span className="label text-[0.8rem] font-bold">{cta}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 ease-glyph group-hover:rotate-90">
                      <Glyph shapes={['arrow', 'sparkle']} active={ctaHover ? 1 : 0} size={18} radius={0.5} />
                    </span>
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* The offer in three numbers */}
        <section aria-label="The sprint at a glance" className="px-5 pt-10 sm:px-8">
          <dl className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-tile border border-ink-3 bg-ink-3 sm:grid-cols-3">
            {stats.map((st, i) => (
              <motion.div
                key={st.label}
                className="flex flex-col gap-3 bg-ink p-8 sm:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              >
                <dt className="order-2 text-lg text-paper/80">{st.label}</dt>
                <dd className="order-1">
                  <GlyphText text={st.value} size="clamp(2.2rem, 4vw, 3.6rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
                  <span className="sr-only">{st.value}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </section>

        <div id={CHAPTERS_ID}>
          <Chapter
            meta={meta('gap')}
            title="A website is not a presence"
            aside={<p>Most founders confuse having a website with having a presence. These are the three places the gap shows.</p>}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {SPRINT_GAPS.map((g, i) => (
                <ValueTile key={g.title} value={g} index={i} />
              ))}
            </div>
          </Chapter>

          <Chapter
            meta={meta('included')}
            title="One sprint, everything to launch"
            aside={<p>Five pieces, built to work together, so the page, the brand and your launch posts look like one product.</p>}
          >
            <ul>
              {SPRINT_INCLUDED.map((s, i) => (
                <ServiceRow key={s.title} service={s} index={i} />
              ))}
            </ul>

            <motion.div
              className="mt-10 grid gap-8 rounded-tile border border-ink-3 bg-ink-2 p-7 sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div>
                <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight">Add-ons</h3>
                <p className="max-w-sm leading-relaxed text-mute">Need more than the sprint covers? Add it at a fixed price.</p>
              </div>
              <dl>
                {SPRINT_ADDONS.map((a) => (
                  <div key={a.title} className="flex items-baseline justify-between gap-6 border-t border-ink-3 py-4 last:border-b">
                    <dt className="text-paper/85">{a.title}</dt>
                    <dd className="shrink-0 font-display font-bold text-lime">{a.price}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </Chapter>

          <Chapter
            meta={meta('process')}
            title="Seven days, no endless calls"
            aside={<p>Everything runs async. You fill in one brief, review on two set days, and launch on day seven.</p>}
          >
            <ol className="grid gap-px overflow-hidden rounded-tile border border-ink-3 bg-ink-3 sm:grid-cols-2 lg:grid-cols-3">
              {SPRINT_STEPS.map((s, i) => {
                const last = i === SPRINT_STEPS.length - 1;
                return (
                  <motion.li
                    key={s.day}
                    className={`flex flex-col gap-6 p-8 sm:p-10 ${last ? 'bg-lime text-ink' : 'bg-ink'}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
                  >
                    <GlyphText
                      text={s.day}
                      size="clamp(1.4rem, 2.2vw, 2rem)"
                      className={last ? 'text-ink' : 'text-lime'}
                      hoverColor={last ? 'currentColor' : 'var(--color-paper)'}
                      decorative
                      interactive
                    />
                    <div>
                      <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight">
                        <span className="sr-only">{s.day.replace('DAY', 'Day').replace('-', ' to ')}: </span>
                        {s.title}
                      </h3>
                      <p className={`leading-relaxed ${last ? 'text-ink/75' : 'text-mute'}`}>{s.copy}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </Chapter>

          <Chapter
            meta={meta('price')}
            title="One fixed price"
            aside={
              founding ? (
                <p>
                  The founding rate is for our first {SPRINT.foundingSpots === 1 ? 'SaaS client' : `${SPRINT.foundingSpots} SaaS clients`}, in
                  exchange for a short case study. After that the sprint is {usd(SPRINT.regularPrice)}.
                </p>
              ) : (
                <p>The scope is agreed in writing before day one, so the price never moves.</p>
              )
            }
          >
            <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
              <motion.div
                className="flex flex-col gap-8 rounded-tile bg-lime p-8 text-ink sm:p-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="label font-bold">{founding ? 'Founding price' : 'Launch Sprint'}</span>
                  {founding && <span className="note text-ink/60">( {SPRINT.foundingSpots} {SPRINT.foundingSpots === 1 ? 'spot' : 'spots'} left )</span>}
                </div>
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                  {/* The glyph typeface has no "$", so the big figure reads "750 USD" */}
                  <GlyphText text={`${price} USD`} size="clamp(2.6rem, 6.5vw, 5.5rem)" hoverColor="currentColor" decorative interactive />
                  <span className="sr-only">{usd(price)}</span>
                  {founding && <span className="note pb-2 text-ink/60">then {usd(SPRINT.regularPrice)}</span>}
                </div>
                <ul className="flex flex-col gap-3">
                  {SPRINT_PRICE_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-lg leading-snug">
                      <span className="mt-1">
                        <StaticGlyph shape="sparkle" size={18} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.25} className="w-fit">
                  <a
                    href={`#${BRIEF_ID}`}
                    onClick={jump(BRIEF_ID)}
                    data-umami-event="Sprint CTA"
                    data-umami-event-from="price"
                    onPointerEnter={() => setPriceHover(true)}
                    onPointerLeave={() => setPriceHover(false)}
                    className="flex items-center gap-4 rounded-full bg-ink py-3 pl-8 pr-3 text-lime"
                  >
                    <span className="label text-[0.8rem] font-bold">{cta}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink">
                      <Glyph shapes={['arrow', 'sparkle']} active={priceHover ? 1 : 0} size={18} radius={0.5} />
                    </span>
                  </a>
                </Magnetic>
              </motion.div>

              <div className="grid gap-4">
                {(
                  [
                    ['A good fit if you', SPRINT_FIT.yes, 'plus'],
                    ['Not the right fit if you', SPRINT_FIT.no, 'close'],
                  ] as const
                ).map(([heading, items, icon], i) => (
                  <motion.div
                    key={heading}
                    className="rounded-tile border border-ink-3 bg-ink-2 p-7 sm:p-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.08 }}
                  >
                    <h3 className={`label mb-6 ${i === 0 ? 'text-lime' : 'text-mute'}`}>{heading}</h3>
                    <ul className="flex flex-col gap-4">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3 leading-relaxed text-paper/85">
                          <span className={`mt-1.5 ${i === 0 ? 'text-lime' : 'text-mute'}`}>
                            <StaticGlyph shape={icon} size={14} radius={0.5} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </Chapter>

          <Chapter meta={meta('faq')} title="Good questions">
            <div className="mx-auto max-w-4xl">
              {SPRINT_FAQ.map((f) => (
                <details key={f.q} className="group border-t border-ink-3 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.15rem,2vw,1.6rem)] font-bold uppercase leading-tight tracking-tight transition-colors hover:text-lime [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lime/40 text-lime transition-transform duration-300 ease-glyph group-open:rotate-45">
                      <StaticGlyph shape="plus" size={14} radius={0.5} />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-8 text-lg leading-relaxed text-mute">{f.a}</p>
                </details>
              ))}
            </div>
          </Chapter>
        </div>

        <PixelBand />

        {/* The brief: same lime section and form as the homepage contact */}
        <section id={BRIEF_ID} className="relative overflow-hidden bg-lime px-5 py-24 text-ink sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-6 flex items-center justify-between">
              <span className="label font-bold">( Start your sprint )</span>
              {founding && <span className="note text-ink/60">( {SPRINT.foundingSpots} founding {SPRINT.foundingSpots === 1 ? 'spot' : 'spots'} left )</span>}
            </div>

            <div className="mb-16 flex items-end justify-between gap-6 sm:mb-24">
              <GlyphText as="h2" text={'SEND YOUR\nBRIEF'} size="min(9.5vw, 9rem)" interactive hoverColor="currentColor" />
              <motion.div
                className="hidden lg:block"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.4 }}
              >
                <Glyph shapes={['bolt', 'smiley', 'sparkle']} size="min(18vw, 16rem)" interval={2200} />
              </motion.div>
            </div>

            <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
              <div className="flex flex-col gap-10">
                <p className="max-w-md text-xl leading-relaxed text-ink/75">
                  Tell us about your product. We&apos;ll reply by email to confirm the scope and your start date before any
                  payment.
                </p>
                <div className="flex flex-col gap-4 rounded-tile border border-ink/20 p-6">
                  <span className="label font-bold">Not sure it&apos;s the right fit?</span>
                  <p className="max-w-md leading-relaxed text-ink/75">
                    Book a free 30-minute strategy session and we&apos;ll look at your product and your page together, no
                    strings attached.
                  </p>
                  <a
                    href={BOOKING_URL}
                    data-umami-event="Book a call"
                    data-umami-event-from="sprint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label w-fit rounded-full bg-ink px-6 py-3.5 font-bold text-lime transition-opacity hover:opacity-85"
                  >
                    Book a call ↗
                  </a>
                </div>
              </div>

              <BriefForm variant="sprint" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
