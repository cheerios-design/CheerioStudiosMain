import type { Metadata } from 'next';
import Sprint from '@/components/Sprint';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';
import { SPRINT, SPRINT_SUMMARY } from '@/lib/sprint';

const title = `${SPRINT.name} — a SaaS landing page in ${SPRINT.days} days`;

export const metadata: Metadata = {
  title,
  description: SPRINT_SUMMARY,
  alternates: { canonical: '/sprint/' },
  openGraph: {
    type: 'website',
    url: '/sprint/',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: `${title} — ${SITE_NAME}`,
    description: SPRINT_SUMMARY,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} — ${SITE_NAME}`,
    description: SPRINT_SUMMARY,
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <Sprint />;
}
