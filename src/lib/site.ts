import type { IconName } from './glyph/icons';

/** Mirrors --color-lime, for places that can't read CSS variables (SVG fill attributes) */
export const LIME = '#D4FF1F';

export const SITE_URL = 'https://www.cheeriostudios.com';

export const SITE_NAME = 'Cheerio Studios';

export const SITE_DESCRIPTION =
  'Cheerio Studios is a digital creative studio specializing in brand identity, web design & development, strategy & consulting, and digital asset management.';

/** Link-preview card from brand-kit/web/og-image-1200x630.png */
export const OG_IMAGE = {
  url: '/brand/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Cheerio Studios — Digital Creative Studio',
};

export const EMAIL = 'sam.d@cheeriostudios.com';

/** Calendly page for the free strategy session */
/**
 * Umami Cloud website ID (cookieless analytics, no consent banner needed).
 * Leave empty to switch analytics off; the script only loads when this is set.
 */
export const UMAMI_WEBSITE_ID = '';

/** Send a custom event to Umami. Never pass personal data (names, emails, messages). */
export function track(event: string, data?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami?.track(event, data);
}

export const BOOKING_URL = 'https://calendly.com/sam-d-cheeriostudios';

export const CONTACT_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sam-daramroei/' },
  { name: 'Email', url: `mailto:${EMAIL}` },
  { name: 'Instagram', url: 'https://www.instagram.com/cheerio.studio/' },
];

export const SERVICES: { title: string; copy: string; icons: [IconName, IconName] }[] = [
  {
    title: 'Brand Identity',
    copy: 'Identity systems that stay consistent on every platform, from the logo down to the last social tile.',
    icons: ['eye', 'sparkle'],
  },
  {
    title: 'Web Design & Development',
    copy: 'Fast, responsive websites built on modern tech — designed to convert and built to scale.',
    icons: ['browser', 'arrowRight'],
  },
  {
    title: 'Strategy & Consulting',
    copy: 'Clear, defensible goals for your digital presence, and a plan that ties every decision back to them.',
    icons: ['target', 'plus'],
  },
  {
    title: 'Asset Management',
    copy: 'One organised home for your brand materials, so every file your team grabs is the right one.',
    icons: ['grid', 'flower'],
  },
  {
    title: 'Social & Content',
    copy: 'Campaigns, interviews and social storytelling that give your community a reason to show up, then keep coming back.',
    icons: ['heart', 'steps'],
  },
  {
    title: 'Maintenance & Support',
    copy: 'Ongoing care that keeps everything running long after launch day. Here for the long haul.',
    icons: ['bolt', 'heart'],
  },
  {
    title: 'Digital Design',
    copy: 'User-centred interfaces where the aesthetics and the usability pull in the same direction.',
    icons: ['pointer', 'smiley'],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  /** Who the author is, in English */
  context: string;
  rating: number;
  source: string;
  /** Case study this review belongs to, if any */
  projectSlug?: string;
};

/** Add a review here and it appears on the homepage (and on its case study, if projectSlug is set) */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with Sam and Cheerio Studios was truly both enjoyable and easy. Sam managed the brand design and website design process beautifully, checking and testing everything multiple times. We wish him and his team continued success!',
    author: 'Archovia',
    context: 'Architecture & interior design studio',
    rating: 5,
    source: 'Google review, translated from Turkish',
    projectSlug: 'archovia',
  },
  {
    quote:
      'Working with Cheerio Studios was such a refreshing journey! They map out everything that needs to be done and work closely with you to make sure that everything is working like a charm!',
    author: 'Sinema ve Dijital Medya Topluluğu',
    context: 'BAIBÜ Cinema & Digital Media Society',
    rating: 5,
    source: 'Google review',
    projectSlug: 'baibu-cinema',
  },
];

