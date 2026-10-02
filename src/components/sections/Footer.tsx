'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph, { StaticGlyph } from '../glyph/Glyph';
import Magnetic from '../chrome/Magnetic';
import { useLenis } from '../SmoothScroll';
import { CONTACT_LINKS } from '@/lib/site';

export default function Footer() {
  const lenis = useLenis();
  const [topHover, setTopHover] = useState(false);
  const year = new Date().getFullYear();

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.8, force: true });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-ink-3 pb-16 md:grid-cols-[1.4fr_1fr_auto]">
          <p className="note max-w-md text-[clamp(1.8rem,3.4vw,3rem)] text-paper">
            One voice. One visual. <span className="text-lime">One studio.</span>
          </p>

          <ul className="flex flex-col gap-1">
            {CONTACT_LINKS.map((l) => (
              <li key={l.name}>
                <a
                  href={l.url}
                  target={l.url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-1 font-display text-2xl font-bold uppercase tracking-tight transition-colors hover:text-lime"
                >
                  <span className="w-0 overflow-hidden text-lime transition-all duration-500 ease-glyph group-hover:w-6">
                    <StaticGlyph shape="arrowRight" size={20} radius={0.5} />
                  </span>
                  {l.name}
                </a>
              </li>
            ))}
          </ul>

          <Magnetic>
            <button
              type="button"
              onClick={backToTop}
              onPointerEnter={() => setTopHover(true)}
              onPointerLeave={() => setTopHover(false)}
              aria-label="Back to top"
              className="grid h-24 w-24 place-items-center rounded-tile bg-lime text-ink"
            >
              <Glyph shapes={['arrowUp', 'sparkle']} active={topHover ? 1 : 0} size={40} />
            </button>
          </Magnetic>
        </div>

        <motion.div
          className="py-10 text-paper"
          initial={{ y: 60 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlyphText text="CHEERIO" fit="width" interactive decorative />
        </motion.div>

        <div className="flex flex-col justify-between gap-2 border-t border-ink-3 py-6 sm:flex-row">
          <span className="label text-mute">© {year} Cheerio Studios</span>
          <a href="/privacy/" className="label text-mute transition-colors hover:text-lime">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}
