'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectLogo from '../ProjectLogo';
import { StaticGlyph } from '../glyph/Glyph';
import { PROJECTS } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

// Logo wall: one tile per project, each on its own brand colour, linking to the case study
export default function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-h" className="bg-ink px-5 pb-8 sm:px-8 sm:pb-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 id="clients-h" className="label text-lime">( Clients ) — Who we&rsquo;ve worked with</h2>
          <span className="note text-mute">( {String(PROJECTS.length).padStart(2, '0')} )</span>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <Link href={`/pages/${p.slug}`} aria-label={`${p.title} case study`} className="group block">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-chip border border-ink-3 transition-[border-color,transform] duration-500 ease-glyph group-hover:-translate-y-1.5 group-hover:border-lime group-focus-visible:border-lime sm:rounded-tile">
                  <ProjectLogo project={p} className="transition-transform duration-700 ease-glyph group-hover:scale-[1.06]" />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 grid h-9 w-9 scale-0 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 ease-glyph group-hover:scale-100 group-hover:-rotate-45 group-focus-visible:scale-100"
                  >
                    <StaticGlyph shape="arrowRight" size={14} radius={0.5} />
                  </span>
                </span>
                <span className="label mt-3 flex items-baseline gap-3 text-mute transition-colors duration-300 group-hover:text-paper">
                  <span className="text-lime">{p.num}</span>
                  <span className="min-w-0 truncate">{p.client}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
