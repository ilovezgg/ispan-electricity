export const VIEWBOX_WIDTH = 1600;
export const VIEWBOX_HEIGHT = 900;

export const STRAND_COUNT = 27;

export type StrandTone = "core" | "copper";
export type StrandLayer = "back" | "mid" | "front";

export interface StrandSegment {
  readonly d: string;
  readonly layer: StrandLayer;
}

export interface Strand {
  readonly id: string;
  /** Full-length path, used for the pulse overlay and non-woven strands. */
  readonly fullPath: string;
  readonly segments: readonly StrandSegment[];
  readonly isWoven: boolean;
  readonly strokeWidth: number;
  readonly tone: StrandTone;
  readonly color: string;
  /** Resolved stroke paint — `color`, or a gradient reference for copper strands. */
  readonly stroke: string;
  readonly hasSheen: boolean;
  /** How far this strand is from the bundle centre, used to scale motion. */
  readonly reach: number;
  readonly hasPulse: boolean;
  readonly swayDuration: number;
  readonly swayDelay: number;
  readonly swayAmplitude: number;
  readonly enterDelay: number;
  readonly pulseDuration: number;
  readonly pulseDelay: number;
}

interface Anchor {
  readonly x: number;
  readonly y: number;
  /** 0..1, how much this anchor lets strands fan away from the centreline. */
  readonly spread: number;
}

/**
 * Key points describing the fallen-log S-curve the whole bundle follows.
 * Amplitude is deliberately shallow and the whole curve sits low in the
 * frame so the hero title keeps clear air above it.
 */
const SPINE_ANCHORS: readonly Anchor[] = [
  { x: 30, y: 530, spread: 1 },
  { x: 240, y: 515, spread: 0.5 },
  { x: 560, y: 405, spread: 0.14 },
  { x: 900, y: 585, spread: 0.11 },
  { x: 1260, y: 548, spread: 0.15 },
  { x: 1720, y: 575, spread: 0.18 },
];

/** Anchor indices at which woven strands are cut into separately-stackable segments. */
const WEAVE_CUTS = [0, 2, 4, 5] as const;

const BASE_SPACING = 12.5;
const CORE_COLORS = ["#111113", "#17171a", "#202023", "#2a2a2a"] as const;
const COPPER_COLORS = ["#B87333", "#E0995E", "#C9843F"] as const;

/** Roughly 1 in 7 strands carries a copper tone (~15% of the bundle). */
const COPPER_STRIDE = 7;
/** Fraction of strands that get split into re-stackable segments (weaving). */
const WEAVE_RATIO = 0.26;

export const COPPER_FADE_GRADIENT_ID = "copperFade";
export const STRAND_SHEEN_GRADIENT_ID = "strandSheen";

