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
  sections: { heading: string; body: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'elite-exteriors',
    num: '01',
    title: 'Elite Exteriors',
    glyphTitle: 'ELITE\nEXTERIORS',
    client: 'Elite Exteriors VA',
    role: 'Content Creator & Copywriter',
    subtitle: 'Purposeful Copywriting & Inbound Storytelling',
    summary:
      'Researched homeowner concerns and built an educational content system — search-optimised, empathetic articles that answer real questions and guide readers toward services.',
    link: 'https://www.elitexteriorsva.com/blog',
    icon: 'steps',
    deliverables: [
      'Inbound Blog Articles',
      'Editorial Planning',
      'Reader-Focused SEO',
      'Layout Coordination',
      'Conversion Copywriting',
      'Trust-Building Strategy',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Homeowners facing roofing issues often feel stressed and overwhelmed by options. The client needed helpful, trustworthy content that explained roofing and repair solutions clearly and empathetically, rather than aggressive advertising. The goal was to build a sustainable inbound channel that felt like a trusted advisor, rather than just another commercial company.',
      },
      {
        heading: 'The Strategy',
        body: 'Instead of posting generic marketing materials, I researched homeowner concerns and structured an educational content calendar of blog posts. I collaborated closely with our graphic designers and layout specialists to ensure that the final articles were visually structured and easy to read. Each article addressed real questions, incorporating SEO principles naturally so readers could easily find honest answers online.',
      },
      {
        heading: 'Execution & Results',
        body: 'By publishing search-optimized, reader-first blog posts, the site began capturing high-value traffic directly at the point of decision. Rather than simple traffic gains, the copy was designed with clear micro-conversion hooks (instant quote estimates, inspection scheduling blocks), successfully transforming passive organic searchers into qualified sales inquiries and building a relationship of trust with local homeowners.',
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
