"""Cheerio Studios brand kit generator.
Every shape comes from the website source: the S mark paths (CheerioLogo.tsx),
the glyph typeface (lib/glyph/font.ts), glyph icons (lib/glyph/icons.ts) and the
fused-cell geometry (lib/glyph/geometry.ts). Text is converted to outlines so
the SVGs need no installed fonts.
"""
import json, os, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = 'out'
INK, INK2, INK3 = '#0C0D0A', '#151712', '#22251D'
LIME, LIMEDIM = '#D4FF1F', '#A8CC12'
PAPER, MUTE = '#EFF2E8', '#8D937F'

# ── S mark (viewBox 0 0 500 500, bbox x 22.1–477.9, y 13.6–486.4) ──────────────
MARK = [
 'M372.385,355.793c0,13.989 -11.67,25.33 -26.066,25.33l-194.824,0c-5.287,0 -9.58,4.172 -9.58,9.31l0,86.649c0,5.138 4.293,9.31 9.58,9.31l234.752,0c5.287,0 9.58,-4.172 9.58,-9.31l0,-17.31c0,-13.989 11.67,-25.33 26.066,-25.33l47.096,0c4.894,0 8.867,-3.861 8.867,-8.616l0,-229.512c0,-4.755 -3.973,-8.616 -8.867,-8.616l-47.096,0c-14.396,-0 -26.066,-11.341 -26.066,-25.33l0,-18.448c0,-5.593 -4.673,-10.133 -10.428,-10.133l-233.057,0c-5.755,0 -10.428,4.541 -10.428,10.133l0,88.296c0,5.593 4.673,10.133 10.428,10.133l193.976,0c14.396,-0 26.066,11.341 26.066,25.33l0,88.116Z',
 'M127.615,144.207c-0,-13.989 11.67,-25.33 26.066,-25.33l194.824,0c5.287,0 9.58,-4.172 9.58,-9.31l0,-86.649c0,-5.138 -4.293,-9.31 -9.58,-9.31l-234.752,0c-5.287,0 -9.58,4.172 -9.58,9.31l0,17.31c-0,13.989 -11.67,25.33 -26.066,25.33l-47.096,0c-4.894,0 -8.867,3.861 -8.867,8.616l0,229.512c0,4.755 3.973,8.616 8.867,8.616l47.096,0c14.396,0 26.066,11.341 26.066,25.33l0,18.448c0,5.593 4.673,10.133 10.428,10.133l233.057,0c5.755,0 10.428,-4.541 10.428,-10.133l0,-88.296c0,-5.593 -4.673,-10.133 -10.428,-10.133l-193.976,0c-14.396,0 -26.066,-11.341 -26.066,-25.33l0,-88.116Z',
]
MBX, MBY, MBW, MBH = 22.144, 13.608, 455.712, 472.784

def mark(cx, cy, h, color):
    """S mark centred at (cx, cy) with height h."""
    s = h / MBH
    tx = cx - (MBX + MBW / 2) * s
    ty = cy - (MBY + MBH / 2) * s
    return f'<g transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f})" fill="{color}">' + ''.join(f'<path d="{d}"/>' for d in MARK) + '</g>'

# ── glyph geometry (port of geometry.ts) ──────────────────────────────────────
def f(n): return f'{round(n, 3):g}'

def body_path(x, y, tl, tr, br, bl):
    return (f'M{f(x+tl)} {f(y)}H{f(x+1-tr)}A{f(tr)} {f(tr)} 0 0 1 {f(x+1)} {f(y+tr)}'
            f'V{f(y+1-br)}A{f(br)} {f(br)} 0 0 1 {f(x+1-br)} {f(y+1)}'
            f'H{f(x+bl)}A{f(bl)} {f(bl)} 0 0 1 {f(x)} {f(y+1-bl)}'
            f'V{f(y+tl)}A{f(tl)} {f(tl)} 0 0 1 {f(x+tl)} {f(y)}Z')

def fillet_path(x, y, tl, tr, br, bl):
    out = ''
    if tl: out += f'M{f(x)} {f(y)}H{f(x+tl)}A{f(tl)} {f(tl)} 0 0 0 {f(x)} {f(y+tl)}Z'
    if tr: out += f'M{f(x+1)} {f(y)}V{f(y+tr)}A{f(tr)} {f(tr)} 0 0 0 {f(x+1-tr)} {f(y)}Z'
    if br: out += f'M{f(x+1)} {f(y+1)}H{f(x+1-br)}A{f(br)} {f(br)} 0 0 0 {f(x+1)} {f(y+1-br)}Z'
    if bl: out += f'M{f(x)} {f(y+1)}V{f(y+1-bl)}A{f(bl)} {f(bl)} 0 0 0 {f(x+bl)} {f(y+1)}Z'
    return out

