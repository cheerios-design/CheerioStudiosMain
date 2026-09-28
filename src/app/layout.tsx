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
  manifest: '/favicons/manifest.json',
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/favicons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/favicons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/favicons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/favicons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/favicons/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicons/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'msapplication-TileColor': '#0C0D0A',
    'msapplication-TileImage': '/favicons/ms-icon-144x144.png',
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
