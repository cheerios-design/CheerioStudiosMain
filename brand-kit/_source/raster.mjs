import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const OUT = 'out';
const assets = JSON.parse(fs.readFileSync(`${OUT}/manifest.json`, 'utf8'));
const made = [];
for (const a of assets) {
  const svg = fs.readFileSync(path.join(OUT, a.svg), 'utf8');
  for (const [w, h, suffix] of a.png) {
    const r = new Resvg(svg, { fitTo: { mode: 'width', value: w }, background: 'rgba(0,0,0,0)' });
    const png = r.render().asPng();
    const rel = a.svg.replace('/svg/', '/png/').replace('.svg', `${suffix}.png`);
    fs.mkdirSync(path.dirname(path.join(OUT, rel)), { recursive: true });
    fs.writeFileSync(path.join(OUT, rel), png);
    made.push(rel);
  }
}
fs.writeFileSync(`${OUT}/pngs.json`, JSON.stringify(made, null, 1));
console.log(made.length, 'pngs');
