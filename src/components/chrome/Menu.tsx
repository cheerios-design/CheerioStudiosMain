'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Glyph from '../glyph/Glyph';
import IndexNav from '../IndexNav';
import Magnetic from './Magnetic';
import { useLenis } from '../SmoothScroll';
import { CONTACT_LINKS } from '@/lib/site';

// No navbar: a single glyph button that opens the index as a full-screen overlay
export default function Menu() {
  const [open, setOpen] = useState(false);
  const [indexVisible, setIndexVisible] = useState(true);
  const lenis = useLenis();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // On the home page the index is already on screen, so the button waits until it scrolls away
  const isHome = pathname === '/';
  const showButton = !isHome || !indexVisible;

  useEffect(() => {
    const index = document.getElementById('index');
    if (!isHome || !index) return;
    const io = new IntersectionObserver(([entry]) => setIndexVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(index);
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? 'hidden' : '';

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lenis]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      <AnimatePresence>
        {(showButton || open) && (
          <motion.div
            className="fixed right-4 top-4 z-[100] sm:right-6 sm:top-6"
            initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.4, rotate: 45 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Magnetic>
              <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls="index-overlay"
                aria-label={open ? 'Close index' : 'Open index'}
                onClick={() => setOpen((o) => !o)}
                className="group grid h-14 w-14 place-items-center rounded-chip border border-lime/30 bg-ink text-lime transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink"
              >
                <Glyph shapes={['menu', 'close']} active={open ? 1 : 0} size={24} radius={0.5} />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="index-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Index"
            className="dot-grid fixed inset-0 z-[90] flex flex-col bg-ink"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 52px) 52px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 52px) 52px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 pt-7 sm:px-8">
              <span className="label text-mute">Cheerio Studios — Index</span>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-10">
              <IndexNav onNavigate={close} delay={0.35} />
            </div>
            <div className="flex items-center justify-between px-5 pb-6 sm:px-8">
              {CONTACT_LINKS.slice(1).map((l) => (
                <a key={l.name} href={l.url} target={l.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="label text-paper transition-colors hover:text-lime">
                  ( {l.name} )
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
