'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ChapterHeader, chapterDomId, type ChapterMeta } from './Chapter';
import type { Project } from '@/lib/site';

type Guide = NonNullable<Project['guide']>;

/** Roomy screens that allow motion get the pinned reel; everything else gets a swipeable row */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)';

/**
 * Brand guide sheets on a horizontal reel. On large screens the chapter pins to the
 * viewport and vertical scrolling slides the sheets sideways.
 */
export default function GuideReel({ guide, meta }: { guide: Guide; meta: ChapterMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const travel = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform([scrollYProgress, travel], ([p, d]: number[]) => -p * d);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // How far the track has to travel for its last card to reach the right edge
  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      setDistance(d);
      travel.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned, travel]);

  // Lines the reel up with the page's 1440px column, however wide the screen is
  const gutter = '[--gutter:1.25rem] sm:[--gutter:2rem]';
  const gutterStyle = { paddingInline: 'max(var(--gutter), calc((100vw - 1440px) / 2))' };

  const header = (
    <div className="px-5 sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader meta={meta} title="The brand guide" compact={pinned}>
          <p>The full identity, documented sheet by sheet: construction, colour, type, components and applications.</p>
          <p className="label mt-4 text-mute">Showing {guide.sheets.length} of 10 sheets</p>
        </ChapterHeader>
      </div>
    </div>
  );

  const cards = (
    <>
      {guide.sheets.map((sheet) => (
        <li key={sheet.src} className={pinned ? 'shrink-0' : 'w-[84vw] shrink-0 snap-center sm:w-[62vw]'}>
          <figure>
            <a href={guide.href} target="_blank" rel="noopener" className="group block overflow-hidden rounded-tile border border-ink-3 transition-colors duration-300 hover:border-lime">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sheet.src}
                alt={sheet.alt}
                width={sheet.width}
                height={sheet.height}
                loading="lazy"
                draggable={false}
                className={`block transition-transform duration-700 ease-glyph group-hover:scale-[1.03] ${
                  pinned ? 'h-[min(48vh,34rem)] w-auto max-w-none' : 'h-auto w-full'
                }`}
              />
            </a>
            <figcaption className="label mt-3 text-mute">{sheet.caption}</figcaption>
          </figure>
        </li>
      ))}
      <li className={pinned ? 'shrink-0' : 'w-[84vw] shrink-0 snap-center sm:w-[62vw]'}>
        <a
          href={guide.href}
          target="_blank"
          rel="noopener"
          className={`group flex flex-col justify-between gap-10 rounded-tile bg-lime p-8 text-ink sm:p-10 ${
            pinned ? 'h-[min(48vh,34rem)] w-[min(48vh,34rem)]' : 'aspect-[14/11] w-full'
          }`}
        >
          <span className="label font-bold">All 10 sheets</span>
          <span>
            <span className="block font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-bold uppercase leading-[0.95] tracking-tight">
              View the full brand guide
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </span>
            <span className="mt-4 block text-sm leading-relaxed text-ink/70">A large file. It reads best on a desktop screen.</span>
          </span>
        </a>
      </li>
    </>
  );

  if (!pinned) {
    return (
      <section ref={sectionRef} id={chapterDomId(meta.id)} aria-labelledby={`${chapterDomId(meta.id)}-h`} className="py-20 sm:py-28">
        {header}
        <ul ref={trackRef} style={gutterStyle} className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 ${gutter}`}>
          {cards}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={chapterDomId(meta.id)}
      aria-labelledby={`${chapterDomId(meta.id)}-h`}
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-8">
        {header}
        <motion.ul ref={trackRef} style={{ x, ...gutterStyle }} className={`flex w-max gap-6 ${gutter}`}>
          {cards}
        </motion.ul>
        <div className="mt-8 px-5 sm:px-8">
          <div className="mx-auto flex max-w-[1440px] items-center gap-5">
            <span className="label shrink-0 text-mute">Keep scrolling</span>
            <span className="relative h-px flex-1 bg-ink-3" aria-hidden>
              <motion.span className="absolute inset-0 origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
