import type { Metadata } from 'next';
import { OG_IMAGE, PROJECTS, SITE_NAME } from './site';

/** Per-page title, description, canonical URL and share card for a case study */
export function caseStudyMetadata(slug: string): Metadata {
  const project = PROJECTS.find((p) => p.slug === slug)!;
  const url = `/pages/${slug}/`;
  const title = `${project.title} — ${SITE_NAME}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      title,
      description: project.summary,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.summary,
      images: [OG_IMAGE],
    },
  };
}
