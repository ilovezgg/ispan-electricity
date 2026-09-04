/** Seeded PRNG (mulberry32) — deterministic secondary-line/spike variation per seed. */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Harmonic {
  /** Spatial frequency — radians per pixel. */
  readonly freq: number;
  readonly amp: number;
  readonly phase?: number;
}

export const DEFAULT_HARMONICS: readonly Harmonic[] = [
  { freq: 0.0022, amp: 0.55 },
  { freq: 0.006, amp: 0.28 },
  { freq: 0.015, amp: 0.14 },
  { freq: 0.035, amp: 0.07 },
];

/** Jitters a base harmonic set for a secondary (background) line, keeping the family loosely related. */
export function deriveHarmonics(base: readonly Harmonic[], rng: () => number): Harmonic[] {
  return base.map((h) => ({
    freq: h.freq * (0.7 + rng() * 0.8),
    amp: h.amp * (0.4 + rng() * 0.5),
    phase: rng() * Math.PI * 2,
  }));
}

/** Sum of harmonics at a traveling-wave phase — a rigid waveform sliding by `phaseOffset` px. */
export function sampleSignal(x: number, phaseOffset: number, harmonics: readonly Harmonic[], globalAmp: number): number {
  let sum = 0;
  const xs = x - phaseOffset;
  for (const h of harmonics) {
    sum += h.amp * Math.sin(xs * h.freq + (h.phase ?? 0));
  }
  return sum * globalAmp;
}

export function gaussian(d: number, sigma: number): number {
  return Math.exp(-(d * d) / (2 * sigma * sigma));
}
