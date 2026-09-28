// Turns a text grid ('#' = filled) into fused, smooth SVG shapes.
// Filled cells round only their fully exposed corners; empty cells get concave
// fillets where two filled neighbours meet, so adjacent cells melt together.

export type Rows = readonly string[];

export type Cell = {
  x: number;
  y: number;
  filled: boolean;
  /** Fused outline of the cell (or a fully rounded cell when empty) */
  body: string;
  /** Same cell as a free-standing dot (fully rounded) */
  dot: string;
  /** Concave fillets living in this (empty) cell's corners */
  fillet: string;
  hasFillet: boolean;
};

const f = (n: number) => +n.toFixed(3);

function bodyPath(x: number, y: number, tl: number, tr: number, br: number, bl: number) {
  return [
    `M${f(x + tl)} ${y}`,
    `H${f(x + 1 - tr)}`,
    `A${f(tr)} ${f(tr)} 0 0 1 ${x + 1} ${f(y + tr)}`,
    `V${f(y + 1 - br)}`,
    `A${f(br)} ${f(br)} 0 0 1 ${f(x + 1 - br)} ${y + 1}`,
    `H${f(x + bl)}`,
    `A${f(bl)} ${f(bl)} 0 0 1 ${x} ${f(y + 1 - bl)}`,
    `V${f(y + tl)}`,
    `A${f(tl)} ${f(tl)} 0 0 1 ${f(x + tl)} ${y}Z`,
  ].join('');
}

function filletPath(x: number, y: number, tl: number, tr: number, br: number, bl: number) {
  return [
    `M${x} ${y}H${f(x + tl)}A${f(tl)} ${f(tl)} 0 0 0 ${x} ${f(y + tl)}Z`,
    `M${x + 1} ${y}V${f(y + tr)}A${f(tr)} ${f(tr)} 0 0 0 ${f(x + 1 - tr)} ${y}Z`,
    `M${x + 1} ${y + 1}H${f(x + 1 - br)}A${f(br)} ${f(br)} 0 0 0 ${x + 1} ${f(y + 1 - br)}Z`,
    `M${x} ${y + 1}V${f(y + 1 - bl)}A${f(bl)} ${f(bl)} 0 0 0 ${f(x + bl)} ${y + 1}Z`,
  ].join('');
}

/**
 * @param rows  grid rows, '#' = filled
 * @param r     corner radius as a fraction of a cell (0–0.5)
 * @param ox,oy offset of the grid inside the parent viewBox
 */
export function buildCells(rows: Rows, r: number, ox = 0, oy = 0): Cell[] {
  const on = (row: number, col: number) => rows[row]?.[col] === '#';
  const round = (a: boolean, b: boolean, diag: boolean) => (!a && !b && !diag ? r : 0);
  const cells: Cell[] = [];

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const up = on(row - 1, col);
      const down = on(row + 1, col);
      const left = on(row, col - 1);
      const right = on(row, col + 1);
      const filled = on(row, col);
      const x = col + ox;
      const y = row + oy;

      const dot = bodyPath(x, y, r, r, r, r);
      const body = filled
        ? bodyPath(
            x,
            y,
            round(up, left, on(row - 1, col - 1)),
            round(up, right, on(row - 1, col + 1)),
            round(down, right, on(row + 1, col + 1)),
            round(down, left, on(row + 1, col - 1))
          )
        : dot;

      const c = [up && left, up && right, down && right, down && left].map((v) => (!filled && v ? r : 0));

      cells.push({
        x,
        y,
        filled,
        body,
        dot,
        fillet: filletPath(x, y, c[0], c[1], c[2], c[3]),
        hasFillet: c.some(Boolean),
      });
    }
  }
  return cells;
}

/** Cheap deterministic 0–1 noise, so staggered animations feel organic but stay stable */
export function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
