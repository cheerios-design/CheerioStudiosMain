import type { Metadata } from 'next';
import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page said cheerio. Head back to the studio, or draw a glyph while you are here.',
};

// Exported as 404.html, which GitHub Pages serves for any unknown URL
export default function Page() {
  return <NotFound />;
}
