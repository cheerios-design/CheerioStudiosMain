'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { buildCells, type Rows } from '@/lib/glyph/geometry';
import { ICONS, type IconName } from '@/lib/glyph/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

interface GlyphProps {
  /** One shape renders static; several shapes morph in a loop while on screen */
  shapes: (IconName | Rows)[];
  size?: number | string;
  /** Corner radius as a fraction of one cell (0–0.5) */
  radius?: number;
  /** Milliseconds between morphs; set `active` instead to control the frame yourself */
  interval?: number;
  /** Controlled frame index (e.g. swap shape on hover) — disables the auto loop */
  active?: number;
  /** Extra delay before the first build-in */
  delay?: number;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** One flat path, no animation — for glyphs repeated many times (marquees, bullets) */
export function StaticGlyph({
  shape,
  size = 24,
  radius = 0.38,
  className = '',
  style,
}: {
  shape: IconName | Rows;
  size?: number | string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const rows = typeof shape === 'string' ? ICONS[shape as IconName] : shape;
  const d = useMemo(() => {
    const cells = buildCells(rows, radius);
    return cells.map((c) => (c.filled ? c.body : c.hasFillet ? c.fillet : '')).join('');
  }, [rows, radius]);

  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      className={`block shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

export default function Glyph({
  shapes,
  size = 96,
  radius = 0.38,
  interval = 2600,
  active,
  delay = 0,
  title,
  className = '',
  style,
}: GlyphProps) {
  const ref = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();
  const hasEntered = useInView(ref, { once: true, margin: '-5% 0px' });
  const isVisible = useInView(ref);
  const [step, setStep] = useState(0);

  const key = shapes.map((s) => (typeof s === 'string' ? s : s.join('|'))).join(',');
  const frames = useMemo(
    () => shapes.map((s) => buildCells(typeof s === 'string' ? ICONS[s as IconName] : s, radius)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, radius]
  );
  const n = frames[0].length ? Math.sqrt(frames[0].length) : 7;

  const isControlled = active !== undefined;
  const canCycle = !isControlled && frames.length > 1 && isVisible && hasEntered && !reduceMotion;

  useEffect(() => {
    if (!canCycle) return;
    const id = setInterval(() => setStep((s) => s + 1), interval);
    return () => clearInterval(id);
  }, [canCycle, interval]);

  const frameIndex = isControlled ? active : step;
  const cells = frames[frameIndex % frames.length];
  const shown = hasEntered || !!reduceMotion;
  const isFirstBuild = !isControlled && step === 0;
  const mid = (n - 1) / 2;

  return (
    <svg
      ref={ref}
      viewBox={`-0.1 -0.1 ${n + 0.2} ${n + 0.2}`}
      className={`block shrink-0 ${className}`}
      style={{ width: size, height: size, overflow: 'visible', ...style }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {cells.map((cell, i) => {
        const visible = shown && cell.filled;
        const dist = Math.hypot(cell.x - mid, cell.y - mid);
        const d = reduceMotion ? 0 : (isFirstBuild ? delay : 0) + dist * (isFirstBuild ? 0.07 : 0.03);

        return (
          <React.Fragment key={i}>
            <motion.path
              initial={reduceMotion ? false : { d: cell.body, opacity: 0, scale: 0.3 }}
              animate={{ d: cell.body, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.3 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE, delay: d }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={0.06}
            />
            <motion.path
              initial={reduceMotion ? false : { d: cell.fillet, opacity: 0 }}
              animate={{ d: cell.fillet, opacity: shown && cell.hasFillet ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE, delay: reduceMotion ? 0 : d + 0.15 }}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={0.06}
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
