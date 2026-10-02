'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import Glyph, { StaticGlyph } from './glyph/Glyph';
import CheerioLogo from './CheerioLogo';
import Footer from './sections/Footer';
import PixelBand from './sections/PixelBand';
import TestimonialCard from './TestimonialCard';
import { LIME, PROJECTS, SITE_URL, TESTIMONIALS } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudy({ slug }: { slug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [nextHover, setNextHover] = useState(false);
  const reviews = TESTIMONIALS.filter((t) => t.projectSlug === slug);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.subtitle,
    description: project.summary,
    url: `${SITE_URL}/pages/${project.slug}/`,
    sameAs: project.link,
    keywords: project.deliverables.join(', '),
    creator: { '@id': `${SITE_URL}/#organization` },
    sourceOrganization: { '@type': 'Organization', name: project.client },
    review: reviews.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Organization', name: t.author },
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Reading progress */}
      <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-lime" style={{ scaleX: progress }} />

      <main className="bg-ink">
        <header className="dot-grid relative px-5 pb-16 pt-6 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-20 flex items-center justify-between pr-20">
              <Link href="/" className="group flex items-center gap-3">
                <CheerioLogo size={28} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
                <span className="label text-paper">Cheerio Studios</span>
              </Link>
              <Link href="/#work" className="note hidden text-mute transition-colors hover:text-lime sm:block">
                ( Back to all work )
              </Link>
            </div>

            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <GlyphText text={project.num} size="clamp(4rem, 12vw, 10rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
              <motion.span
                className="grid h-24 w-24 place-items-center rounded-tile bg-lime text-ink sm:h-32 sm:w-32"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.3 }}
              >
                <Glyph shapes={[project.icon, 'sparkle', 'smiley']} size="58%" interval={2200} />
              </motion.span>
            </div>

            <GlyphText as="h1" text={project.glyphTitle} fit="width" leading={2} delay={0.2} className="text-paper" />

            <motion.p
              className="label mt-10 text-lime"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
            >
              {project.subtitle}
            </motion.p>
          </div>
        </header>

        {/* Meta strip */}
        <div className="border-y border-ink-3 px-5 sm:px-8">
          <dl className="mx-auto grid max-w-[1440px] gap-6 py-8 sm:grid-cols-3">
            {[
              ['Client', project.client],
              ['Role', project.role],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label mb-2 text-mute">{k}</dt>
                <dd className="font-display text-lg font-bold">{v}</dd>
              </div>
            ))}
            <div>
              <dt className="label mb-2 text-mute">Live</dt>
              <dd>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-display text-lg font-bold text-lime">
                  Visit project
                  <span className="transition-transform duration-300 group-hover:-rotate-45">
                    <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {project.preview && (
          <div className="px-5 pt-24 sm:px-8">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the live ${project.title} site`}
              className="group mx-auto block max-w-5xl overflow-hidden rounded-tile border border-ink-3 bg-ink-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-4 border-b border-ink-3 px-4 py-3">
                <span className="flex gap-1.5" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink-3" />
                  ))}
                </span>
                <span className="note min-w-0 flex-1 truncate text-mute transition-colors group-hover:text-lime">
                  {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
                <span className="text-lime transition-transform duration-300 group-hover:-rotate-45" aria-hidden>
                  <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.preview.src}
                alt={project.preview.alt}
                width={1440}
                height={900}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-700 ease-glyph group-hover:scale-[1.02]"
              />
            </motion.a>
          </div>
        )}

        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="label mb-6 text-mute">Deliverables</h2>
            <ul className="flex flex-col">
              {project.deliverables.map((d, i) => (
                <motion.li
                  key={d}
                  className="flex items-center gap-4 border-t border-ink-3 py-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                >
                  <StaticGlyph shape="sparkle" size={14} className="text-lime" />
                  <span>{d}</span>
                </motion.li>
              ))}
            </ul>
          </aside>

          <div className="flex flex-col gap-24">
            {project.sections.map((s, i) => (
              <motion.section
                key={s.heading}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className="mb-8 flex items-center gap-6">
                  <GlyphText text={`0${i + 1}`} size="clamp(2.4rem, 4vw, 3.4rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
                  <h2 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold uppercase tracking-tight">{s.heading}</h2>
                </div>
                <p className="max-w-3xl text-lg leading-[1.8] text-paper/75">{s.body}</p>
              </motion.section>
            ))}
            {reviews.map((t) => (
              <TestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>
        </div>

        <div className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1440px] border-t border-ink-3 pt-10 text-center">
            <Link href="/" className="group inline-flex items-center gap-3 font-display text-lg font-bold text-lime">
              <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
              </span>
              Back to the main page
            </Link>
          </div>
        </div>

        <PixelBand />

        {/* Next project */}
        <Link
          href={`/pages/${next.slug}`}
          onPointerEnter={() => setNextHover(true)}
          onPointerLeave={() => setNextHover(false)}
          className="block bg-lime px-5 py-20 text-ink sm:px-8"
        >
          <div className="mx-auto max-w-[1440px]">
            <span className="label mb-8 flex items-center justify-between font-bold">
              Next project
              <span className="note font-normal">( {next.num} / 0{PROJECTS.length} )</span>
            </span>
            <GlyphText text={next.glyphTitle} fit="width" hovered={nextHover} hoverColor="currentColor" />
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
