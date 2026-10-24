'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import { StaticGlyph } from './glyph/Glyph';
import { CHAPTERS, SCREENS, type Beat } from '@/lib/sdmt-panel';

const EASE = [0.22, 1, 0.36, 1] as const;
const VW = 1440;
const VH = 900;
const HOST = 'baibusdmt.vercel.app/';

type FlatBeat = Beat & { chapter: number; index: number; key: string };

/** Where the frame scrolls to, in page px, so the spot sits in view. */
function offsetFor(beat: Beat): number {
  const height = SCREENS[beat.screen].height;
  const max = Math.max(0, height - VH);
  if (beat.focus !== undefined) return Math.min(beat.focus, max);
  if (!beat.spot) return 0;
  return Math.min(max, Math.max(0, beat.spot.y + beat.spot.h / 2 - VH / 2));
}

function spotStyle(beat: Beat) {
  if (!beat.spot) return null;
  const o = offsetFor(beat);
  const pad = 10;
  return {
    left: `${((beat.spot.x - pad) / VW) * 100}%`,
    top: `${((beat.spot.y - o - pad) / VH) * 100}%`,
    width: `${((beat.spot.w + pad * 2) / VW) * 100}%`,
    height: `${((beat.spot.h + pad * 2) / VH) * 100}%`,
  };
}

/** The browser frame. `active` beat decides screen, scroll position and ring. */
function Frame({ beat, eager = false }: { beat: FlatBeat; eager?: boolean }) {
  const reduce = useReducedMotion();
  const screen = SCREENS[beat.screen];
  const spot = spotStyle(beat);
  const ringTop = beat.spot ? (beat.spot.y - offsetFor(beat)) / VH : 0;
  const t = reduce ? { duration: 0 } : { duration: 0.8, ease: EASE };

  return (
    <div className="overflow-hidden rounded-tile border border-ink-3 bg-ink-2 shadow-[0_40px_120px_-40px_rgba(212,255,31,0.18)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-4 border-b border-ink-3 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink-3" />
          ))}
        </span>
        <span className="note min-w-0 flex-1 truncate text-mute">
          {HOST}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={screen.url}
              className="text-paper"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {screen.url}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="label hidden text-mute sm:inline">Demo data</span>
      </div>

      {/* 1440 × 900 window onto the page */}
      <div className="relative aspect-[1440/900] overflow-hidden bg-[#e2eaf7]">
        <AnimatePresence initial={false}>
          <motion.div
            key={beat.screen}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          >
            <motion.img
              src={screen.src}
              alt={screen.alt}
              width={1600}
              height={Math.round((screen.height / VW) * 1600)}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="block h-auto w-full select-none"
              animate={{ y: `${-(offsetFor(beat) / screen.height) * 100}%` }}
              initial={false}
              transition={t}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dim everything but the spot */}
        <AnimatePresence>
          {spot && (
            <motion.div
              key="ring"
              aria-hidden
              className="pointer-events-none absolute rounded-[14px] ring-[3px] ring-lime"
              style={{ boxShadow: '0 0 0 9999px rgba(12,13,10,0.42)' }}
              initial={reduce ? false : { opacity: 0, ...spot }}
              animate={{ opacity: 1, ...spot }}
              exit={{ opacity: 0 }}
              transition={t}
            >
              <motion.span
                className={`label absolute ${beat.spot && beat.spot.x + beat.spot.w / 2 > VW / 2 ? 'right-0' : 'left-0'} whitespace-nowrap rounded-full bg-lime px-3 py-1.5 font-bold text-ink ${
                  ringTop > 0.14 ? '-top-10' : '-bottom-10'
                }`}
                key={beat.label}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.35 }}
              >
                {beat.label}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PanelStory() {
  const beats = useMemo<FlatBeat[]>(
    () => CHAPTERS.flatMap((c, ci) => c.beats.map((b, bi) => ({ ...b, chapter: ci, index: bi, key: `${ci}-${bi}` }))),
    [],
  );
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // The beat crossing the middle of the viewport drives the sticky frame.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.beat));
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = beats[active];
  const chapter = CHAPTERS[current.chapter];

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-16 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
      {/* Story column */}
      <ol className="flex flex-col">
        {CHAPTERS.map((c, ci) => (
          <li key={c.num} className="border-t border-ink-3 pt-16 first:border-t-0 first:pt-0 lg:pt-24">
            <div className="mb-10 flex items-center gap-5">
              <GlyphText text={c.num} size="clamp(2.4rem, 4vw, 3.4rem)" className="text-lime" hoverColor="var(--color-paper)" decorative interactive />
              <div>
                <p className="label mb-1 text-mute">{c.kicker}</p>
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold uppercase leading-none tracking-tight">{c.title}</h2>
              </div>
            </div>
            <ol className="flex flex-col">
              {c.beats.map((b, bi) => {
                const flat = beats.find((x) => x.chapter === ci && x.index === bi)!;
                const i = beats.indexOf(flat);
                const on = i === active;
                return (
                  <li
                    key={flat.key}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    data-beat={i}
                    className="flex flex-col justify-center gap-6 pb-16 lg:min-h-[78vh] lg:pb-0"
                  >
                    {/* Small screens: each beat carries its own frame */}
                    <div className="lg:hidden">
                      <Frame beat={flat} />
                    </div>
                    <div className={`transition-opacity duration-500 lg:max-w-md ${on ? 'lg:opacity-100' : 'lg:opacity-35'}`}>
                      <p className="label mb-3 flex items-center gap-2 text-lime">
                        <StaticGlyph shape="sparkle" size={12} />
                        {b.label}
                      </p>
                      <p className="text-lg leading-[1.75] text-paper/80">{b.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>

      {/* Sticky stage (large screens) */}
      <div className="hidden lg:block">
        <div className="sticky top-[max(6rem,calc(50vh-24rem))] pb-24">
          <div className="mb-5 flex items-end justify-between gap-6">
            <p className="label text-mute">
              <span className="text-lime">{chapter.num}</span> / 0{CHAPTERS.length} · {chapter.title}
            </p>
            <div className="flex gap-1.5" aria-hidden>
              {beats.map((b, i) => (
                <span
                  key={b.key}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? 'w-6 bg-lime' : b.chapter === current.chapter ? 'w-1.5 bg-paper/50' : 'w-1.5 bg-ink-3'
                  }`}
                />
              ))}
            </div>
          </div>
          <Frame beat={current} eager />
          <p className="note mt-4 text-mute">The real panel, in Turkish, with fictional demo data.</p>
        </div>
      </div>
    </div>
  );
}
