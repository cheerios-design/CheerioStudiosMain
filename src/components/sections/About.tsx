'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Glyph from '../glyph/Glyph';
import GlyphText from '../glyph/GlyphText';
import PixelBand from './PixelBand';
import type { IconName } from '@/lib/glyph/icons';

const EASE = [0.22, 1, 0.36, 1] as const;

const MANIFESTO =
  "We don't just design. We build *systems* that make your brand *inevitable.* Most businesses confuse having a website with having a *presence.* The gap between those two things is where we work.";

const VALUES: { title: string; copy: string; icons: [IconName, IconName] }[] = [
  { title: 'Intentional', copy: 'Every decision has a reason you can point to. Nothing is there just to fill space.', icons: ['target', 'sparkle'] },
  { title: 'Systems first', copy: 'We build repeatable systems, not one-off pieces — so the brand compounds over time.', icons: ['grid', 'plus'] },
  { title: 'Bold, but flexible', copy: 'Strong ideas that still bend to fit the platform, the audience and the moment.', icons: ['bolt', 'x'] },
  { title: 'In it for the long run', copy: 'Partnerships, not transactions. We stay on after launch day.', icons: ['heart', 'smiley'] },
];

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const accent = word.startsWith('*');
  const text = word.replace(/\*/g, '');

  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${accent ? 'text-lime' : ''}`}>
      {accent ? <span className="font-serif font-normal italic">{text}</span> : text}
    </motion.span>
  );
}

function ValueTile({ value, index }: { value: (typeof VALUES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="group relative flex flex-col gap-10 rounded-tile border border-ink-3 bg-ink-2 p-7 transition-colors duration-300 hover:border-lime/60"
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-16 w-16 place-items-center rounded-chip bg-lime text-ink">
          <Glyph shapes={value.icons} active={hovered ? 1 : 0} size={34} delay={0.2 + index * 0.1} />
        </span>
        <span className="label text-mute">0{index + 1}</span>
      </div>
      <div>
        <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight">{value.title}</h3>
        <p className="leading-relaxed text-mute">{value.copy}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const glyphRotate = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const words = MANIFESTO.split(' ');

  return (
    <section id="about" className="relative bg-ink">
      {/* Sticky manifesto — words light up as you scroll */}
      <div ref={ref} className="relative h-[240vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center px-5 sm:px-8">
          {/* Only the oversized background glyph is clipped — never the text */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-[10vw] top-1/2 -translate-y-1/2 text-ink-3"
              style={{ rotate: glyphRotate }}
            >
              <Glyph shapes={['flower', 'sparkle', 'diamond']} size="min(70vw, 80svh)" interval={4000} />
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-[1440px]">
            {/* Same pattern as SectionHeader, compact so the manifesto fits the pinned screen */}
            <span className="label mb-4 block text-lime">( 04 ) — Who we are</span>
            <GlyphText as="h2" text="ABOUT" size="clamp(2rem, 4vw, 3.4rem)" interactive className="mb-10 text-paper" />
            <p className="max-w-[20ch] font-display text-[clamp(1.7rem,min(5.4vw,6.2svh),5.5rem)] font-bold uppercase leading-[1.02] tracking-tight sm:max-w-[26ch]">
              {words.map((w, i) => {
                const start = (i / words.length) * 0.85;
                return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 0.12]} />;
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8">
        <div className="mb-12 grid gap-6 sm:grid-cols-2 sm:items-end">
          <p className="note text-[clamp(1.4rem,2.4vw,2rem)] text-paper">
            We work at the intersection of design and technology — one studio, one vision, every pixel intentional.
          </p>
          <p className="leading-relaxed text-mute sm:justify-self-end sm:max-w-sm">
            If your digital presence doesn&apos;t have a documented architecture with defensible goals, you&apos;re
            not executing a strategy — you&apos;re decorating. We build the systems. The brand compounds.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <ValueTile key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>

      <PixelBand />
    </section>
  );
}
