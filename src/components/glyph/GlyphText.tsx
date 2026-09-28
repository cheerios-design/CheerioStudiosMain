'use client';

import React, { useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { buildCells, hash, type Cell } from '@/lib/glyph/geometry';
import { ASCENT, CAP, glyphFor } from '@/lib/glyph/font';

const EASE = [0.22, 1, 0.36, 1] as const;
const SPREAD = 0.7; // seconds the build-in sweeps across a line
const SEAM = 0.07; // stroke that overlaps neighbouring cells so no hairline gaps show

type Piece = Cell & { kind: 'body' | 'fillet'; delay: number; hoverDelay: number };
type Ctx = { p: Piece; reduce: boolean };

// Cells build in once; after that they stay fused (hover never breaks the letters apart)
const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  shown: ({ p, reduce }: Ctx) =>
    p.kind === 'body'
      ? { opacity: 1, scale: 1, transition: reduce ? { duration: 0 } : { duration: 0.55, ease: EASE, delay: p.delay } }
      : { opacity: 1, transition: reduce ? { duration: 0 } : { duration: 0.3, delay: p.delay + 0.2 } },
  hover: { opacity: 1, scale: 1 },
};

// Hover: each whole letter lifts in a left-to-right wave
const letterVariants: Variants = {
  hidden: { y: 0 },
  shown: ({ i, reduce }: { i: number; reduce: boolean }) => ({
    y: 0,
    transition: reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 20, delay: i * 0.03 },
  }),
  hover: ({ i, reduce }: { i: number; reduce: boolean }) => ({
    y: reduce ? 0 : -0.45,
    transition: { type: 'spring', stiffness: 380, damping: 14, delay: i * 0.035 },
  }),
};

function layout(text: string, radius: number, align: 'left' | 'center' | 'right', tracking: number, leading: number) {
  const lines = text.toUpperCase().split('\n').map((line) => {
    const glyphs = [...line].map(glyphFor);
    const width = glyphs.reduce((w, g) => w + g[0].length, 0) + Math.max(0, glyphs.length - 1) * tracking;
    const tall = glyphs.some((g) => g.length > CAP);
    return { glyphs, width, tall };
  });

  const width = Math.max(...lines.map((l) => l.width));
  const letters: Piece[][] = [];
  let y = 0;

  lines.forEach((line, li) => {
    const capTop = y + (line.tall ? ASCENT : 0);
    let x = align === 'left' ? 0 : align === 'center' ? (width - line.width) / 2 : width - line.width;

    for (const g of line.glyphs) {
      const pieces: Piece[] = [];
      for (const c of buildCells(g, radius, x, capTop - (g.length - CAP))) {
        if (!c.filled && !c.hasFillet) continue;
        pieces.push({
          ...c,
          kind: c.filled ? 'body' : 'fillet',
          delay: (c.x / width) * SPREAD + hash(c.x, c.y) * 0.25 + li * 0.12,
          hoverDelay: (c.x / width) * 0.3 + hash(c.y, c.x) * 0.06,
        });
      }
      if (pieces.length) letters.push(pieces);
      x += g[0].length + tracking;
    }
    y = capTop + CAP + leading;
  });

  return { letters, width, height: y - leading };
}

interface GlyphTextProps {
  text: string;
  as?: React.ElementType;
  /** Cap height (CSS length) when fit="height" */
  size?: string;
  /** "height": size by cap height; "width": stretch to the container's width */
  fit?: 'height' | 'width';
  align?: 'left' | 'center' | 'right';
  /** Colour sweep + letter wave when hovered */
  interactive?: boolean;
  /** Colour the letters sweep to on hover ("currentColor" = wave only) */
  hoverColor?: string;
  /** Controlled hover state (e.g. when the whole row is hovered) */
  hovered?: boolean;
  delay?: number;
  radius?: number;
  tracking?: number;
  leading?: number;
  /** Skip the screen-reader copy (when a parent already provides the text) */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlyphText({
  text,
  as: Tag = 'span',
  size = '4rem',
  fit = 'height',
  align = 'left',
  interactive = false,
  hoverColor = 'var(--color-lime)',
  hovered,
  delay = 0,
  radius = 0.5,
  tracking = 1,
  leading = 2,
  decorative = false,
  className = '',
  style,
}: GlyphTextProps) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const [selfHover, setSelfHover] = useState(false);

  const { letters, width, height } = useMemo(
    () => layout(text, radius, align, tracking, leading),
    [text, radius, align, tracking, leading]
  );

  const isHovered = hovered ?? (interactive && selfHover);
  const state = !inView && !reduce ? 'hidden' : isHovered ? 'hover' : 'shown';
  // `size` is the cap height of ONE line, so multi-line text scales per line, not per block
  const capsWide = (width + 0.1) / CAP;

  return (
    // The hover colour lives on the plain wrapper: CSS variables on motion.svg don't reach the DOM
    <Tag className={`block min-w-0 ${className}`} style={{ ...style, ['--glyph-hover' as string]: hoverColor }}>
      {!decorative && <span className="sr-only">{text}</span>}
      <motion.svg
        ref={ref}
        viewBox={`-0.05 -0.05 ${width + 0.1} ${height + 0.1}`}
        aria-hidden="true"
        className="glyph-text"
        data-hover={isHovered || undefined}
        initial={reduce ? false : 'hidden'}
        animate={state}
        onHoverStart={interactive ? () => setSelfHover(true) : undefined}
        onHoverEnd={interactive ? () => setSelfHover(false) : undefined}
        style={{
          display: 'block',
          overflow: 'visible',
          aspectRatio: `${width + 0.1} / ${height + 0.1}`,
          height: 'auto',
          width: fit === 'width' ? '100%' : `calc(${size} * ${capsWide.toFixed(4)})`,
          maxWidth: '100%',
          marginLeft: align === 'left' ? undefined : 'auto',
          marginRight: align === 'center' ? 'auto' : undefined,
        }}
      >
        {letters.map((pieces, li) => (
          <motion.g key={li} custom={{ i: li, reduce }} variants={letterVariants}>
            {pieces.map((p, i) => (
              <motion.path
                key={i}
                className="glyph-cell"
                custom={{ p: { ...p, delay: p.delay + delay }, reduce }}
                variants={cellVariants}
                d={p.kind === 'body' ? p.body : p.fillet}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={SEAM}
                style={{
                  transitionDelay: `${p.hoverDelay}s`,
                  ...(p.kind === 'body' ? { transformBox: 'fill-box', transformOrigin: 'center' } : {}),
                }}
              />
            ))}
          </motion.g>
        ))}
      </motion.svg>
    </Tag>
  );
}
