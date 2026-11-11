'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import Glyph, { StaticGlyph } from './glyph/Glyph';
import CheerioLogo from './CheerioLogo';
import Footer from './sections/Footer';
import PixelBand from './sections/PixelBand';
import TestimonialCard from './TestimonialCard';
import ProjectLogo from './ProjectLogo';
import Chapter, { EASE, type ChapterMeta } from './case-study/Chapter';
import ChapterRail from './case-study/ChapterRail';
import ScrollLede from './case-study/ScrollLede';
import BrowserChrome, { hostOf } from './case-study/BrowserChrome';
import Compare from './case-study/Compare';
import GuideReel from './case-study/GuideReel';
import Story from './case-study/Story';
import { LIME, PROJECTS, SITE_URL, TESTIMONIALS, type Project } from '@/lib/site';

const CHAPTERS_ID = 'chapters';

/**
 * Every case study is built from the same chapters, always in this order.
 * A project only shows the ones it has material for, and they are numbered as they appear.
 */
function chaptersFor(project: Project, hasReviews: boolean): ChapterMeta[] {
  const list = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'results', label: 'Results', show: !!project.stats },
    { id: 'website', label: 'Website', show: !!project.preview || !!project.screens },
    { id: 'identity', label: 'Identity', show: !!project.gallery },
    { id: 'guide', label: 'Brand guide', show: !!project.guide },
    { id: 'compare', label: 'Before / After', show: !!project.comparisons },
    { id: 'panel', label: 'Panel', show: !!project.walkthrough },
    { id: 'story', label: 'Story', show: true },
    { id: 'review', label: 'Review', show: hasReviews },
  ].filter((c) => c.show);
  const total = String(list.length).padStart(2, '0');
  return list.map((c, i) => ({ id: c.id, label: c.label, num: String(i + 1).padStart(2, '0'), total }));
}

/** The live site in a browser frame that grows into place as it is scrolled to */
function Website({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const host = hostOf(project.link);

  return (
    <>
      {project.preview && (
        <div ref={ref} className="mx-auto max-w-6xl">
          <motion.a
            href={project.link}
            data-umami-event="Visit project"
            data-umami-event-project={project.slug}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${project.title} site`}
            className="group block origin-top overflow-hidden rounded-tile border border-ink-3 bg-ink-2 transition-colors duration-300 hover:border-lime"
            style={reduce ? undefined : { scale }}
          >
            <BrowserChrome host={host}>
              <span className="text-lime transition-transform duration-300 group-hover:-rotate-45" aria-hidden>
                <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
              </span>
            </BrowserChrome>
            <div className="overflow-hidden">
              <motion.img
                src={project.preview.src}
                alt={project.preview.alt}
                width={1440}
                height={900}
                loading="lazy"
                className="block h-auto w-full"
                style={reduce ? undefined : { scale: zoom }}
              />
            </div>
          </motion.a>
        </div>
      )}

      {project.screens && (
        <ul className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {project.screens.map((sc, i) => (
            <motion.li
              key={sc.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <figure>
                <div className="overflow-hidden rounded-tile border border-ink-3 bg-ink-2">
                  <BrowserChrome host={host} path={sc.path} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sc.src} alt={sc.alt} width={1388} height={868} loading="lazy" className="block h-auto w-full" />
                </div>
                <figcaption className="label mt-3 text-mute">{sc.caption}</figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Logo tiles that drift at slightly different speeds as the page scrolls */
function Identity({ gallery }: { gallery: NonNullable<Project['gallery']> }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const up = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const down = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <ul ref={ref} className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
      {gallery.map((g, i) => (
        <motion.li key={g.src} className={i === 0 ? 'col-span-2 sm:col-span-1' : undefined} style={reduce ? undefined : { y: i % 2 ? down : up }}>
          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
          >
            <div
              className={`group relative overflow-hidden rounded-tile border border-ink-3 ${i === 0 ? 'aspect-[2/1] sm:aspect-square' : 'aspect-square'}`}
              style={{ background: g.bg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-glyph group-hover:scale-[1.06] ${
                  g.fill ? 'object-cover' : 'object-contain p-[18%]'
                }`}
              />
            </div>
            <figcaption className="label mt-3 text-mute">{g.caption}</figcaption>
          </motion.figure>
        </motion.li>
      ))}
    </ul>
  );
}

