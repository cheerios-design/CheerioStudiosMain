'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import IndexNav from '../IndexNav';
import CheerioLogo from '../CheerioLogo';
import { StaticGlyph } from '../glyph/Glyph';
import { useScrollTo } from '../SmoothScroll';
import { CONTACT_LINKS, LIME } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

// The first screen: the site's index, set in huge glyph type
export default function IndexSection() {
  const scrollTo = useScrollTo();

  return (
    <section id="index" className="dot-grid relative flex min-h-svh flex-col bg-ink">
      <motion.header
        className="flex items-center justify-between px-5 pt-6 sm:px-8"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Cheerio Studios — home">
          <CheerioLogo size={30} color={LIME} className="transition-transform duration-500 ease-glyph group-hover:rotate-180" />
          <span className="label text-paper">Cheerio Studios</span>
        </Link>
        <span className="label hidden text-mute md:block">Digital creative studio</span>
        <span className="note text-mute">( Index )</span>
      </motion.header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <IndexNav delay={0.15} />
      </div>

      <motion.footer
        className="grid grid-cols-3 items-end px-5 pb-6 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <a href={CONTACT_LINKS[1].url} className="label justify-self-start text-paper transition-colors hover:text-lime">
          ( Email )
        </a>
        <button
          type="button"
          onClick={() => scrollTo('/#hero')}
          className="label flex flex-col items-center gap-2 justify-self-center text-mute transition-colors hover:text-lime"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <StaticGlyph shape="arrow" size={16} radius={0.5} />
          </motion.span>
        </button>
        <a
          href={CONTACT_LINKS[2].url}
          target="_blank"
          rel="noopener noreferrer"
          className="label justify-self-end text-paper transition-colors hover:text-lime"
        >
          ( Instagram )
        </a>
      </motion.footer>
    </section>
  );
}
