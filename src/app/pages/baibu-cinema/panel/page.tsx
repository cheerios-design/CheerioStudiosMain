import type { Metadata } from 'next';
import PanelWalkthrough from '@/components/PanelWalkthrough';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';

const title = 'Inside the SDMT Panel';
const description =
  'A scroll-through story of the management panel Cheerio Studios built for the SDMT cinema club: events and QR tickets, a cash ledger that can’t be edited, applications, roles, two-step sign-in and an audit log.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pages/baibu-cinema/panel/' },
  openGraph: {
    type: 'article',
    url: '/pages/baibu-cinema/panel/',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: `${title} — ${SITE_NAME}`,
    description,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: `${title} — ${SITE_NAME}`, description, images: [OG_IMAGE] },
};

export default function Page() {
  return <PanelWalkthrough />;
}
