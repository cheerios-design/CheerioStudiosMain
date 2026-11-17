import type { IconName } from './glyph/icons';

// Everything on /sprint lives here: change a price, a step or an answer in one place.

export const SPRINT = {
  name: 'Launch Sprint',
  days: 7,
  /** Founding price for the first clients, in exchange for a short case study */
  foundingPrice: 750,
  regularPrice: 1200,
  /** Founding spots still open. Set to 0 and the page switches to the regular price. */
  foundingSpots: 3,
  /** Monthly Care Plan price, e.g. "$150/mo". Empty shows "On request". */
  carePlanPrice: '',
};

export const SPRINT_SUMMARY =
  'A conversion-focused landing page and mini brand kit for SaaS founders, designed and built in 7 days. Fixed scope, fixed price.';

type Tile = { title: string; copy: string; icons: [IconName, IconName] };

export const SPRINT_GAPS: Tile[] = [
  {
    title: "Visitors can't tell what it does",
    copy: "If the first screen doesn't explain the product, people leave before they ever see the good part.",
    icons: ['eye', 'x'],
  },
  {
    title: 'It looks like a side project',
    copy: 'A page that feels unfinished makes a solid product feel risky to sign up for.',
    icons: ['browser', 'sparkle'],
  },
  {
    title: 'Every change waits on a developer',
    copy: 'New feature, new pricing, new headline: you should be able to ship it the same afternoon.',
    icons: ['pointer', 'bolt'],
  },
];

export const SPRINT_INCLUDED: Tile[] = [
  {
    title: 'Landing page',
    copy: 'Up to 7 sections built around one goal, getting the right people to sign up: hero, problem, features, how it works, social proof, pricing, FAQ.',
    icons: ['browser', 'arrowRight'],
  },
  {
    title: 'Mini brand kit',
    copy: 'Logo refinement, colour palette, type pairing and 5 social templates, so your launch posts match the page.',
    icons: ['eye', 'sparkle'],
  },
  {
    title: 'Launch-ready',
    copy: 'Basic SEO, a working signup or contact form, and your domain connected.',
    icons: ['target', 'bolt'],
  },
  {
    title: 'Two revision rounds',
    copy: 'Scheduled into the sprint, so feedback never pushes the launch date.',
    icons: ['steps', 'plus'],
  },
  {
    title: 'Yours to edit',
    copy: 'Built in Framer, with a 30-minute handover video, so you can change copy and swap sections without us.',
    icons: ['pointer', 'smiley'],
  },
];

export const SPRINT_ADDONS: { title: string; price: string }[] = [
  { title: 'Extra page or section set', price: '$250' },
  { title: 'Copywriting from scratch', price: '$300' },
  { title: 'Rush delivery (4 days)', price: '+30%' },
  { title: 'Monthly Care Plan: edits, updates, new social templates', price: SPRINT.carePlanPrice || 'On request' },
];

export const SPRINT_STEPS: { day: string; title: string; copy: string }[] = [
  { day: 'DAY 0', title: 'Brief', copy: 'You send your logo, draft copy and a few sites you like.' },
  { day: 'DAY 1', title: 'Brand kit', copy: 'Colours, type and logo locked before the build starts.' },
  { day: 'DAY 2-4', title: 'Build', copy: 'Designed and built in Framer. You get a live preview link.' },
  { day: 'DAY 5', title: 'Revision 1', copy: 'Your feedback, all in one round.' },
  { day: 'DAY 6', title: 'Revision 2', copy: 'Final polish and fixes.' },
  { day: 'DAY 7', title: 'Launch', copy: 'Live on your domain, plus your handover video.' },
];

export const SPRINT_PRICE_POINTS = [
  'Landing page, brand kit, SEO, form and domain',
  'Two revision rounds and a handover video',
  'Paid upfront, or 50% to start and 50% before launch',
];

export const SPRINT_FIT = {
  yes: [
    'Are launching or relaunching a SaaS product in the next few weeks.',
    "Know what your product does and who it's for, even if the copy is rough.",
    'Want a page you can keep editing yourself after launch.',
  ],
  no: [
    'Need a multi-page marketing site or an online store.',
    "Haven't decided what the product is yet. Start with a free strategy session instead.",
  ],
};

export const SPRINT_FAQ: { q: string; a: string }[] = [
  {
    q: 'What do I need to send?',
    a: 'Your logo or product name, a rough draft of your copy, product screenshots, and two or three sites you like. The brief takes about 15 minutes.',
  },
  {
    q: "I don't have copy yet. Can you write it?",
    a: "Yes, with the copywriting add-on. Without it, we tighten and edit what you send but don't write it from scratch.",
  },
  {
    q: 'Why Framer?',
    a: "It's fast, it looks sharp on every screen, and you can edit it yourself without touching code. If you're set on another platform, ask us first. Framer's site plan is billed to you directly by Framer.",
  },
  {
    q: 'What if I need more than 7 sections?',
    a: 'Add extra pages or section sets at a fixed price. The scope is agreed in writing before day one, so there are no surprises.',
  },
  {
    q: 'Do you work across time zones?',
    a: "Yes. We work English-first with international founders, and the sprint is async by design, so time zones don't slow it down.",
  },
  {
    q: 'What happens after launch?',
    a: "The page is yours. If you'd rather not maintain it, the monthly Care Plan covers edits, updates and fresh social templates.",
  },
];
