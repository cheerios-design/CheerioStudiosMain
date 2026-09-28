import type { Metadata } from 'next';
import CaseStudy from '@/components/CaseStudy';

export const metadata: Metadata = {
  title: 'Rising Generation — Cheerio Studios',
};

export default function Page() {
  return <CaseStudy slug="rising-generation" />;
}