'use client';

import { useMemo, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { buildCells, hash } from '@/lib/glyph/geometry';

const COLS = 36;
const ROWS = 6;

// Stepped skyline of cells (like the poster edges in the references). Columns rise in as you scroll past.
export default function PixelBand({ flip = false, className = 'text-lime' }: { flip?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 60%'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setRevealed(Math.round(v * COLS * 1.1)));

  const cells = useMemo(() => {
    // A deterministic random walk gives the staircase silhouette
    let h = 2;
    const heights = Array.from({ length: COLS }, (_, c) => {
      h = Math.min(ROWS, Math.max(1, h + Math.round(hash(c, 3) * 2 - 1)));
      return h;
    });
    const rows = Array.from({ length: ROWS }, (_, r) =>
      heights.map((hh) => (ROWS - r <= hh ? '#' : '.')).join('')
    );
    return buildCells(flip ? [...rows].reverse() : rows, 0.3).filter((c) => c.filled || c.hasFillet);
  }, [flip]);

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${COLS} ${ROWS}`} className="block h-auto w-full">
        {cells.map((c, i) => {
          const on = c.x < revealed;
          return (
            <path
              key={i}
              d={c.filled ? c.body : c.fillet}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={0.03}
              style={{
                transformBox: 'fill-box',
                transformOrigin: flip ? 'top' : 'bottom',
                transform: on ? 'scale(1)' : 'scale(1, 0)',
                opacity: on ? 1 : 0,
                transition: `transform 0.6s var(--ease-glyph) ${(c.y / ROWS) * 0.12}s, opacity 0.4s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