/** Entry card for the interactive walkthrough subpage */
function PanelCard({ walkthrough }: { walkthrough: NonNullable<Project['walkthrough']> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <motion.div
      ref={ref}
      className="mx-auto max-w-6xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <Link
        href={walkthrough.href}
        aria-label={`${walkthrough.title}: take the tour`}
        className="group relative block overflow-hidden rounded-tile border border-ink-3 bg-ink-2 transition-colors duration-300 hover:border-lime"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
          <motion.img
            src={walkthrough.image.src}
            alt={walkthrough.image.alt}
            loading="lazy"
            className="absolute inset-x-0 top-0 h-[115%] w-full object-cover object-left-top"
            style={reduce ? undefined : { y }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
        </div>
        <span className="label absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full bg-lime px-6 py-3.5 font-bold text-ink sm:bottom-8 sm:left-8">
          Take the tour
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function CaseStudy({ slug }: { slug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [nextHover, setNextHover] = useState(false);
  const reviews = TESTIMONIALS.filter((t) => t.projectSlug === slug);
  const reduce = useReducedMotion();

  const chapters = useMemo(() => chaptersFor(project, reviews.length > 0), [project, reviews.length]);
  const meta = (id: string) => chapters.find((c) => c.id === id)!;
  const host = hostOf(project.link);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // The title drifts down and fades as the hero scrolls away
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

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
      <ChapterRail chapters={chapters} wrapperId={CHAPTERS_ID} />

      <main className="bg-ink">
        {/* Hero: number, title and one line. Everything else waits for the chapters. */}
        <header ref={heroRef} className="dot-grid relative flex min-h-[100svh] flex-col px-5 pb-10 pt-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
            <div className="flex items-center justify-between pr-20">
              <Link href="/" className="group flex items-center gap-3">
                <CheerioLogo size={28} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
                <span className="label text-paper">Cheerio Studios</span>
              </Link>
              <Link href="/#work" className="note hidden text-mute transition-colors hover:text-lime sm:block">
                ( Back to all work )
              </Link>
            </div>

            <motion.div className="mt-auto pt-20" style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}>
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

              <motion.div
                className="mt-10 flex items-end justify-between gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              >
                <p className="label text-lime">{project.subtitle}</p>
                <span className="note hidden shrink-0 items-center gap-3 text-mute sm:flex" aria-hidden>
                  ( Scroll )
                  <motion.span
                    className="text-lime"
                    animate={reduce ? undefined : { y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <StaticGlyph shape="arrow" size={14} radius={0.5} />
                  </motion.span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </header>

        <div id={CHAPTERS_ID}>
          {/* Overview: what it was, who for, what was delivered */}
          <Chapter meta={meta('overview')} title="In short">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-24">
              <ScrollLede
                text={project.summary}
                className="font-display text-[clamp(1.6rem,3.1vw,2.9rem)] font-medium leading-[1.2] tracking-tight text-paper"
              />

              <motion.aside
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className="mb-8 aspect-[2/1] overflow-hidden rounded-tile border border-ink-3">
                  <ProjectLogo project={project} />
                </div>
                <dl>
                  {[
                    ['Client', project.client],
                    ['Role', project.role],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-ink-3 py-4">
                      <dt className="label pt-1 text-mute">{k}</dt>
                      <dd className="font-display font-bold">{v}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[6rem_1fr] gap-4 border-y border-ink-3 py-4">
                    <dt className="label pt-1 text-mute">Live</dt>
                    <dd>
                      <a
                        href={project.link}
                        data-umami-event="Visit project"
                        data-umami-event-project={project.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-display font-bold text-lime"
                      >
                        Visit project
                        <span className="transition-transform duration-300 group-hover:-rotate-45">
                          <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
                        </span>
                      </a>
                    </dd>
                  </div>
                </dl>

                <h3 className="label mb-4 mt-8 text-mute">Deliverables</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.deliverables.map((d, i) => (
                    <motion.li
                      key={d}
                      className="rounded-full border border-ink-3 px-4 py-2 text-sm text-paper/85"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.06 }}
                    >
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </motion.aside>
            </div>
          </Chapter>

          {project.stats && (
            <Chapter meta={meta('results')} title="Results at a glance">
              <dl className="grid gap-px overflow-hidden rounded-tile border border-ink-3 bg-ink-3 sm:grid-cols-2 lg:grid-cols-4">
                {project.stats.map((st, i) => (
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
                      <GlyphText text={st.value} size="clamp(2.6rem, 5vw, 4.4rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
                      <span className="sr-only">{st.value}</span>
                    </dd>
                    {st.note && <dd className="order-3 note text-mute">{st.note}</dd>}
                  </motion.div>
                ))}
              </dl>
              {project.footnote && <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">{project.footnote}</p>}
            </Chapter>
          )}

          {(project.preview || project.screens) && (
            <Chapter meta={meta('website')} title="The live site">
              <Website project={project} />
            </Chapter>
          )}

          {project.gallery && (
            <Chapter meta={meta('identity')} title="The identity">
              <Identity gallery={project.gallery} />
            </Chapter>
          )}

          {project.guide && <GuideReel guide={project.guide} meta={meta('guide')} />}

          {project.comparisons && (
            <Chapter meta={meta('compare')} title="Before and after" aside={<p>Drag across each page to compare the old store with the rebuild.</p>}>
              <Compare items={project.comparisons} host={host} note={project.comparisonNote} />
            </Chapter>
          )}

          {project.walkthrough && (
            <Chapter meta={meta('panel')} title={project.walkthrough.title} aside={<p>{project.walkthrough.blurb}</p>}>
              <PanelCard walkthrough={project.walkthrough} />
            </Chapter>
          )}

          <Chapter meta={meta('story')} title="The story">
            <Story sections={project.sections} />
          </Chapter>

          {reviews.length > 0 && (
            <Chapter meta={meta('review')} title="Kind words">
              <div className="mx-auto flex max-w-6xl flex-col gap-6">
                {reviews.map((t) => (
                  <TestimonialCard key={t.author} testimonial={t} />
                ))}
              </div>
            </Chapter>
          )}
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
