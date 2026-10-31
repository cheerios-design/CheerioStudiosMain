// Validation and clean-up for the contact form ("project brief").
// The form posts straight to Web3Forms from the browser, so everything here is a first line of
// defence for real visitors; the server-side guards are Web3Forms' hCaptcha and honeypot checks.

export const PAIN_POINTS = ['Free Website Audit', 'Brand Strategy', 'Content Systems', 'Search Visibility', 'Other'];

export const LIMITS = { name: 80, company: 100, email: 254, website: 200, message: 3000 } as const;

/** Fixed subject: never built from visitor input, so nobody can write the subject line of an email to our inbox */
export const BRIEF_SUBJECT = 'New project brief from cheeriostudios.com';

/** A human needs at least this long to fill the form; anything faster is treated as a bot */
export const MIN_FILL_MS = 3000;

/** More links than this in one message is almost always spam or phishing */
export const MAX_LINKS = 3;

export type Brief = {
  name: string;
  company: string;
  email: string;
  painPoint: string;
  website: string;
  message: string;
};

export type Check =
  | { ok: true; brief: Brief }
  | { ok: false; reason: 'bot' }
  | { ok: false; reason: 'invalid'; field: keyof Brief; message: string };

// Invisible characters used to disguise text and links: zero-width, bidi overrides, BOM
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g;
// Control characters (CR/LF, tabs and the rest) that have no place in a one-line field
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/g;
// Same, but keeping line breaks for the message
const CONTROL_KEEP_NL = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g;

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '');

/** One line of plain text: no line breaks or invisible characters, single spaces, capped length */
export function cleanLine(v: FormDataEntryValue | null, max: number): string {
  return str(v).replace(INVISIBLE, '').replace(CONTROL, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Multi-line text: keeps line breaks, drops other control characters, at most two blank lines in a row */
export function cleanText(v: FormDataEntryValue | null, max: number): string {
  return str(v)
    .replace(/\r\n?/g, '\n')
    .replace(INVISIBLE, '')
    .replace(CONTROL_KEEP_NL, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

const EMAIL_RE = /^[^\s@<>()[\]",;:\\]+@[^\s@<>()[\]",;:\\]+\.[A-Za-z]{2,}$/;

/** Only plain http(s) addresses; rejects javascript:, data:, file: and URLs with credentials in them */
export function safeWebsite(v: string): string | null {
  if (!v) return '';
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (u.username || u.password) return null;
    if (!u.hostname.includes('.')) return null;
    return u.toString().slice(0, LIMITS.website);
  } catch {
    return null;
  }
}

export function countLinks(text: string): number {
  return (text.match(/(https?:\/\/|www\.)\S+/gi) || []).length;
}

/** Validate a submitted brief. `startedAt` is when the visitor first touched the form. */
export function checkBrief(data: FormData, startedAt: number | null, now: number): Check {
  // Honeypot: hidden from people, so only bots tick it
  if (data.get('botcheck')) return { ok: false, reason: 'bot' };
  if (startedAt === null || now - startedAt < MIN_FILL_MS) return { ok: false, reason: 'bot' };

  const brief: Brief = {
    name: cleanLine(data.get('name'), LIMITS.name),
    company: cleanLine(data.get('company'), LIMITS.company),
    email: cleanLine(data.get('email'), LIMITS.email),
    painPoint: '',
    website: '',
    message: cleanText(data.get('message'), LIMITS.message),
  };

  const pain = str(data.get('painPoint'));
  brief.painPoint = PAIN_POINTS.includes(pain) ? pain : '';

  if (brief.name.length < 2) return { ok: false, reason: 'invalid', field: 'name', message: 'Please add your name.' };
  if (!EMAIL_RE.test(brief.email)) return { ok: false, reason: 'invalid', field: 'email', message: 'Please check your email address.' };

  const site = safeWebsite(cleanLine(data.get('website'), LIMITS.website));
  if (site === null) return { ok: false, reason: 'invalid', field: 'website', message: 'Please enter a normal web address, like https://yoursite.com.' };
  brief.website = site;

  if (brief.message.length < 10) return { ok: false, reason: 'invalid', field: 'message', message: 'Tell us a little more in your message.' };
  if (countLinks(brief.message) > MAX_LINKS) {
    return { ok: false, reason: 'invalid', field: 'message', message: `Please keep links to ${MAX_LINKS} or fewer, or email us directly.` };
  }

  return { ok: true, brief };
}

/** The exact fields sent to Web3Forms. Nothing the visitor typed reaches the subject or sender name. */
export function toPayload(brief: Brief, accessKey: string, captchaToken: string): FormData {
  const out = new FormData();
  out.append('access_key', accessKey);
  out.append('subject', BRIEF_SUBJECT);
  out.append('from_name', 'Cheerio Studios Website');
  out.append('botcheck', '');
  out.append('h-captcha-response', captchaToken);
  out.append('name', brief.name);
  out.append('company', brief.company);
  out.append('email', brief.email);
  out.append('painPoint', brief.painPoint);
  out.append('website', brief.website);
  out.append('message', brief.message);
  return out;
}
