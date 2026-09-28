import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import GlyphCursor from '@/components/chrome/GlyphCursor';
import Menu from '@/components/chrome/Menu';
import { SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Cheerio Studios — Digital Creative Studio',
  description:
    'Cheerio Studios is a digital creative studio specializing in brand identity, web design & development, strategy & consulting, and digital asset management. We help businesses create and elevate their digital presence.',
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
    title: 'Cheerio Studios — Digital Creative Studio',
    description:
      'Cheerio Studios is a digital creative studio specializing in brand identity, web design & development, strategy & consulting, and digital asset management.',
    type: 'website',
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
  other: {
    'theme-color': '#0C0D0A',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>
          {children}
          <Menu />
          <GlyphCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
