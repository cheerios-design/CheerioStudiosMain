'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from '../SmoothScroll';
import { chapterDomId, type ChapterMeta } from './Chapter';

/** Side index for large screens: one tick per chapter, the current one lit. Hover or focus shows the names. */
export default function ChapterRail({ chapters, wrapperId }: { chapters: ChapterMeta[]; wrapperId: string }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const band = { rootMargin: '-50% 0px -50% 0px' };
    // The chapter crossing the middle of the screen is the current one
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(chapters.findIndex((c) => chapterDomId(c.id) === e.target.id));
      }
    }, band);
    chapters.forEach((c) => {
      const el = document.getElementById(chapterDomId(c.id));
      if (el) io.observe(el);
    });

    // Only on show while the chapters themselves are on screen (not over the hero or the footer)
    const wrapper = document.getElementById(wrapperId);
    const wio = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), band);
    if (wrapper) wio.observe(wrapper);

    return () => {
      io.disconnect();
      wio.disconnect();
    };
  }, [chapters, wrapperId]);

  const go = (id: string) => {
    const el = document.getElementById(chapterDomId(id));
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.2 });
    else el.scrollIntoView();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Chapters"
          className="group/rail fixed right-0 top-1/2 z-[70] hidden -translate-y-1/2 lg:block"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.4 }}
        >
          <ol className="flex flex-col items-end rounded-l-chip border border-r-0 border-ink-3 bg-ink/80 py-3 pl-4 pr-3 backdrop-blur-sm">
            {chapters.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.id}>
                  <a
                    href={`#${chapterDomId(c.id)}`}
                    aria-current={on ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(c.id);
                    }}
                    className="flex items-center justify-end gap-3 py-[7px]"
                  >
                    <span
                      className={`label max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 group-focus-within/rail:max-w-48 group-focus-within/rail:opacity-100 group-hover/rail:max-w-48 group-hover/rail:opacity-100 ${
                        on ? 'text-lime' : 'text-mute hover:text-paper'
                      }`}
                    >
                      {c.num} {c.label}
                    </span>
                    <span
                      aria-hidden
                      className={`block h-0.5 rounded-full transition-all duration-500 ease-glyph ${on ? 'w-7 bg-lime' : 'w-3 bg-paper/30'}`}
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
