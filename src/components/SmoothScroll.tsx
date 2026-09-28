'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Navigate to "/#section" — glides on the home page, routes elsewhere */
export function useScrollTo() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (href: string) => {
      const hash = href.slice(href.indexOf('#'));
      if (pathname === '/' && hash.startsWith('#')) {
        const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash);
        if (target === null) return;
        if (lenis) lenis.scrollTo(target, { force: true, duration: 1.4 });
        else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
        else target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', hash === '#top' ? '/' : hash);
      } else {
        router.push(href);
      }
    },
    [lenis, pathname, router]
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(instance);

    let rafId = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Arriving from another page with a hash (e.g. /#work)
    if (window.location.hash) {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target) instance.scrollTo(target, { immediate: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
