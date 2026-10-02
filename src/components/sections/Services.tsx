'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import SectionHeader from './SectionHeader';
import { SERVICES } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

function ServiceRow({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      className="relative overflow-hidden border-t border-ink-3 last:border-b"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Lime fill that sweeps up from the bottom */}
      <motion.div
        className="absolute inset-0 origin-bottom bg-lime"
        initial={false}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />

      <div
        className={`relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 px-1 py-7 transition-colors duration-300 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-10 sm:px-4 sm:py-9 lg:grid-cols-[9rem_1.1fr_1fr_auto] ${
          hovered ? 'text-ink' : 'text-paper'
        }`}
      >
        <GlyphText
          text={String(index + 1).padStart(2, '0')}
          size="clamp(2.2rem, 4.5vw, 3.8rem)"
          hovered={hovered}
          decorative
          hoverColor="var(--color-ink)"
          className="text-lime"
        />
        <motion.h3
          className="font-display text-[clamp(1.4rem,3vw,2.6rem)] font-bold uppercase leading-none tracking-tight"
          animate={{ x: hovered ? 12 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {service.title}
        </motion.h3>
        <p
          className={`col-span-2 max-w-md text-[0.95rem] leading-relaxed transition-colors duration-300 sm:col-span-1 sm:col-start-2 lg:col-start-3 ${
            hovered ? 'text-ink/75' : 'text-mute'
          }`}
        >
          {service.copy}
        </p>
        <div className="hidden sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:block lg:col-start-4 lg:row-span-1">
          <Glyph shapes={service.icons} active={hovered ? 1 : 0} size={56} delay={0.2} />
        </div>
      </div>
    </motion.li>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-ink px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader index="02" note="What we do" title="SERVICES" count={String(SERVICES.length).padStart(2, '0')} size="min(8.5vw, 6rem)" />
        <p className="mb-16 max-w-xl text-xl leading-relaxed text-mute sm:text-2xl">
          Seven disciplines, one studio. <span className="text-paper">Every piece is built to work with the others</span> —
          that&apos;s what turns a brand into a system.
        </p>
        <ul>
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
