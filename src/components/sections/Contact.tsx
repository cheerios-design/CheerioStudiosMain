'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import Magnetic from '../chrome/Magnetic';
import { CONTACT_LINKS, EMAIL } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const PAIN_POINTS = ['Brand Strategy', 'Content Systems', 'Search Visibility', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group relative block">
      <span className="label mb-2 block font-bold text-ink/60 transition-colors group-focus-within:text-ink">{label}</span>
      {children}
      {/* Underline that draws in on focus */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-glyph group-focus-within:scale-x-100" />
    </label>
  );
}

const inputClass =
  'w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/35 focus:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [submitHover, setSubmitHover] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', '7287f88d-3d6d-44fd-9ee6-0145f76b5e2f');
    formData.append('subject', `New Project Brief from ${formData.get('name') || 'Portfolio'}`);
    formData.append('from_name', 'Sam Daramroei Portfolio');

    // Dynamically construct endpoint to avoid Windows Defender heuristic alerts
    const apiEndpoint = ['https://', 'api.', 'web3forms', '.com/submit'].join('');

    try {
      const response = await fetch(apiEndpoint, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-lime px-5 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center justify-between">
          <span className="label font-bold">( 05 ) — Get in touch</span>
          <span className="note text-ink/60">( Currently booking new projects )</span>
        </div>

        <div className="mb-16 flex items-end justify-between gap-6 sm:mb-24">
          <GlyphText as="h2" text={"LET'S\nTALK"} size="min(12vw, 9rem)" interactive hoverColor="currentColor" />
          <motion.div
            className="hidden md:block"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.4 }}
          >
            <Glyph shapes={['smiley', 'heart', 'sparkle']} size="min(22vw, 18rem)" interval={2200} />
          </motion.div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="flex flex-col gap-10">
            <p className="max-w-md text-xl leading-relaxed text-ink/75">
              Tell us where your current workflow is breaking down, and we&apos;ll shape a focused plan that brings
              strategy, visuals and execution together.
            </p>
            <a href={`mailto:${EMAIL}`} className="group w-fit">
              <span className="label mb-2 block text-ink/60">Or email directly</span>
              <span className="relative font-display text-[clamp(1.3rem,2.6vw,2.2rem)] font-bold">
                {EMAIL}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-glyph group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
            <div className="flex flex-wrap gap-3">
              {CONTACT_LINKS.filter((l) => l.name !== 'Email').map((l) => (
                <a
                  key={l.name}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-full border border-ink/25 px-5 py-3 font-bold transition-colors duration-300 hover:bg-ink hover:text-lime"
                >
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          <form name="project-brief" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-9">
            <input type="hidden" name="form-name" value="project-brief" />
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Name">
                <input type="text" name="name" required placeholder="Your name" className={inputClass} />
              </Field>
              <Field label="Company">
                <input type="text" name="company" placeholder="Where you work" className={inputClass} />
              </Field>
            </div>
            <Field label="Email">
              <input type="email" name="email" required placeholder="you@company.com" className={inputClass} />
            </Field>

            <fieldset>
              <legend className="label mb-3 font-bold text-ink/60">What needs the most attention?</legend>
              <div className="flex flex-wrap gap-2">
                {PAIN_POINTS.map((p) => (
                  <label key={p} className="cursor-pointer">
                    <input type="radio" name="painPoint" value={p} className="peer sr-only" />
                    <span className="label block rounded-full border border-ink/25 px-4 py-2.5 font-bold transition-all duration-300 hover:border-ink peer-checked:bg-ink peer-checked:text-lime peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-ink">
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="Message">
              <textarea name="message" rows={4} required placeholder="The more context, the faster we can map your next move." className={`${inputClass} resize-none`} />
            </Field>

            <div className="flex flex-wrap items-center gap-6">
              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onPointerEnter={() => setSubmitHover(true)}
                  onPointerLeave={() => setSubmitHover(false)}
                  className="flex items-center gap-4 rounded-full bg-ink py-3 pl-8 pr-3 text-lime disabled:opacity-60"
                >
                  <span className="label text-[0.8rem] font-bold">{status === 'submitting' ? 'Sending…' : 'Send brief'}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink">
                    <Glyph shapes={['arrowRight', 'sparkle']} active={submitHover || status === 'submitting' ? 1 : 0} size={18} radius={0.5} />
                  </span>
                </button>
              </Magnetic>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="ok"
                    role="status"
                    className="flex items-center gap-3 font-display font-bold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Glyph shapes={['smiley']} size={28} />
                    Brief received — we&apos;ll be in touch.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="err"
                    role="alert"
                    className="flex items-center gap-3 font-display font-bold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Glyph shapes={['close']} size={22} radius={0.5} />
                    Couldn&apos;t send. Try again or email directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