export type Project = {
  slug: string;
  num: string;
  title: string;
  /** Title for the glyph typeface — line breaks where the big type should wrap */
  glyphTitle: string;
  client: string;
  role: string;
  subtitle: string;
  summary: string;
  link: string;
  icon: IconName;
  deliverables: string[];
  /** Screenshot of the live site, shown in a browser frame on the case study */
  preview?: { src: string; alt: string };
  /** Brand assets shown as square tiles under the preview; bg fills around transparent images */
  gallery?: { src: string; alt: string; bg: string; caption: string; fill?: boolean }[];
  /** Full brand guide (a standalone page in public/) and a few of its sheets as screenshots */
  guide?: { href: string; sheets: { src: string; alt: string; caption: string }[] };
  /** Interactive walkthrough subpage, featured as a card on the case study */
  walkthrough?: { href: string; title: string; blurb: string; image: { src: string; alt: string } };
  /** Headline results, shown in big glyph numbers under the meta strip */
  stats?: { value: string; label: string; note?: string }[];
  /** Screens from the live site, each in a browser frame */
  screens?: { src: string; alt: string; caption: string; path: string }[];
  /** Same page before and after, compared with a drag slider */
  comparisons?: { before: { src: string; alt: string }; after: { src: string; alt: string }; caption: string; path: string }[];
  /** Small print under the results (data sources, caveats) */
  footnote?: string;
  sections: { heading: string; body: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'archovia',
    num: '01',
    title: 'Archovia',
    glyphTitle: 'ARCHOVIA',
    client: 'Archovia',
    role: 'Brand & Web Designer, Developer',
    subtitle: 'Brand Identity & Editorial Website for an Architecture Studio',
    summary:
      'A complete identity and a brutalist, editorial website for an architecture and interior design studio — an isometric mark, a drafting-inspired visual language and a fast, scroll-driven site.',
    link: 'https://cheerios-design.github.io/archovia-website/',
    icon: 'steps',
    preview: {
      src: '/assets/projects/archovia-preview.webp',
      alt: 'Homepage of the Archovia website, with the studio name in giant black type above a lakeside house',
    },
    gallery: [
      {
        src: '/assets/projects/archovia-lockup.webp',
        alt: 'Archovia stacked logo lockup in off-white on near-black',
        bg: '#0E0D0C',
        caption: 'Stacked lockup',
      },
      {
        src: '/assets/projects/archovia-avatar.webp',
        alt: 'Archovia mark in off-white on an oxblood square',
        bg: '#6E1A27',
        caption: 'Oxblood avatar',
        fill: true,
      },
      {
        src: '/assets/projects/archovia-mark-outline.webp',
        alt: 'Outline version of the Archovia mark, stacked chevrons on an isometric grid, in black on off-white',
        bg: '#EFEBE4',
        caption: 'Outline mark',
      },
    ],
    guide: {
      href: '/work/archovia-brand-identity.html',
      sheets: [
        {
          src: '/assets/projects/archovia-sheet-construction.webp',
          alt: 'Brand guide sheet A-102: the Archovia mark drawn on an isometric 30° grid with its modules, bar and gap units, clear space and minimum sizes',
          caption: 'A-102 · Construction',
        },
        {
          src: '/assets/projects/archovia-sheet-colour.webp',
          alt: 'Brand guide sheet A-201: the nine-colour palette of ink, paper, concrete greys and oxblood, with area proportions and contrast ratings',
          caption: 'A-201 · Colour',
        },
        {
          src: '/assets/projects/archovia-sheet-applications.webp',
          alt: 'Brand guide sheet A-701: the identity applied to the website, a business card, letterhead, social post, story and an oxblood studio plaque',
          caption: 'A-701 · Applications',
        },
      ],
    },
    deliverables: [
      'Logo & Brand Identity',
      'Brand Guidelines & Tokens',
      'Web Design',
      'Front-End Development',
      'Motion Design',
      'Accessibility',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Archovia was a young architecture, interior and product design studio with no consistent identity. Architecture studios sell with images, yet most of their websites look the same: a grid of photos and a contact page. Archovia needed a brand and a site that felt like the studio itself, precise, confident and crafted, without burying the work under effects or slowing it down.',
      },
      {
        heading: 'The Strategy',
        body: 'I borrowed the language of the drawing board. The mark is built on an isometric 30° grid, stacked chevrons that read as both a roofline and an "A", with strict rules for clear space and minimum size. The palette is mostly ink and paper, with oxblood used sparingly as the accent, and four free typefaces cover display, body, a single italic accent word and measurements. On the website, each section is a poster-style "plate", and the details come straight from technical drawings: dimension strings, level markers, grid axes and a floor plan that draws itself as you scroll.',
      },
      {
        heading: 'Execution & Results',
        body: 'The studio received a full brand kit: logo, lockup and wordmark variants in SVG and PNG, an app icon and social avatar, design tokens and a ten-sheet identity guide covering construction, colour, type, components and applications. The site is built on Astro with Tailwind CSS, GSAP and Lenis and ships as static pages. Curtain page transitions and magnetic buttons give it a tactile feel, while responsive WebP images, videos that only play when visible and self-hosted fonts keep it quick, and every animation switches off for visitors who prefer reduced motion.',
      },
    ],
  },
  {
    slug: 'rising-generation',
    num: '02',
    title: 'Rising Generation',
    glyphTitle: 'RISING\nGENERATION',
    client: 'Rising Gen Europe',
    role: 'Community Coordinator & Cross-Cultural Writer',
    subtitle: 'Global Community Engagement & Cross-Cultural Storytelling',
    summary:
      'Interviews and social campaigns that put members at the centre — unifying chapter communication across Europe and driving registration for global events.',
    link: 'https://www.instagram.com/risinggeneurope/',
    icon: 'flower',
    deliverables: [
      'Student & Mentor Interviews',
      'Multi-Cultural Content',
      'Global Engagement',
      'Newsletter Campaigns',
      'Social Storytelling',
      'Team Collaboration',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Rising Gen Europe connects young adults from dozens of countries and languages. The organization struggled to build deep, personal connections and maintain a unified digital communication system. They needed an inspiring, cross-border storytelling approach to help members feel welcome and motivate them to participate in large-scale summits and events.',
      },
      {
        heading: 'The Strategy',
        body: 'Instead of focusing on broadcast announcements, I centered our content on the community members themselves. I conducted interviews with students, mentors, and local leaders to bring authentic, personal stories to the forefront. I drafted engaging social media campaigns and structured newsletter updates that celebrated cultural diversity, and designed template packages so regional leaders could easily share updates in their own community spaces.',
      },
      {
        heading: 'Execution & Results',
        body: 'The story-driven approach created a supportive and cohesive online community. By highlighting student journeys and mentor perspectives, we saw significantly higher registrations and check-ins at global summits. Sharing authentic voices created a lasting sense of belonging and collaboration, strengthening community bonds across Europe.',
      },
    ],
  },
  {
    slug: 'baibu-cinema',
    num: '03',
    title: 'SDMT Cinema & Digital Media Society',
    glyphTitle: 'SDMT CINEMA\n& DIGITAL MEDIA',
    client: 'BAIBÜ Cinema & Digital Media Society',
    role: 'Brand Designer & Full-Stack Developer',
    subtitle: 'Brand Identity, Public Website & Club Management Panel',
    summary:
      'A full identity, a cinematic public site and a role-based management panel that runs the club day to day — events and tickets, a cash ledger, applications, films and the team, all in one place.',
    link: 'https://baibusdmt.vercel.app/',
    icon: 'eye',
    preview: {
      src: '/assets/projects/sdmt-preview.webp',
      alt: 'Homepage of the SDMT website, with the headline "Film çekiyoruz" over a purple backdrop',
    },
    gallery: [
      {
        src: '/assets/projects/sdmt-badge.webp',
        alt: 'SDMT badge: a periwinkle camera aperture closing around an eye, ringed by the club name and "BAİBU . 2023"',
        bg: '#15162A',
        caption: 'Primary badge',
      },
      {
        src: '/assets/projects/sdmt-lockup.webp',
        alt: 'SDMT horizontal lockup: the aperture eye beside the SDMT wordmark, with the full club name beneath',
        bg: '#FDFFFC',
        caption: 'Horizontal lockup',
      },
      {
        src: '/assets/projects/sdmt-badge-mono.webp',
        alt: 'SDMT badge in single dark ink on a periwinkle background',
        bg: '#92A2D3',
        caption: 'Single ink on periwinkle',
      },
    ],
    guide: {
      href: '/work/sdmt-brand-identity.html',
      sheets: [
        {
          src: '/assets/projects/sdmt-sheet-mark.webp',
          alt: 'Brand guide sheet S-101: the SDMT badge explained as a ring of type, a seven-blade iris and an eye, with lockup, wordmark and app icon variants',
          caption: 'S-101 · The mark & lockups',
        },
        {
          src: '/assets/projects/sdmt-sheet-colour.webp',
          alt: 'Brand guide sheet S-201: the nine-colour palette of ink, screen white, periwinkle and dusk indigo, with proportions, contrast ratings and band order',
          caption: 'S-201 · Colour',
        },
        {
          src: '/assets/projects/sdmt-sheet-applications.webp',
          alt: 'Brand guide sheet S-701: the identity applied to the website, a lanyard badge, social post, story, reels cover and event ticket',
          caption: 'S-701 · Applications',
        },
      ],
    },
    walkthrough: {
      href: '/pages/baibu-cinema/panel/',
      title: 'Inside the panel',
      blurb: 'Follow one film night through the management panel, from the first draft to the QR scan at the door, on the real interface with demo data.',
      image: {
        src: '/assets/projects/sdmt-panel/dashboard.webp',
        alt: 'The SDMT panel overview with cash balance, payments waiting, new applications and the next event',
      },
    },
    deliverables: [
      'Brand Identity Guidelines',
      'Public Website',
      'Management Panel',
      'Event Ticketing & QR Check-In',
      'Role-Based Access & 2FA',
      'Printable ID Badges',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'The cinema and campus media club had a passionate core group of students, but no cohesive identity and no shared way of working. Events, payments, applications and team tasks lived in group chats and spreadsheets, so every screening night depended on a few people remembering everything — and the wider student body rarely heard about any of it.',
      },
      {
        heading: 'The Identity',
        body: 'I designed the brand from the mark up: an aperture closing around an eye, a periwinkle-and-ink palette and a full guidelines booklet covering lockups, colour, type and applications — from social posts and reels covers to lanyard badges and event tickets. Print-ready ID badges came out of the same system, so the club looks like one team on screen and in person.',
      },
      {
        heading: 'The Website',
        body: 'The public site carries the identity into motion: cinematic scroll effects, event pages with online registration, a page for the club\'s short films with full credits, the charter and a join form. Every public form is validated on the server, rate-limited and protected against bots, and the motion switches off for visitors who prefer reduced motion.',
      },
      {
        heading: 'The Management Panel',
        body: 'Behind the site sits a private panel that runs the club. The team publishes announcements, assigns tasks and manages events and drafts; registrations get a personal ticket page with a QR code, and at the door a phone camera scans tickets for check-in. A cash ledger tracks every payment and exports to CSV, applications can be reviewed and replied to straight from the panel, and the films, credits and team roster all update the public site without touching code.',
      },
      {
        heading: 'Built to Be Trusted',
        body: 'Three roles — member, management and the executive board — each see only what they need, and the rules are enforced in the database itself rather than just hidden in the interface. Accounts are invite-only with two-factor sign-in, the cash ledger can\'t be edited or deleted (mistakes are voided, not erased), every action is recorded in an audit log, and payment details only ever appear on a registrant\'s private ticket page. An automated test suite tries to break these rules every time the database changes.',
      },
      {
        heading: 'Results',
        body: 'The club now runs from one place instead of a dozen chats: new members apply and get answers online, event nights check in at the door in seconds, and the money is always accounted for. The identity turned a campus club into a recognisable media hub — and the panel means the next committee inherits a working system, not a pile of spreadsheets.',
      },
    ],
  },
  {
    slug: 'key-leaves',
    num: '04',
    title: 'Key Leaves',
    glyphTitle: 'KEY LEAVES',
    client: 'Key Leaves',
    role: 'Shopify Developer, UX Designer & Email Marketer',
    subtitle: 'Shopify Storefront Rebuild & Klaviyo Email Program',
    summary:
      'A rebuilt Shopify storefront and email program for a saxophone and woodwind care brand: shop by instrument or by problem, clearer product pages and ten automated Klaviyo flows. In the first 92 days, sales rose 21% and orders 24%.',
    link: 'https://keyleaves.com/',
    icon: 'bolt',
    preview: {
      src: '/assets/projects/key-leaves/home.webp',
      alt: 'Key Leaves homepage with green "Explore Solutions" and "All Instruments" cards beside illustrated saxophone tiles and a row of instrument icons',
    },
    stats: [
      { value: '+21%', label: 'Total sales', note: '92 days vs the 92 before' },
      { value: '+24%', label: 'Orders', note: '92 days vs the 92 before' },
      { value: '+47%', label: 'Shoppers reaching checkout', note: '92 days vs the 92 before' },
      { value: '+282%', label: 'Email-attributed revenue', note: 'Last 30 days vs the 30 before' },
    ],
    screens: [
      {
        src: '/assets/projects/key-leaves/collection.webp',
        alt: 'Key Leaves saxophone collection page with a filter sidebar for instrument type, alto, tenor, soprano and bari, and solution, beside product cards with add-to-cart buttons',
        caption: 'Shop by instrument, down to alto, tenor, soprano or bari',
        path: 'collections/saxophone',
      },
      {
        src: '/assets/projects/key-leaves/product.webp',
        alt: 'RULON Saxophone Thumb Rest product page with a photo gallery, price, finish options as pill buttons and an add-to-cart button',
        caption: 'Product pages built from reusable, metafield-driven sections',
        path: 'products/rulon-ergonomic-saxophone-thumb-hook-rest',
      },
    ],
    footnote:
      'Sources: Shopify Analytics and the Klaviyo dashboard, figures pulled 28 Oct 2026. Measured period 28 Jul – 27 Oct 2026, against 27 Apr – 27 Jul 2026. The measured period includes back-to-school, so part of the lift is seasonal.',
    deliverables: [
      'Shopify Theme Development',
      'UX & Conversion Design',
      'Collection Filtering',
      'Klaviyo Email Flows',
      'Analytics & UTM Tracking',
      'No-Code Editable Sections',
    ],
    sections: [
      {
        heading: 'The Brief',
        body: 'Key Leaves makes saxophone and woodwind care products, from key props and the RULON thumb rest to the Barinana bari sax cleaner, for players from first-year students to touring professionals. On 28 July 2026 Cheerio Studios took over the Shopify storefront and the email program, with one job: help each player find the right gear for their instrument and their problem and make email a real sales channel.',
      },
      {
        heading: 'The Storefront',
        body: 'Between 31 August and 9 October we shipped more than 120 theme changes. Shoppers can now browse by instrument (alto, tenor, soprano, bari and more) or by the problem they want solved, with filters that live in shareable URLs and a drawer on phones. Product cards and product pages were rebuilt around tabbed, metafield-driven content, with a sticky add-to-cart bar and add to cart that never leaves the page. A new homepage, a reviews and awards page, a field-test proof page, an artist directory, a teachers page and a dealer locator give hesitant buyers reasons to trust the brand.',
      },
      {
        heading: 'A System the Client Can Run',
        body: 'Everything sits on one shared stylesheet and type system, and the new sections are reusable blocks the Key Leaves team can edit in Shopify without touching code. B2B application, contact, 404 and blog templates came out of the same system, so new pages look like the rest of the store from day one.',
      },
      {
        heading: 'Email That Earns',
        body: 'We restyled the newsletter sign-up to match the site and fixed its mobile layout, then put ten Klaviyo flows live: welcome, abandoned cart and checkout, browse abandonment, product cross-sells and sunset flows that clean out subscribers who never engage, which protects deliverability. UTM tagging on every campaign now makes email revenue visible in Google Analytics. In the latest 30 days, email-attributed revenue rose 282% and welcome-series revenue 330%.',
      },
      {
        heading: 'Results',
        body: 'Over the first 92 days, total sales rose 21% and orders 24% against the 92 days before. More shoppers add to cart (+32%) and more of them carry on to checkout (+47%), lifting the cart-to-checkout rate from 65% to 73%. The trend is still climbing: in the 28 days after the redesigned pages went live, net sales rose 29% and average order value 49%. Reported sessions also jumped, but part of that is bot traffic and a change in how Shopify counts visits, so we judge success by orders, revenue and the cart funnel.',
      },
    ],
  },
];