/** Deterministic 0..1 pseudo-random value, stable across renders. */
function noise(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

/** Converts a sequence of points into a smooth cubic-bezier path (Catmull-Rom). */
function smoothPath(points: readonly (readonly [number, number])[]): string {
  if (points.length < 2) {
    return "";
  }
  const first = points[0]!;
  let d = `M ${first[0].toFixed(1)} ${first[1].toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;

    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return d;
}

/**
 * Builds the point list for one strand. The first two anchors ("fray zone")
 * settle into the tight bundle at a per-strand rate, so strands separate
 * from the bundle at different lengths instead of fanning out uniformly.
 */
function strandPoints(offsetIndex: number, strandSeed: number, tone: StrandTone): (readonly [number, number])[] {
  const isLongTail = tone === "copper" && noise(strandSeed * 19.7) > 0.72;
  const settle = 0.2 + noise(strandSeed * 21.3) * 0.85;
  const curveBoost = tone === "copper" ? 1.35 : 1;
  const tailReach = isLongTail ? 1.7 : 1;

  return SPINE_ANCHORS.map((anchor, anchorIndex) => {
    const spreadMul = anchorIndex === 1 ? settle : 1;
    const jitter =
      (noise(strandSeed * 3.1 + anchorIndex * 7.7) - 0.5) * 8 * anchor.spread * curveBoost;
    const y = anchor.y + offsetIndex * BASE_SPACING * anchor.spread * spreadMul + jitter;

    let x = anchor.x;
    if (anchorIndex === 0) {
      const xJitter = (noise(strandSeed * 5.3) - 0.5) * 24 * curveBoost * tailReach;
      x = anchor.x + xJitter - (isLongTail ? 55 : 0);
    }
    return [x, y] as const;
  });
}

function strandWidth(reach: number, tone: StrandTone, seed: number): number {
  if (tone === "copper") {
    return 1 + noise(seed * 14.2) * 1.5;
  }
  const MIN_WIDTH = 1.8;
  const MAX_WIDTH = 8;
  const base = MAX_WIDTH - (MAX_WIDTH - MIN_WIDTH) * Math.pow(reach, 1.25);
  const wobble = 0.85 + noise(seed * 6.4) * 0.3;
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, base * wobble));
}

function strandColor(reach: number, seed: number, tone: StrandTone): string {
  if (tone === "copper") {
    const paletteIndex = Math.floor(noise(seed * 9.1) * COPPER_COLORS.length) % COPPER_COLORS.length;
    return COPPER_COLORS[paletteIndex]!;
  }
  // Bias toward the darker end of the palette as reach grows, so edge strands read darker.
  const biased = reach * 0.7 + noise(seed * 9.1) * 0.3;
  const paletteIndex = Math.min(CORE_COLORS.length - 1, Math.floor(biased * CORE_COLORS.length));
  return CORE_COLORS[paletteIndex]!;
}

function segmentsFor(
  points: readonly (readonly [number, number])[],
  weave: boolean,
  seed: number,
): { segments: StrandSegment[]; isWoven: boolean } {
  if (!weave) {
    return { segments: [{ d: smoothPath(points), layer: "mid" }], isWoven: false };
  }

  const middleLayer: StrandLayer = noise(seed * 13.4) > 0.5 ? "front" : "back";
  const segments: StrandSegment[] = [];

  for (let cut = 0; cut < WEAVE_CUTS.length - 1; cut += 1) {
    const from = WEAVE_CUTS[cut]!;
    const to = WEAVE_CUTS[cut + 1]!;
    const slice = points.slice(from, to + 1);
    const layer: StrandLayer = cut === 1 ? middleLayer : "mid";
    segments.push({ d: smoothPath(slice), layer });
  }

  return { segments, isWoven: true };
}

/** Ranks strands by a noise key and returns the indices of the lowest `ratio` fraction. */
function pickByRatio(count: number, ratio: number, seedFn: (i: number) => number): ReadonlySet<number> {
  const ranked = Array.from({ length: count }, (_, i) => i).sort((a, b) => seedFn(a) - seedFn(b));
  return new Set(ranked.slice(0, Math.round(count * ratio)));
}

export function generateStrands(count: number = STRAND_COUNT): Strand[] {
  const mid = (count - 1) / 2;
  const weavers = pickByRatio(count, WEAVE_RATIO, (i) => noise(i * 17.3 + 2.9));

  return Array.from({ length: count }, (_, i) => {
    const offsetIndex = i - mid;
    const reach = Math.abs(offsetIndex) / mid;
    const tone: StrandTone = i % COPPER_STRIDE === 0 ? "copper" : "core";

    const points = strandPoints(offsetIndex, i, tone);
    const fullPath = smoothPath(points);
    const weave = weavers.has(i);
    const { segments, isWoven } = segmentsFor(points, weave, i);
    const strokeWidth = strandWidth(reach, tone, i);
    const color = strandColor(reach, i, tone);

    return {
      id: `strand-${i}`,
      fullPath,
      segments,
      isWoven,
      strokeWidth,
      tone,
      color,
      stroke: tone === "copper" ? `url(#${COPPER_FADE_GRADIENT_ID})` : color,
      hasSheen: tone === "core" && strokeWidth >= 4.4,
      reach,
      // Noise-driven rather than modulo-based, so pulsing strands aren't evenly
      // spaced through the cross-section and delays never fall into a cycle.
      hasPulse: noise(i * 15.7 + 4.1) < 0.3,
      swayDuration: 5 + noise(i * 2.2) * 4,
      swayDelay: -noise(i * 4.4) * 6,
      swayAmplitude: 2 + reach * 6,
      enterDelay: 0.15 + reach * 0.5 + noise(i * 6.6) * 0.15,
      pulseDuration: 2.6 + noise(i * 8.8 + 1.7) * 3.9,
      pulseDelay: noise(i * 11.1 + 5.3) * 4.6,
    };
  });
}

/** A soft, blurred shadow path tracing the bundle's spine, for grounding it. */
export function generateShadowPath(): string {
  const points = SPINE_ANCHORS.map((anchor) => [anchor.x, anchor.y + 34] as const);
  return smoothPath(points);
}
