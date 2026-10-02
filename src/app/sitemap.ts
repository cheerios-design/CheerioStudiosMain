import type { MetadataRoute } from 'next';
import { PROJECTS, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/pages/${p.slug}/`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/privacy/`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
