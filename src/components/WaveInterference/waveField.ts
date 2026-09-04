/** Seeded PRNG (mulberry32) — deterministic geometry per seed. */
function makeRng(seed: number): () => number {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface WaveSourceDef {
  readonly baseX: number;
  readonly baseY: number;
  readonly driftAmpX: number;
  readonly driftAmpY: number;
  readonly driftPeriodX: number;
  readonly driftPeriodY: number;
  readonly driftPhaseX: number;
  readonly driftPhaseY: number;
  readonly wavelength: number;
  readonly omega: number;
  readonly phase0: number;
}

/** A resolved emitter at a moment in time, ready to feed into the amplitude field. */
export interface ActiveSource {
  readonly x: number;
  readonly y: number;
  readonly k: number;
  readonly omega: number;
  readonly phase0: number;
  readonly weight: number;
}

/** Generates 2-3 asymmetric emitters, some seated outside the canvas, with distinct rhythms. */
export function generateSources(width: number, height: number, seed: number, sourceCount: number): WaveSourceDef[] {
  const rng = makeRng(seed);
  const n = Math.max(2, Math.min(3, sourceCount));
  const sources: WaveSourceDef[] = [];

  for (let i = 0; i < n; i += 1) {
    const xRatio = -0.28 + rng() * 1.56;
    const yRatio = -0.28 + rng() * 1.56;
    sources.push({
      baseX: xRatio * width,
      baseY: yRatio * height,
      driftAmpX: 35 + rng() * 70,
      driftAmpY: 35 + rng() * 70,
      driftPeriodX: 30 + rng() * 30,
      driftPeriodY: 30 + rng() * 30,
      driftPhaseX: rng() * Math.PI * 2,
      driftPhaseY: rng() * Math.PI * 2,
      wavelength: 40 + rng() * 30,
      omega: 0.5 + rng() * 0.9,
      phase0: rng() * Math.PI * 2,
    });
  }

  const anyOutside = sources.some((s) => s.baseX < 0 || s.baseX > width || s.baseY < 0 || s.baseY > height);
  if (!anyOutside && sources.length > 0) {
    const s = sources[0]!;
    sources[0] = { ...s, baseX: rng() > 0.5 ? -0.2 * width : 1.2 * width };
  }

  return sources;
}

export function resolveSource(def: WaveSourceDef, elapsed: number, speed: number, weight = 1): ActiveSource {
  const x = def.baseX + Math.sin((elapsed * Math.PI * 2) / def.driftPeriodX + def.driftPhaseX) * def.driftAmpX;
  const y = def.baseY + Math.sin((elapsed * Math.PI * 2) / def.driftPeriodY + def.driftPhaseY) * def.driftAmpY;
  return {
    x,
    y,
    k: (Math.PI * 2) / def.wavelength,
    omega: def.omega * speed,
    phase0: def.phase0,
    weight,
  };
}

export interface AmplitudeGrid {
  readonly values: Float32Array;
  readonly cols: number;
  readonly rows: number;
  readonly cell: number;
  readonly totalWeight: number;
}

export function computeAmplitudeGrid(
  sources: readonly ActiveSource[],
  width: number,
  height: number,
  cell: number,
  elapsed: number,
): AmplitudeGrid {
  const cols = Math.max(2, Math.floor(width / cell) + 1);
  const rows = Math.max(2, Math.floor(height / cell) + 1);
  const values = new Float32Array(cols * rows);
  const totalWeight = sources.reduce((sum, s) => sum + s.weight, 0) || 1;

  for (let j = 0; j < rows; j += 1) {
    const y = j * cell;
    for (let i = 0; i < cols; i += 1) {
      const x = i * cell;
      let sum = 0;
      for (const s of sources) {
        const dist = Math.hypot(x - s.x, y - s.y);
        sum += s.weight * Math.sin(dist * s.k - elapsed * s.omega + s.phase0);
      }
      values[j * cols + i] = sum / totalWeight;
    }
  }

  return { values, cols, rows, cell, totalWeight };
}

export interface Segment {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

/**
 * Traces one isoline of the amplitude grid. For each cell, collects the level crossings on its
 * four edges (0, 2, or 4 points) and pairs them in encounter order — a deliberately simplified
 * marching squares that skips the full 16-case lookup table. The rare 4-point saddle cells get an
 * imperfect (but visually inconsequential) pairing; this is a soft decorative pattern, not a
 * precise topological contour.
 */
export function marchingSquares(grid: AmplitudeGrid, level: number, out: Segment[]): void {
  const { values, cols, rows, cell } = grid;
  const px: number[] = [0, 0, 0, 0];
  const py: number[] = [0, 0, 0, 0];

  for (let j = 0; j < rows - 1; j += 1) {
    for (let i = 0; i < cols - 1; i += 1) {
      const x0 = i * cell;
      const y0 = j * cell;
      const x1 = x0 + cell;
      const y1 = y0 + cell;

      const vTl = values[j * cols + i]!;
      const vTr = values[j * cols + i + 1]!;
      const vBl = values[(j + 1) * cols + i]!;
      const vBr = values[(j + 1) * cols + i + 1]!;

      let count = 0;

      if ((vTl > level) !== (vTr > level)) {
        const t = (level - vTl) / (vTr - vTl);
        px[count] = x0 + (x1 - x0) * t;
        py[count] = y0;
        count += 1;
      }
      if ((vTr > level) !== (vBr > level)) {
        const t = (level - vTr) / (vBr - vTr);
        px[count] = x1;
        py[count] = y0 + (y1 - y0) * t;
        count += 1;
      }
      if ((vBl > level) !== (vBr > level)) {
        const t = (level - vBl) / (vBr - vBl);
        px[count] = x0 + (x1 - x0) * t;
        py[count] = y1;
        count += 1;
      }
      if ((vTl > level) !== (vBl > level)) {
        const t = (level - vTl) / (vBl - vTl);
        px[count] = x0;
        py[count] = y0 + (y1 - y0) * t;
        count += 1;
      }

      if (count >= 2) {
        out.push({ x1: px[0]!, y1: py[0]!, x2: px[1]!, y2: py[1]! });
      }
      if (count >= 4) {
        out.push({ x1: px[2]!, y1: py[2]!, x2: px[3]!, y2: py[3]! });
      }
    }
  }
}
