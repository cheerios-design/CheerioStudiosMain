# Cheerio Studios — Brand Kit
Generated 2 Oct 2026 from the website source (CheerioLogo.tsx mark, lib/glyph font + icons, globals.css tokens).
Full guide with previews: the "Phase 1 — One Visual" artifact.

## Colours
Ink #0C0D0A · Ink-2 #151712 · Ink-3 #22251D · Lime #D4FF1F · Lime-dim #A8CC12 · Paper #EFF2E8 · Mute #8D937F
Retired: orange #FF4600 / #FF5722, cat mascot, blob mark.

## Type
Display: Space Grotesk 500/700 (uppercase labels, tracking 0.14em) · Body: Inter · Accent: Instrument Serif italic · Big type: Cheerio glyph typeface (site only / these files)

## Where each file goes
| Platform | File | Upload size |
|---|---|---|
| Instagram profile photo | social/avatar/cheerio-avatar-primary-1080.png | 1080×1080 |
| Instagram highlight covers | social/instagram/highlight-*.png | 1080×1920 |
| Google Business logo | social/avatar/cheerio-avatar-primary-720.png | 720×720 |
| Google Business cover | social/google/gbp-cover-2048x1152.png | 16:9 |
| LinkedIn company logo | social/avatar/cheerio-avatar-primary-400.png | 400×400 |
| LinkedIn company cover | social/linkedin/linkedin-company-cover-2256x382.png | 1128×191 @2x |
| LinkedIn personal banner (Sam) | social/linkedin/linkedin-personal-banner-3168x792.png | 1584×396 @2x |
| Behance / Dribbble / Clutch avatar | social/avatar/cheerio-avatar-primary-400.png | 400×400 |
| Website link previews (OG) | web/og-image-1200x630.png | 1200×630 |
| GitHub repo social preview | web/github-social-preview-1280x640.png | 1280×640 |
| Email signature | web/email-signature-600x120.png | 600×120 (1200×240 for retina) |
| Website wallpaper (replaces orange cheeriostudiosWP.png) | web/cheerio-wallpaper-1920x1080.png | 1920×1080 |

## Logo files (logos/svg + logos/png)
- cheerio-mark-{lime,paper,ink} — the S mark alone (avatars, favicons, small spaces)
- cheerio-mark-sm-* — with the SM service-mark (formal / large uses only)
- cheerio-wordmark-* — glyph "CHEERIO" (as in the site footer)
- cheerio-lockup-horizontal-{on-dark,on-light,on-lime} — mark + CHEERIO STUDIOS
- cheerio-lockup-stacked-{on-dark,on-light,on-lime} — mark over glyph wordmark

## Rules
1. Lime on ink is the default. Ink on lime is the inverse (one accent surface at a time).
2. Never place lime on white/paper — use the ink mark on light backgrounds.
3. Clear space around the mark = 25% of its height. Minimum size: 24px tall on screen.
4. Don't recolour, outline, add effects, stretch or rotate the mark.

## Regenerate
_source/gen.py (Python + fonttools) writes the SVGs; _source/raster.mjs (@resvg/resvg-js) renders PNGs.
