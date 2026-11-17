'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import Glyph from './glyph/Glyph';
import CheerioLogo from './CheerioLogo';
import Magnetic from './chrome/Magnetic';
import { ICONS, type IconName } from '@/lib/glyph/icons';
import { LIME, track } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const N = 7;
// Cap height of the "4"s; the tile between them is one cap tall, like the reel in the index
const CAP = 'min(24vw, 34svh)';

/** The "0" of 404, drawn on the same 7×7 grid as every glyph icon */
const ZERO = ['.#####.', '##...##', '##...##', '##...##', '##...##', '##...##', '.#####.'];
const SHUFFLE: IconName[] = ['smiley', 'heart', 'sparkle', 'flower', 'bolt', 'eye', 'x', 'diamond', 'target'];

const toggle = (rows: string[], r: number, c: number, on: boolean) =>
  rows.map((row, y) => (y === r ? row.slice(0, c) + (on ? '#' : '.') + row.slice(c + 1) : row));

// 404: the zero is a tile you can draw on
export default function NotFound() {
  const [rows, setRows] = useState<string[]>(ZERO);
  const [homeHover, setHomeHover] = useState(false);
  const [drawn, setDrawn] = useState(false);
  /** While a pointer is held down: the value being painted (on or off) */
  const [painting, setPainting] = useState<boolean | null>(null);
  const shuffleAt = useRef(0);

  useEffect(() => {
    const stop = () => setPainting(null);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, []);

  const paint = (r: number, c: number, on: boolean) => {
    setRows((prev) => toggle(prev, r, c, on));
    if (!drawn) {
      setDrawn(true);
      track('404 glyph drawn');
    }
  };

  const startPaint = (e: React.PointerEvent<HTMLButtonElement>, r: number, c: number, on: boolean) => {
    // Let the pointer move on to the next cell while held down
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setPainting(!on);
    paint(r, c, !on);
  };

  const dragPaint = (r: number, c: number, on: boolean) => {
    if (painting !== null && painting !== on) paint(r, c, painting);
  };

  const shuffle = () => {
    const name = SHUFFLE[shuffleAt.current++ % SHUFFLE.length];
    setRows([...ICONS[name]]);
  };

  const isZero = rows.join() === ZERO.join();

  return (
    <main className="dot-grid relative flex min-h-svh flex-col bg-ink px-5 pb-8 pt-6 text-paper sm:px-8">
      <header className="flex items-center justify-between pr-20">
        <Link href="/" className="group flex items-center gap-3" aria-label="Cheerio Studios — home">
          <CheerioLogo size={28} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
          <span className="label text-paper">Cheerio Studios</span>
        </Link>
        <span className="note hidden text-mute sm:block">( Page not found )</span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <h1 className="sr-only">404 — page not found</h1>

        {/* 4 [ tile ] 4 */}
        <div className="flex max-w-full items-center justify-center" style={{ gap: `calc(${CAP} * 0.16)` }}>
          <GlyphText text="4" size={CAP} decorative interactive className="shrink-0" />

          <motion.div
            className="relative shrink-0 bg-lime text-ink"
            style={{ height: CAP, width: CAP, borderRadius: `calc(${CAP} * 0.18)`, padding: `calc(${CAP} * 0.13)` }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.5 }}
          >
            <div className="relative h-full w-full">
              <Glyph shapes={[rows]} active={0} size="100%" delay={0.7} />
              {/* One button per cell, laid over the glyph. Click or drag to draw. */}
              <div
                role="group"
                aria-label="Draw your own glyph: a 7 by 7 grid of squares"
                className="absolute inset-0 grid touch-none select-none"
                style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, gridTemplateRows: `repeat(${N}, 1fr)` }}
              >
                {rows.flatMap((row, r) =>
                  [...row].map((cell, c) => {
                    const on = cell === '#';
                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        aria-pressed={on}
                        aria-label={`Row ${r + 1}, column ${c + 1}`}
                        className="rounded-[20%] transition-colors duration-150 hover:bg-ink/15 focus-visible:outline-ink"
                        onPointerDown={(e) => startPaint(e, r, c, on)}
                        onPointerEnter={() => dragPaint(r, c, on)}
                        onKeyDown={(e) => {
                          if (e.key !== 'Enter' && e.key !== ' ') return;
                          e.preventDefault();
                          paint(r, c, !on);
                        }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>

          <GlyphText text="4" size={CAP} decorative interactive delay={0.15} className="shrink-0" />
        </div>

        <motion.div
          className="mt-12 flex max-w-xl flex-col items-center gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        >
          <div>
            <p className="mb-4 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-paper">
              This page said <span className="text-lime">cheerio.</span>
            </p>
            <p className="text-lg leading-relaxed text-mute">
              The link is broken or the page has moved.{' '}
              <span className="text-paper">While you&apos;re here, the zero is yours:</span> click or drag across its squares
              to draw your own glyph.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Link
                href="/"
                data-umami-event="404 home"
                onPointerEnter={() => setHomeHover(true)}
                onPointerLeave={() => setHomeHover(false)}
                className="group flex items-center gap-4 rounded-full bg-lime py-3 pl-7 pr-3 text-ink"
              >
                <span className="label text-[0.8rem] font-bold">Back to the studio</span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime">
                  <Glyph shapes={['arrowRight', 'smiley']} active={homeHover ? 1 : 0} size={18} radius={0.5} />
                </span>
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={shuffle}
              className="label rounded-full border border-lime/40 px-6 py-[1.35rem] font-bold text-lime transition-colors duration-300 hover:bg-lime hover:text-ink"
            >
              Shuffle
            </button>
            {!isZero && (
              <button
                type="button"
                onClick={() => setRows(ZERO)}
                className="label rounded-full border border-ink-3 px-6 py-[1.35rem] font-bold text-mute transition-colors duration-300 hover:border-paper hover:text-paper"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <span className="label text-mute">( 404 )</span>
        <nav aria-label="Other places to go" className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            ['Services', '/#services'],
            ['Work', '/#work'],
            ['Launch Sprint', '/sprint'],
            ['Contact', '/#contact'],
          ].map(([name, href]) => (
            <Link key={href} href={href} className="label text-paper transition-colors hover:text-lime">
              ( {name} )
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}
