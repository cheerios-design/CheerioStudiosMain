'use client';

import { useEffect, useRef, useState } from 'react';
import GlyphText from '../glyph/GlyphText';
import { useLenis } from '../SmoothScroll';
import type { Project } from '@/lib/site';

const two = (n: number) => String(n).padStart(2, '0');

/**
 * The written story. On large screens a sticky column holds the current part's number
 * and an index of headings; the text scrolls past it and each part lights up in turn.
 */
export default function Story({ sections }: { sections: Project['sections'] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const lenis = useLenis();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.part));
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -window.innerHeight * 0.3, duration: 1.1 });
    else el.scrollIntoView({ block: 'center' });
  };

  return (
    <div className="grid gap-x-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      {/* Sticky index (large screens) */}
      <div className="hidden lg:block">
        <div className="sticky top-[max(7rem,calc(50vh-14rem))] pb-[14vh]">
          <div className="mb-10 flex items-end gap-4">
            <GlyphText key={active} text={two(active + 1)} size="clamp(5rem, 9vw, 8.5rem)" className="text-lime" decorative />
            <span className="note pb-1 tabular-nums text-mute">/ {two(sections.length)}</span>
          </div>
          <ol>
            {sections.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.heading} className="border-t border-ink-3 last:border-b">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? 'step' : undefined}
                    className={`group flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 ${on ? 'text-paper' : 'text-mute hover:text-paper'}`}
                  >
                    <span className={`block h-0.5 rounded-full bg-lime transition-all duration-500 ease-glyph ${on ? 'w-8' : 'w-0'}`} aria-hidden />
                    <span className="label tabular-nums">{two(i + 1)}</span>
                    <span className="font-display font-bold">{s.heading}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <ol className="flex flex-col">
        {sections.map((s, i) => (
          <li
            key={s.heading}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-part={i}
            className={`border-t border-ink-3 py-12 transition-opacity duration-500 first:border-t-0 first:pt-0 lg:border-t-0 lg:py-[11vh] lg:first:pt-[4vh] ${
              i === active ? 'lg:opacity-100' : 'lg:opacity-35'
            }`}
          >
            <div className="mb-6 lg:hidden">
              <GlyphText text={two(i + 1)} size="2.4rem" className="text-lime" decorative />
            </div>
            <h3 className="mb-6 font-display text-[clamp(1.7rem,3.2vw,2.8rem)] font-bold uppercase leading-none tracking-tight text-balance">
              {s.heading}
            </h3>
            <p className="max-w-2xl text-lg leading-[1.8] text-paper/80">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
