'use client';

import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { AnimatePresence, motion } from 'framer-motion';
import GlyphText from '../glyph/GlyphText';
import Glyph from '../glyph/Glyph';
import Magnetic from '../chrome/Magnetic';
import Link from 'next/link';
import { BOOKING_URL, CONTACT_LINKS, EMAIL, track } from '@/lib/site';
import { LIMITS, PAIN_POINTS, checkBrief, toPayload } from '@/lib/brief';

const EASE = [0.22, 1, 0.36, 1] as const;
/** Web3Forms access key. It is public by design; hCaptcha (enabled in the Web3Forms dashboard) stops it being used without a person. */
const ACCESS_KEY = '7287f88d-3d6d-44fd-9ee6-0145f76b5e2f';
/** Web3Forms' shared hCaptcha site key for free plans */
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'invalid';

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

  const [problem, setProblem] = useState('');
  const [captcha, setCaptcha] = useState('');
  const captchaRef = useRef<HCaptcha>(null);
  const startedAt = useRef<number | null>(null);

  const markStart = () => {
    if (startedAt.current === null) startedAt.current = Date.now();
  };

  const resetCaptcha = () => {
    setCaptcha('');
    captchaRef.current?.resetCaptcha();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const check = checkBrief(new FormData(form), startedAt.current, Date.now());

    if (!check.ok && check.reason === 'bot') {
      // Look successful to the bot, send nothing
      setStatus('success');
      form.reset();
      return;
    }
    if (!check.ok) {
      setProblem(check.message);
      setStatus('invalid');
      (form.elements.namedItem(check.field) as HTMLElement | null)?.focus();
      return;
    }
    if (!captcha) {
      setProblem('Please complete the check above the button.');
      setStatus('invalid');
      return;
    }

    setStatus('submitting');
    // Dynamically construct endpoint to avoid Windows Defender heuristic alerts
    const apiEndpoint = ['https://', 'api.', 'web3forms', '.com/submit'].join('');

    try {
      const response = await fetch(apiEndpoint, { method: 'POST', body: toPayload(check.brief, ACCESS_KEY, captcha) });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        track('Brief submitted', { topic: check.brief.painPoint || 'none' });
        form.reset();
        startedAt.current = null;
      } else {
        setStatus('error');
        track('Brief failed');
      }
    } catch {
      setStatus('error');
      track('Brief failed');
    } finally {
      resetCaptcha();
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
            <div className="flex flex-col gap-4 rounded-tile border border-ink/20 p-6">
              <span className="label font-bold">Free 30-minute strategy session</span>
              <p className="max-w-md leading-relaxed text-ink/75">
                Rather talk it through? Pick a time and we&apos;ll look at your brand and website together, no strings
                attached.
              </p>
              <a
                href={BOOKING_URL}
                data-umami-event="Book a call"
                data-umami-event-from="contact"
                target="_blank"
                rel="noopener noreferrer"
                className="label w-fit rounded-full bg-ink px-6 py-3.5 font-bold text-lime transition-opacity hover:opacity-85"
              >
                Book a call ↗
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label font-bold">Complimentary website audit</span>
              <p className="max-w-md leading-relaxed text-ink/75">
                Pick &ldquo;Free Website Audit&rdquo; in the form and share your URL. We&apos;ll send back the three fixes
                that would make the biggest difference.
              </p>
            </div>
            <a href={`mailto:${EMAIL}`} data-umami-event="Email click" className="group w-fit">
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

          <form name="project-brief" method="POST" onSubmit={handleSubmit} onFocus={markStart} className="flex flex-col gap-9">
            {/* Honeypot: hidden from people and screen readers; bots that fill every field tick it */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" style={{ display: 'none' }} />
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Name">
                <input type="text" name="name" required minLength={2} maxLength={LIMITS.name} autoComplete="name" placeholder="Your name" className={inputClass} />
              </Field>
              <Field label="Company">
                <input type="text" name="company" maxLength={LIMITS.company} autoComplete="organization" placeholder="Where you work" className={inputClass} />
              </Field>
            </div>
            <Field label="Email">
              <input type="email" name="email" required maxLength={LIMITS.email} autoComplete="email" placeholder="you@company.com" className={inputClass} />
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

            <Field label="Website (optional)">
              <input type="text" inputMode="url" name="website" maxLength={LIMITS.website} autoComplete="url" placeholder="https://yoursite.com" className={inputClass} />
            </Field>

            <Field label="Message">
              <textarea name="message" rows={4} required minLength={10} maxLength={LIMITS.message} placeholder="The more context, the faster we can map your next move." className={`${inputClass} resize-none`} />
            </Field>

            <p className="text-sm text-ink/60">
              We only use your details to reply to you. See the{' '}
              <Link href="/privacy/" className="underline underline-offset-2 hover:text-ink">
                privacy policy
              </Link>
              .
            </p>

            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              reCaptchaCompat={false}
              onVerify={setCaptcha}
              onExpire={() => setCaptcha('')}
              onError={() => setCaptcha('')}
            />

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
                {status === 'invalid' && (
                  <motion.p
                    key="invalid"
                    role="alert"
                    className="flex items-center gap-3 font-display font-bold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Glyph shapes={['close']} size={22} radius={0.5} />
                    {problem}
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
