'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import SectionHeader from './SectionHeader';
import { PROJECTS } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="relative bg-ink px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader index="03" note="Selected projects" title="WORK" count="03" size="min(24vw, 15rem)" />

        <ul onPointerLeave={() => setActive(null)}>
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <motion.li
                key={p.slug}
                className="border-t border-ink-3 last:border-b"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              >
                <Link
                  href={`/pages/${p.slug}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 py-10 transition-opacity duration-300 sm:gap-x-12 md:grid-cols-[auto_1fr_auto] md:py-14"
                  style={{ opacity: dimmed ? 0.35 : 1 }}
                >
                  <GlyphText
                    text={p.num}
                    size="clamp(3rem, 8vw, 7rem)"
                    hovered={isActive}
                    decorative
                    className="text-ghost"
                  />
                  <motion.div animate={{ x: isActive ? 16 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    <span className="label mb-3 block text-lime">{p.subtitle}</span>
                    <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight">
                      {p.title}
                    </h3>
                  </motion.div>
                  <div className="col-span-2 flex flex-col gap-5 md:col-span-1 md:max-w-xs md:items-end md:text-right">
                    <p className="leading-relaxed text-mute">{p.summary}</p>
                    <span className="label flex items-center gap-3 text-paper">
                      Case study
                      <motion.span
                        className="grid h-9 w-9 place-items-center rounded-full border border-lime/40 text-lime"
                        animate={{ rotate: isActive ? -45 : 0, backgroundColor: isActive ? 'rgba(212,255,31,1)' : 'rgba(212,255,31,0)', color: isActive ? '#0c0d0a' : '#d4ff1f' }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <Glyph shapes={['arrowRight']} size={14} radius={0.5} />
                      </motion.span>
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
