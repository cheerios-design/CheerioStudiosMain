import type { Metadata } from 'next';
import CaseStudy from '@/components/CaseStudy';

export const metadata: Metadata = {
  title: 'Elite Exteriors — Cheerio Studios',
};

export default function Page() {
  return <CaseStudy slug="elite-exteriors" />;
}