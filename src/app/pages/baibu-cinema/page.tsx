import type { Metadata } from 'next';
import CaseStudy from '@/components/CaseStudy';

export const metadata: Metadata = {
  title: 'SDMT Cinema & Digital Media Society — Cheerio Studios',
};

export default function Page() {
  return <CaseStudy slug="baibu-cinema" />;
}