def cells_path(rows, r, ox=0, oy=0):
    on = lambda R, C: 0 <= R < len(rows) and 0 <= C < len(rows[R]) and rows[R][C] == '#'
    rnd = lambda a, b, d: r if (not a and not b and not d) else 0
    d = ''
    for R in range(len(rows)):
        for C in range(len(rows[R])):
            up, dn, lf, rt = on(R-1, C), on(R+1, C), on(R, C-1), on(R, C+1)
            x, y = C + ox, R + oy
            if on(R, C):
                d += body_path(x, y, rnd(up, lf, on(R-1, C-1)), rnd(up, rt, on(R-1, C+1)),
                               rnd(dn, rt, on(R+1, C+1)), rnd(dn, lf, on(R+1, C-1)))
            else:
                c = [r if v else 0 for v in (up and lf, up and rt, dn and rt, dn and lf)]
                if any(c): d += fillet_path(x, y, *c)
    return d

FONT = {
 'A': ['.###.', '#...#', '#####', '#...#', '#...#'], 'B': ['####.', '#...#', '####.', '#...#', '####.'],
 'C': ['.####', '#....', '#....', '#....', '.####'], 'D': ['####.', '#...#', '#...#', '#...#', '####.'],
 'E': ['#####', '#....', '####.', '#....', '#####'], 'F': ['#####', '#....', '####.', '#....', '#....'],
 'G': ['.####', '#....', '#..##', '#...#', '.####'], 'H': ['#...#', '#...#', '#####', '#...#', '#...#'],
 'I': ['###', '.#.', '.#.', '.#.', '###'], 'J': ['....#', '....#', '....#', '#...#', '.###.'],
 'K': ['#...#', '#..#.', '###..', '#..#.', '#...#'], 'L': ['#....', '#....', '#....', '#....', '#####'],
 'M': ['#...#', '##.##', '#.#.#', '#...#', '#...#'], 'N': ['#...#', '##..#', '#.#.#', '#..##', '#...#'],
 'O': ['.###.', '#...#', '#...#', '#...#', '.###.'], 'P': ['####.', '#...#', '####.', '#....', '#....'],
 'Q': ['.###.', '#...#', '#...#', '#..#.', '.##.#'], 'R': ['####.', '#...#', '####.', '#..#.', '#...#'],
 'S': ['.####', '#....', '.###.', '....#', '####.'], 'T': ['#####', '..#..', '..#..', '..#..', '..#..'],
 'U': ['#...#', '#...#', '#...#', '#...#', '.###.'], 'V': ['#...#', '#...#', '#...#', '.#.#.', '..#..'],
 'W': ['#...#', '#...#', '#.#.#', '##.##', '#...#'], 'X': ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
 'Y': ['#...#', '.#.#.', '..#..', '..#..', '..#..'], 'Z': ['#####', '...#.', '..#..', '.#...', '#####'],
 ' ': ['...', '...', '...', '...', '...'], '.': ['.', '.', '.', '.', '#'], "'": ['#', '#', '.', '.', '.'],
 '-': ['...', '...', '###', '...', '...'], '&': ['.##..', '#..#.', '.##.#', '#..#.', '.##.#'],
 '0': ['.###.', '#...#', '#...#', '#...#', '.###.'], '1': ['..#..', '.##..', '..#..', '..#..', '.###.'],
 '2': ['.###.', '#...#', '..##.', '.#...', '#####'], '3': ['.###.', '#...#', '..##.', '#...#', '.###.'],
 '4': ['..#.#', '.#..#', '#...#', '#####', '....#'],
}
ICONS = {
 'sparkle': ['...#...', '...#...', '..###..', '###.###', '..###..', '...#...', '...#...'],
 'smiley': ['.#####.', '#######', '##.#.##', '#######', '#.###.#', '##...##', '.#####.'],
 'heart': ['.......', '.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
 'arrowRight': ['.......', '...#...', '...##..', '#######', '...##..', '...#...', '.......'],
 'eye': ['.......', '..###..', '.#####.', '###.###', '.#####.', '..###..', '.......'],
 'grid': ['###.###', '###.###', '###.###', '.......', '###.###', '###.###', '###.###'],
 'steps': ['......#', '.....##', '....###', '...####', '..#####', '.######', '#######'],
 'flower': ['.##.##.', '#######', '.##.##.', '...#...', '.##.##.', '#######', '.##.##.'],
 'target': ['..###..', '.#...#.', '#..#..#', '#.###.#', '#..#..#', '.#...#.', '..###..'],
 'browser': ['#######', '#######', '#.....#', '#.....#', '#.....#', '#.....#', '#######'],
}
SEAM = 0.07

def glyph_text(text, tracking=1, leading=2, r=0.5, align='left'):
    """Returns (path_d, width, height) in cell units."""
    lines = [list(l) for l in text.upper().split('\n')]
    widths = [sum(len(FONT[c][0]) for c in l) + max(0, len(l)-1)*tracking for l in lines]
    W = max(widths); d = ''; y = 0
    for l, lw in zip(lines, widths):
        x = 0 if align == 'left' else (W - lw) / 2 if align == 'center' else W - lw
        for c in l:
            d += cells_path(FONT[c], r, x, y); x += len(FONT[c][0]) + tracking
        y += 5 + leading
    return d, W, y - leading

def glyph(text, x, y, cap, color, **kw):
    """Glyph text with top-left at (x,y), cap height `cap` px. Returns (svg, w, h)."""
    d, W, H = glyph_text(text, **kw)
    s = cap / 5
    return (f'<path transform="translate({x:.2f} {y:.2f}) scale({s:.4f})" d="{d}" fill="{color}" '
            f'stroke="{color}" stroke-width="{SEAM}"/>', W*s, H*s)

def icon(name, cx, cy, size, color, r=0.42):
    s = size / 7
    return (f'<path transform="translate({cx-size/2:.2f} {cy-size/2:.2f}) scale({s:.4f})" '
            f'd="{cells_path(ICONS[name], r)}" fill="{color}" stroke="{color}" stroke-width="{SEAM}"/>')

# ── outlined text from real font files ────────────────────────────────────────
_fonts = {}
def font(name):
    if name not in _fonts: _fonts[name] = TTFont(f'fonts/{name}.ttf')
    return _fonts[name]

def text(s, x, y, size, color, face='space-grotesk-700-normal', track=0.0, anchor='start', upper=False):
    """Baseline at y. track in em. Returns (svg, width)."""
    if upper: s = s.upper()
    ft = font(face); gs = ft.getGlyphSet(); cmap = ft.getBestCmap(); upm = ft['head'].unitsPerEm
    hmtx = ft['hmtx']; k = size / upm
    names = [cmap.get(ord(c), '.notdef') for c in s]
    adv = [hmtx[n][0]*k + track*size for n in names]
    width = sum(adv) - (track*size if names else 0)
    x0 = x - width if anchor == 'end' else x - width/2 if anchor == 'middle' else x
    d = ''; cx = x0
    for n, a in zip(names, adv):
        pen = SVGPathPen(gs)
        gs[n].draw(TransformPen(pen, (k, 0, 0, -k, cx, y)))
        d += pen.getCommands(); cx += a
    return f'<path d="{d}" fill="{color}"/>', width

def dotgrid(w, h, step, rad, color='#EFF2E8', op=0.07):
    return (f'<defs><pattern id="dots" width="{step}" height="{step}" patternUnits="userSpaceOnUse" '
            f'x="{(w % step)/2}" y="{(h % step)/2}"><circle cx="{step/2}" cy="{step/2}" r="{rad}" '
            f'fill="{color}" fill-opacity="{op}"/></pattern></defs><rect width="{w}" height="{h}" fill="url(#dots)"/>')

def svg(w, h, body, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{b}{body}</svg>'

ASSETS = []  # (relpath_svg, [png sizes as (w,h,suffix)])
def save(rel, content, pngs=()):
    p = os.path.join(OUT, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(content); ASSETS.append({'svg': rel, 'png': list(pngs)})

# ═════════════════════════ LOGOS ═════════════════════════════════════════════
COLORWAYS = {'lime': LIME, 'paper': PAPER, 'ink': INK}

# 1. Mark (tight box, 1000 tall)
for cw, col in COLORWAYS.items():
    w = 1000 * MBW / MBH
    save(f'logos/svg/cheerio-mark-{cw}.svg', svg(round(w), 1000, mark(w/2, 500, 1000, col)),
         [(round(w*2.048), 2048, '')])
    # with SM service-mark superscript (as in the Affinity master)
    sm, smw = text('SM', 0, 0, 1, col)
    W = w + 200
    t, _ = text('SM', w + 30, 130, 120, col)
    save(f'logos/svg/cheerio-mark-sm-{cw}.svg', svg(round(W), 1000, mark(w/2, 500, 1000, col) + t),
         [(round(W*2.048), 2048, '')])

# 2. Glyph wordmark CHEERIO (as in the site footer)
for cw, col in COLORWAYS.items():
    g, gw, gh = glyph('CHEERIO', 0, 0, 200, col)
    save(f'logos/svg/cheerio-wordmark-{cw}.svg', svg(round(gw), round(gh), g), [(round(gw*2), round(gh*2), '')])

# 3. Horizontal lockup: mark + CHEERIO STUDIOS (as in the site/case-study header)
def lockup_h(mark_col, text_col):
    H = 200
    mw = H * MBW / MBH
    lab, lw = text('Cheerio Studios', mw + 70, H/2 + 0.36*96, 96, text_col, track=0.06, upper=True)
    W = mw + 70 + lw
    return svg(round(W), H, mark(mw/2, H/2, H, mark_col) + lab), W, H
for name, (mc, tc) in {'on-dark': (LIME, PAPER), 'on-light': (INK, INK), 'on-lime': (INK, INK)}.items():
    s, W, H = lockup_h(mc, tc)
    save(f'logos/svg/cheerio-lockup-horizontal-{name}.svg', s, [(round(W*4), H*4, '')])

# 4. Stacked lockup: mark over glyph wordmark, "Studios" label
def lockup_v(mark_col, word_col, lab_col):
    g, gw, gh = glyph('CHEERIO', 0, 0, 120, word_col)
    W = gw; mh = 360
    body = mark(W/2, mh/2, mh, mark_col)
    body += f'<g transform="translate(0 {mh+90})">{g}</g>'
    lab, _ = text('Studios', W/2, mh + 90 + gh + 80, 54, lab_col, track=0.35, anchor='middle', upper=True)
    H = mh + 90 + gh + 96
    return svg(round(W), round(H), body + lab), W, H
for name, cols in {'on-dark': (LIME, PAPER, MUTE), 'on-light': (INK, INK, '#4A4D44'), 'on-lime': (INK, INK, INK)}.items():
    s, W, H = lockup_v(*cols)
    save(f'logos/svg/cheerio-lockup-stacked-{name}.svg', s, [(round(W*2), round(H*2), '')])

# ═════════════════════════ PROFILE PICTURES ══════════════════════════════════
# Circle-safe: mark height 50% of the square, centred → fits inside the circle crop
def avatar(bg, fg):
    return svg(1080, 1080, mark(540, 540, 560, fg), bg)
save('social/avatar/cheerio-avatar-primary.svg', avatar(INK, LIME),
     [(1080, 1080, '-1080'), (720, 720, '-720'), (400, 400, '-400'), (180, 180, '-180')])
save('social/avatar/cheerio-avatar-inverse.svg', avatar(LIME, INK), [(1080, 1080, '-1080'), (400, 400, '-400')])

# ═════════════════════════ INSTAGRAM HIGHLIGHT COVERS ════════════════════════
HL = [('work', 'browser'), ('services', 'grid'), ('process', 'steps'), ('studio', 'smiley'),
      ('reviews', 'heart'), ('contact', 'arrowRight')]
for name, ic in HL:
    body = icon(ic, 540, 960, 470, LIME, r=0.34)
    save(f'social/instagram/highlight-{name}.svg', svg(1080, 1920, body, INK), [(1080, 1920, '')])

# ═════════════════════════ BANNERS ═══════════════════════════════════════════
def hero_stack(x, y, cap, gap, shift):
    """'WE BUILD / DIGITAL / PRESENCE' as on the site hero."""
    out = ''; yy = y; maxw = 0
    for i, (t, col, dx) in enumerate([('WE BUILD', PAPER, 0), ('DIGITAL', PAPER, shift), ('PRESENCE', LIME, 0)]):
        g, w, h = glyph(t, x + dx, yy, cap, col); out += g; yy += cap + gap; maxw = max(maxw, w + dx)
    return out, maxw, yy - gap - y

# OG / link preview 1200x630
def og(W, H):
    b = dotgrid(W, H, 22, 1.2)
    lab, _ = text('( 01 ) — Studio', 64, 92, 18, LIME, face='space-grotesk-500-normal', track=0.14, upper=True)
    b += lab + mark(W - 64 - 30, 80, 60, LIME)
    hs, hw, hh = hero_stack(64, 170, 78, 26, 70)
    b += hs
    note, _ = text('One voice. One visual. One studio.', 64, H - 60, 30, MUTE, face='instrument-serif-400-italic')
    url, _ = text('cheeriostudios.com', W - 64, H - 62, 20, PAPER, face='space-grotesk-500-normal', track=0.08, anchor='end', upper=True)
    return svg(W, H, b + note + url, INK)
save('web/og-image.svg', og(1200, 630), [(1200, 630, '-1200x630')])
save('web/github-social-preview.svg', og(1280, 640), [(1280, 640, '-1280x640')])

# Google Business Profile cover 16:9 — content kept in the centre (Google crops edges)
W, H = 2048, 1152
b = dotgrid(W, H, 44, 2.4)
hs, hw, hh = hero_stack(0, 0, 150, 52, 140)
b += f'<g transform="translate({(W-hw)/2:.1f} {(H-hh)/2 - 40:.1f})">{hs}</g>'
note, _ = text('One voice. One visual. One studio.', W/2, (H+hh)/2 + 70, 52, MUTE, face='instrument-serif-400-italic', anchor='middle')
save('social/google/gbp-cover.svg', svg(W, H, b + note, INK), [(2048, 1152, '-2048x1152'), (1024, 576, '-1024x576')])

# LinkedIn company cover 1128x191 (render @2x). Logo sits bottom-left, so content goes right.
W, H = 2256, 382
b = dotgrid(W, H, 22, 1.4)
g, gw, gh = glyph('WE BUILD DIGITAL PRESENCE', 0, 0, 66, PAPER)
b += f'<g transform="translate({W - 96 - gw:.1f} {H/2 - gh/2 - 30:.1f})">{g}</g>'
lab, _ = text('One voice. One visual. One studio.', W - 96, H/2 + 92, 50, LIME, face='instrument-serif-400-italic', anchor='end')
save('social/linkedin/linkedin-company-cover.svg', svg(W, H, b + lab, INK), [(2256, 382, '-2256x382'), (1128, 191, '-1128x191')])

# LinkedIn personal banner 1584x396 (render @2x). Profile photo covers bottom-left.
W, H = 3168, 792
b = dotgrid(W, H, 30, 1.8)
hs, hw, hh = hero_stack(0, 0, 112, 36, 104)
b += f'<g transform="translate({W - 160 - hw:.1f} {(H-hh)/2:.1f})">{hs}</g>'
lab, _ = text('Founder, Cheerio Studios', 760, H/2 - 6, 44, LIME, face='space-grotesk-500-normal', track=0.14, upper=True)
url, _ = text('cheeriostudios.com', 760, H/2 + 64, 40, MUTE, face='space-grotesk-500-normal', track=0.08, upper=True)
save('social/linkedin/linkedin-personal-banner.svg', svg(W, H, b + lab + url, INK), [(3168, 792, '-3168x792'), (1584, 396, '-1584x396')])

# Email signature lockup (ink tile, works in light and dark mail clients)
W, H = 1200, 240
b = f'<rect width="{W}" height="{H}" rx="40" fill="{INK}"/>' + mark(130, 120, 130, LIME)
t1, _ = text('Sam Daramroei', 250, 112, 52, PAPER, face='space-grotesk-700-normal')
t2, _ = text('Founder · Cheerio Studios', 250, 172, 30, LIME, face='space-grotesk-500-normal', track=0.12, upper=True)
save('web/email-signature.svg', svg(W, H, b + t1 + t2), [(600, 120, '-600x120'), (1200, 240, '-1200x240')])

# Website wallpaper (replaces the orange cheeriostudiosWP.png)
W, H = 1920, 1080
save('web/cheerio-wallpaper.svg', svg(W, H, dotgrid(W, H, 30, 1.8) + mark(W/2, H/2, 770, LIME), INK), [(1920, 1080, '-1920x1080')])

json.dump(ASSETS, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
print(len(ASSETS), 'svgs')
