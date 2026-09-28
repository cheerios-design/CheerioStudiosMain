'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import Magnetic from '../chrome/Magnetic';
import { useScrollTo } from '../SmoothScroll';

const EASE = [0.22, 1, 0.36, 1] as const;
const CAP = 'min(13svh, 9.4vw)';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const [ctaHover, setCtaHover] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x1 = useTransform(p, [0, 1], ['0%', '-18%']);
  const x2 = useTransform(p, [0, 1], ['0%', '12%']);
  const x3 = useTransform(p, [0, 1], ['0%', '-8%']);
  const rotate = useTransform(p, [0, 1], [0, 90]);
  const scale = useTransform(p, [0, 1], [1, 0.6]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden bg-ink px-5 pb-8 pt-24 sm:px-8">
      <div className="flex items-start justify-between gap-6">
        <span className="label text-lime">( 01 ) — Studio</span>
        <span className="note hidden max-w-[14rem] text-right text-mute sm:block">One voice. One visual. One studio.</span>
      </div>

      {/* Big morphing glyph */}
      <motion.div
        className="pointer-events-none absolute right-[4%] top-[18%] text-lime"
        style={{ rotate, scale }}
      >
        <Glyph
          shapes={['sparkle', 'x', 'smiley', 'flower', 'heart']}
          size="min(30vw, 42svh)"
          interval={3000}
          delay={0.6}
          radius={0.42}
        />
      </motion.div>

      <h1 className="relative z-10 mt-auto flex flex-col gap-[calc(min(13svh,9.4vw)*0.3)] pt-16">
        <span className="sr-only">We build digital presence</span>
        <motion.span style={{ x: x1 }} className="text-paper">
          <GlyphText text="WE BUILD" size={CAP} decorative interactive />
        </motion.span>
        <motion.span style={{ x: x2 }} className="pl-[8vw] text-paper">
          <GlyphText text="DIGITAL" size={CAP} decorative interactive delay={0.15} />
        </motion.span>
        <motion.span style={{ x: x3 }} className="text-lime">
          <GlyphText text="PRESENCE" size={CAP} decorative interactive delay={0.3} hoverColor="var(--color-paper)" />
        </motion.span>
      </h1>

      <div className="relative z-10 mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
        <motion.p
          className="max-w-md text-lg leading-relaxed text-mute"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          Most businesses confuse having a website with having a presence.{' '}
          <span className="text-paper">The gap between the two is where we work.</span>
        </motion.p>

        <Magnetic>
          <Link
            href="/#work"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('/#work');
            }}
            onPointerEnter={() => setCtaHover(true)}
            onPointerLeave={() => setCtaHover(false)}
            className="group flex items-center gap-4 rounded-full bg-lime py-3 pl-7 pr-3 text-ink"
          >
            <span className="label text-[0.8rem] font-bold">See the work</span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 ease-glyph group-hover:rotate-90">
              <Glyph shapes={['arrow', 'sparkle']} active={ctaHover ? 1 : 0} size={18} radius={0.5} />
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
