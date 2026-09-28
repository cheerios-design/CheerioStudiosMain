'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { StaticGlyph } from '../glyph/Glyph';

// Classic arrow pointer drawn on the glyph grid — the tip is the top-left cell
const POINTER = [
  '#.......',
  '##......',
  '###.....',
  '####....',
  '#####...',
  '######..',
  '#######.',
  '########',
  '####....',
  '##.##...',
  '#..##...',
  '....##..',
];

const CELL = 2.4; // px per grid cell

const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

// Replaces the native pointer 1:1 — no easing, no hover states (links have their own)
export default function GlyphCursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-glyph-cursor');
    const el = ref.current!;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      // Form fields keep the native text cursor
      const overField = (e.target as Element).closest?.('input, textarea, select');
      el.style.opacity = overField ? '0' : '1';
    };
    const leave = () => (el.style.opacity = '0');

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      document.documentElement.classList.remove('has-glyph-cursor');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] text-lime opacity-0"
      style={{ mixBlendMode: 'difference', willChange: 'transform' }}
    >
      <StaticGlyph
        shape={POINTER}
        radius={0.45}
        style={{ width: POINTER[0].length * CELL, height: POINTER.length * CELL }}
      />
    </div>
  );
}
