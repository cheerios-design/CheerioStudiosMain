'use client';

import { motion } from 'framer-motion';
import { StaticGlyph } from './glyph/Glyph';
import type { Testimonial } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <motion.figure
      className="relative rounded-tile border border-ink-3 bg-ink-2 p-8 sm:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="mb-8 flex items-center gap-1.5 text-lime" role="img" aria-label={`Rated ${t.rating} out of 5`}>
        {Array.from({ length: t.rating }, (_, i) => (
          <StaticGlyph key={i} shape="sparkle" size={20} />
        ))}
      </div>
      <blockquote className="note max-w-4xl text-[clamp(1.5rem,2.8vw,2.4rem)] leading-snug text-paper">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-10 flex flex-col gap-1">
        <span className="font-display text-lg font-bold">{t.author}</span>
        <span className="label text-mute">
          {t.context} · {t.source}
        </span>
      </figcaption>
    </motion.figure>
  );
}
