'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlyphText from './glyph/GlyphText';
import Glyph from './glyph/Glyph';
import { useScrollTo } from './SmoothScroll';

type Item =
  | { word: string; note: string; href: string; side: 'left' | 'right' }
  | { reel: true; note: string; side: 'left' | 'right' };

const ITEMS: Item[] = [
  { word: 'STUDIO', note: 'Home', href: '/#hero', side: 'left' },
  { word: 'SERVICES', note: 'What we do', href: '/#services', side: 'right' },
  { word: 'WORK', note: 'Selected projects', href: '/#work', side: 'left' },
  { reel: true, note: 'Always in motion', side: 'right' },
  { word: 'ABOUT', note: 'Who we are', href: '/#about', side: 'left' },
  { word: 'CONTACT', note: 'Get in touch', href: '/#contact', side: 'right' },
];

// Cap height of each index word — fits six rows in one viewport on any screen
const CAP = 'min(8.2svh, 8.6vw)';
const NOTE_WIDTH = 'clamp(5.5rem, 11vw, 9rem)';

interface IndexNavProps {
  /** Called before navigating (e.g. to close the menu overlay) */
  onNavigate?: () => void;
  delay?: number;
}

export default function IndexNav({ onNavigate, delay = 0 }: IndexNavProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollTo = useScrollTo();

  return (
    <nav aria-label="Index" className="flex w-full flex-col items-center" style={{ gap: `calc(${CAP} * 0.32)` }}>
      {ITEMS.map((item, i) => {
        const isHovered = hovered === i;
        const isDimmed = hovered !== null && !isHovered;
        const note = (
          <motion.span
            className={`note hidden shrink-0 pt-1 md:block ${item.side === 'left' ? 'text-right' : 'text-left'}`}
            style={{ width: NOTE_WIDTH, color: isHovered ? 'var(--color-lime)' : 'var(--color-mute)' }}
            initial={{ opacity: 0, x: item.side === 'left' ? -16 : 16 }}
            animate={{ opacity: 1, x: isHovered ? (item.side === 'left' ? -8 : 8) : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: hovered === null ? delay + 0.4 + i * 0.1 : 0 }}
          >
            {item.note}
          </motion.span>
        );
        const spacer = <span className="hidden shrink-0 md:block" style={{ width: NOTE_WIDTH }} />;

        const content =
          'reel' in item ? (
            <span className="flex items-center" style={{ gap: `calc(${CAP} * 0.18)` }}>
              <GlyphText text="*(" size={CAP} decorative delay={delay + i * 0.12} className="shrink-0" />
              <motion.span
                className="grid shrink-0 place-items-center bg-lime text-ink"
                style={{ height: CAP, width: `calc(${CAP} * 1.25)`, borderRadius: `calc(${CAP} * 0.22)` }}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, delay: delay + 0.5 + i * 0.12 }}
              >
                <Glyph shapes={['smiley', 'sparkle', 'heart', 'flower', 'x']} size="62%" interval={1600} />
              </motion.span>
              <GlyphText text=")" size={CAP} decorative delay={delay + i * 0.12} className="shrink-0" />
            </span>
          ) : (
            <GlyphText
              text={item.word}
              size={CAP}
              decorative
              hovered={isHovered}
              delay={delay + i * 0.12}
            />
          );

        return (
          <motion.div
            key={i}
            className="flex max-w-full items-start justify-center gap-3 md:gap-6"
            animate={{ opacity: isDimmed ? 0.28 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {item.side === 'left' ? note : spacer}
            {'reel' in item ? (
              <div className="text-paper" aria-hidden="true">
                {content}
              </div>
            ) : (
              <a
                href={item.href}
                aria-label={`${item.word.toLowerCase()} — ${item.note}`}
                className="block min-w-0 text-paper"
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.();
                  scrollTo(item.href);
                }}
              >
                {content}
              </a>
            )}
            {item.side === 'right' ? note : spacer}
          </motion.div>
        );
      })}
    </nav>
  );
}
