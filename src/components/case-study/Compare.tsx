'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BeforeAfter from '../BeforeAfter';
import BrowserChrome from './BrowserChrome';
import { EASE } from './Chapter';
import type { Project } from '@/lib/site';

/** One before/after slider at a time, switched with tabs, so the page is not a stack of screenshots */
export default function Compare({ items, host, note }: { items: NonNullable<Project['comparisons']>; host: string; note?: string }) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  return (
    <div className="mx-auto max-w-6xl">
      <div role="tablist" aria-label="Pages to compare" className="mb-6 flex flex-wrap gap-2">
        {items.map((c, i) => {
          const on = i === index;
          return (
            <button
              key={c.after.src}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setIndex(i)}
              className={`label relative rounded-full border px-5 py-3 transition-colors duration-300 ${
                on ? 'border-lime font-bold text-ink' : 'border-ink-3 text-mute hover:border-paper/40 hover:text-paper'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="compare-pill"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c.caption}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        role="tabpanel"
        aria-label={current.caption}
        className="overflow-hidden rounded-tile border border-ink-3 bg-ink-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <BrowserChrome host={host} path={current.path} />
        <div className="relative aspect-[1388/868]">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.after.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <BeforeAfter before={current.before} after={current.after} label={current.caption} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {note && <p className="note mt-5 text-mute">{note}</p>}
    </div>
  );
}
