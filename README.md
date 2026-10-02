# Cheerio Studios Website

Source for [www.cheeriostudios.com](https://www.cheeriostudios.com), the studio site for Cheerio Studios.

Built with Next.js 16 (static export), Tailwind CSS 4 and Framer Motion, and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```

## Where things live

- `src/lib/site.ts` — all site content: services, case studies, contact links, booking URL
- `src/components/sections/` — homepage sections
- `src/components/CaseStudy.tsx` — shared case-study template; pages live in `src/app/pages/<slug>/`
- `src/components/glyph/` and `src/lib/glyph/` — the pixel-glyph type and icon system
- `src/app/privacy/` — privacy policy
- `public/brand/`, `public/favicons/` — brand assets

## Adding a case study

1. Add an entry to `PROJECTS` in `src/lib/site.ts`.
2. Copy an existing folder in `src/app/pages/` and change the slug.

The sitemap, metadata and structured data pick it up automatically.
