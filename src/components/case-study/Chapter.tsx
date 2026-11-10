'use client';

import { motion, type Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Where a chapter sits in the page: every case study numbers its chapters the same way */
export type ChapterMeta = { id: string; label: string; num: string; total: string };

export const chapterDomId = (id: string) => `ch-${id}`;

const reveal: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { y: '110%' },
  shown: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** The same opening for every chapter: a rule, "( 03 ) — Label", a big title and an optional aside */
export function ChapterHeader({
  meta,
  title,
  children,
  compact = false,
}: {
  meta: ChapterMeta;
  title: string;
  /** Short intro or action, set to the right of the title */
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <motion.div
      className={compact ? 'mb-8' : 'mb-12 sm:mb-16'}
      variants={reveal}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <div className="flex items-center justify-between gap-4 border-t border-ink-3 pt-6">
        <span className="label text-lime">
          ( {meta.num} ) — {meta.label}
        </span>
        <span className="note tabular-nums text-mute">
          ( {meta.num} / {meta.total} )
        </span>
      </div>
      <div className={`grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16 ${compact ? 'mt-6' : 'mt-10 sm:mt-14'}`}>
        <h2
          id={`${chapterDomId(meta.id)}-h`}
          className={`overflow-hidden pb-1 font-display font-bold uppercase leading-[0.95] tracking-tight text-balance ${
            compact ? 'text-[clamp(1.8rem,3.4vw,3rem)]' : 'text-[clamp(2.2rem,5vw,4.5rem)]'
          }`}
        >
          <motion.span className="block" variants={rise}>
            {title}
          </motion.span>
        </h2>
        {children && (
          <motion.div className="max-w-md text-lg leading-relaxed text-paper/75 lg:justify-self-end" variants={fade}>
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/** A full chapter: consistent spacing, width and header */
export default function Chapter({
  meta,
  title,
  aside,
  children,
}: {
  meta: ChapterMeta;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={chapterDomId(meta.id)} aria-labelledby={`${chapterDomId(meta.id)}-h`} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader meta={meta} title={title}>
          {aside}
        </ChapterHeader>
        {children}
      </div>
    </section>
  );
}
