'use client';

import { motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';

const EASE = [0.22, 1, 0.36, 1] as const;

interface SectionHeaderProps {
  index: string;
  title: string;
  note: string;
  count?: string;
  size?: string;
  tone?: 'dark' | 'lime';
}

// "( 02 ) — What we do" + a big glyph-type title
export default function SectionHeader({ index, title, note, count, size = 'min(15vw, 10rem)', tone = 'dark' }: SectionHeaderProps) {
  const accent = tone === 'dark' ? 'text-lime' : 'text-ink';
  const muted = tone === 'dark' ? 'text-mute' : 'text-ink/60';

  return (
    <div className="mb-14 sm:mb-20">
      <motion.div
        className="mb-6 flex items-center justify-between gap-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={`label ${accent}`}>( {index} ) — {note}</span>
        {count && <span className={`note ${muted}`}>( {count} )</span>}
      </motion.div>
      <GlyphText
        as="h2"
        text={title}
        size={size}
        interactive
        hoverColor={tone === 'dark' ? 'var(--color-lime)' : 'currentColor'}
        className={tone === 'dark' ? 'text-paper' : 'text-ink'}
      />
    </div>
  );
}
