'use client';

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { StaticGlyph } from '../glyph/Glyph';
import { SERVICES } from '@/lib/site';

// Lime ticker of services — skews with scroll speed
export default function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 });
  const skew = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8], { clamp: true });

  const items = SERVICES.map((s) => s.title);

  return (
    <div className="relative z-10 -rotate-2 overflow-hidden bg-lime py-4 text-ink sm:py-5" aria-hidden="true">
      <motion.div style={{ skewX: skew }}>
        <div className="marquee-track flex w-max items-center" style={{ ['--marquee-duration' as string]: '36s' }}>
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl">
                {item}
              </span>
              <StaticGlyph shape={i % 2 ? 'sparkle' : 'flower'} size={28} />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
