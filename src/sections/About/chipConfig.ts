export interface ChipPosition {
  readonly top?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly right?: string;
  readonly rotate: string;
  readonly delayMs: number;
}

/**
 * Coordinates are percentages relative to the photo box, so chips can sit
 * partly over its edges without being clipped by the section.
 */
export const CHIP_POSITIONS: readonly [ChipPosition, ChipPosition, ChipPosition, ChipPosition] = [
  { top: "6%", left: "-14%", rotate: "-3deg", delayMs: 0 },
  { bottom: "10%", left: "-10%", rotate: "2deg", delayMs: 140 },
  { top: "16%", right: "-16%", rotate: "-2deg", delayMs: 280 },
  { bottom: "0%", right: "-8%", rotate: "3deg", delayMs: 420 },
];
