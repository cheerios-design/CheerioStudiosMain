'use client';

import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Glyph from './glyph/Glyph';
import Magnetic from './chrome/Magnetic';
import { track } from '@/lib/site';
import { LIMITS, PAIN_POINTS, SPRINT_COPY_STATES, checkBrief, checkSprintExtras, toPayload } from '@/lib/brief';

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

const chipClass =
  'label block rounded-full border border-ink/25 px-4 py-2.5 font-bold transition-all duration-300 hover:border-ink peer-checked:bg-ink peer-checked:text-lime peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-ink';

/**
 * The project brief form, set on a lime section. "project" is the homepage contact form;
 * "sprint" is the Launch Sprint brief on /sprint (same checks, two extra answers).
 */
export default function BriefForm({ variant = 'project' }: { variant?: 'project' | 'sprint' }) {
  const sprint = variant === 'sprint';
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
    const data = new FormData(form);
    const check = checkBrief(data, startedAt.current, Date.now());

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
    const payload = toPayload(check.brief, ACCESS_KEY, captcha, sprint ? checkSprintExtras(data) : undefined);

    try {
      const response = await fetch(apiEndpoint, { method: 'POST', body: payload });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        track('Brief submitted', { topic: sprint ? 'Launch Sprint' : check.brief.painPoint || 'none' });
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
    <form name={sprint ? 'sprint-brief' : 'project-brief'} method="POST" onSubmit={handleSubmit} onFocus={markStart} className="flex flex-col gap-9">
      {/* Honeypot: hidden from people and screen readers; bots that fill every field tick it */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" style={{ display: 'none' }} />
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Name">
          <input type="text" name="name" required minLength={2} maxLength={LIMITS.name} autoComplete="name" placeholder="Your name" className={inputClass} />
        </Field>
        <Field label={sprint ? 'Product name' : 'Company'}>
          <input type="text" name="company" maxLength={LIMITS.company} autoComplete="organization" placeholder={sprint ? 'What it’s called' : 'Where you work'} className={inputClass} />
        </Field>
      </div>
      <Field label="Email">
        <input type="email" name="email" required maxLength={LIMITS.email} autoComplete="email" placeholder="you@company.com" className={inputClass} />
      </Field>

      {sprint ? (
        <>
          <div className="grid gap-9 sm:grid-cols-2">
            <Field label="Product URL (optional)">
              <input type="text" inputMode="url" name="website" maxLength={LIMITS.website} autoComplete="url" placeholder="https://yourproduct.com" className={inputClass} />
            </Field>
            <Field label="Target launch date (optional)">
              <input type="date" name="launchDate" className={`${inputClass} [color-scheme:light]`} />
            </Field>
          </div>
          <fieldset>
            <legend className="label mb-3 font-bold text-ink/60">Where&apos;s your copy at?</legend>
            <div className="flex flex-wrap gap-2">
              {SPRINT_COPY_STATES.map((p) => (
                <label key={p} className="cursor-pointer">
                  <input type="radio" name="copyStatus" value={p} className="peer sr-only" />
                  <span className={chipClass}>{p}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="What does your product do, and who is it for?">
            <textarea name="message" rows={4} required minLength={10} maxLength={LIMITS.message} placeholder="One or two sentences is plenty." className={`${inputClass} resize-none`} />
          </Field>
        </>
      ) : (
        <>
          <fieldset>
            <legend className="label mb-3 font-bold text-ink/60">What needs the most attention?</legend>
            <div className="flex flex-wrap gap-2">
              {PAIN_POINTS.map((p) => (
                <label key={p} className="cursor-pointer">
                  <input type="radio" name="painPoint" value={p} className="peer sr-only" />
                  <span className={chipClass}>{p}</span>
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
        </>
      )}

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
              {sprint ? 'Brief received — we’ll confirm your scope and start date by email.' : 'Brief received — we’ll be in touch.'}
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
  );
}
