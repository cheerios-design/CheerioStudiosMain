import type { Metadata } from 'next';
import CaseStudy from '@/components/CaseStudy';

export const metadata: Metadata = {
  title: 'BAIBÜ Cinema & DMS — Cheerio Studios',
};

export default function Page() {
  return <CaseStudy slug="baibu-cinema" />;
}