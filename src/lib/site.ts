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
    role: 'Visual Storyteller & Brand Designer',
    subtitle: 'Creative Brand Storytelling & Multichannel Publishing',
    summary:
      'Brand guidelines, review writing and design-led updates that turned a campus club into a thriving media hub.',
    link: 'https://baibusdmt.vercel.app/',
    icon: 'eye',
    preview: {
      src: '/assets/projects/sdmt-preview.webp',
      alt: 'Homepage of the SDMT website, with the headline "Film çekiyoruz" over a purple backdrop',
    },
    deliverables: [
      'Brand Identity Guidelines',
      'Cohesive Layout Design',
      'Cinema Review Writing',
      'Visual Standards',
      'Multichannel Publishing',
      'Student Engagement',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'The cinema and campus media club had a passionate core group of students, but struggled to share its excitement with the wider university student body. It lacked a cohesive visual identity and a clear layout strategy, making it difficult to spread awareness about events, reviews, and film screening schedules.',
      },
      {
        heading: 'The Strategy',
        body: 'I developed a brand identity guidelines booklet that captured the artistic, community-driven spirit of the club. I coordinated closely with our design team to design visual templates and layout assets for campus posters and social graphics. I then wrote engaging film reviews, student-centered articles, and promotional campaigns to establish a friendly, conversational brand voice.',
      },
      {
        heading: 'Execution & Results',
        body: 'The new brand identity and coordinated layouts transformed the club into a prominent campus media entity. Engagement and student discussions on social channels grew significantly. Attracting new members became easy, and the club event nights became highly-attended social hubs, fostering student connection and community on campus.',
      },
    ],
  },
];
