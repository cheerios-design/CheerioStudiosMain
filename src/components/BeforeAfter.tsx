'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

type Shot = { src: string; alt: string };

/** Two screenshots of the same page stacked, with a slider that reveals the old one from the left. */
export default function BeforeAfter({ before, after, label }: { before: Shot; after: Shot; label: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // The divider sways once when it first comes into view, to show that it can be dragged
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(50, [50, 30, 66, 50], {
      duration: 1.8,
      ease: 'easeInOut',
      delay: 0.35,
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      className="relative select-none overflow-hidden bg-ink-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-lime"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after.src} alt={after.alt} width={1388} height={868} loading="lazy" draggable={false} className="block h-auto w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.src} alt={before.alt} loading="lazy" draggable={false} className="block h-full w-full object-cover object-top" />
      </div>

      <span className="label pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-paper">Before</span>
      <span className="label pointer-events-none absolute right-4 top-4 rounded-full bg-lime px-3 py-1.5 font-bold text-ink">After</span>

      {/* Divider and handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-lime" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime font-display text-sm font-bold text-ink shadow-lg">
          ⟷
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {label}: drag to compare the old and new design
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onPointerDown={() => {
          touched.current = true;
        }}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
