import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import GlyphCursor from '@/components/chrome/GlyphCursor';
import Menu from '@/components/chrome/Menu';
import { CONTACT_LINKS, EMAIL, SERVICES, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

export const viewport: Viewport = {
  themeColor: '#0C0D0A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Cheerio Studios — Digital Creative Studio',
    template: '%s — Cheerio Studios',
  },
  description: `${SITE_DESCRIPTION} We help businesses create and elevate their digital presence.`,
  applicationName: SITE_NAME,
  authors: [{ name: 'Sam Daramroei', url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
  keywords: [
    'Cheerio Studios',
    'digital studio',
    'brand identity',
    'web design',
    'web development',
    'strategy',
    'consulting',
    'digital presence',
    'creative agency',
  ],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: 'Cheerio Studios — Digital Creative Studio',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheerio Studios — Digital Creative Studio',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

/** Structured data so Google can show the studio name and logo in results */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-720.png`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description: SITE_DESCRIPTION,
      email: EMAIL,
      founder: {
        '@type': 'Person',
        name: 'Sam Daramroei',
        jobTitle: 'Founder',
        sameAs: ['https://www.linkedin.com/in/sam-daramroei/'],
      },
      knowsAbout: SERVICES.map((s) => s.title),
      sameAs: CONTACT_LINKS.filter((l) => l.url.startsWith('http')).map((l) => l.url),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${instrument.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <SmoothScroll>
          {children}
          <Menu />
          <GlyphCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
