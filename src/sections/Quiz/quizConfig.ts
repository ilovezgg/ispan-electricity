import type { IconKey } from "./icons";

export type PastelKey = "beige" | "sage" | "lavender" | "sand";

/** Pastel fill cycles by column position, so it stays consistent across steps. */
export const PASTELS: readonly [PastelKey, PastelKey, PastelKey, PastelKey] = [
  "beige",
  "sage",
  "lavender",
  "sand",
];

/**
 * Icon per step/option, independent of language. Order matches the
 * `quiz.steps` translation arrays: property type, task, floor area, timing.
 */
export const QUIZ_OPTION_ICONS: readonly (readonly [IconKey, IconKey, IconKey, IconKey])[] = [
  ["home", "house", "storefront", "construction"],
  ["bolt", "smartHome", "shield", "wrench"],
  ["rulerSmall", "rulerMedium", "rulerLarge", "building"],
  ["alarm", "calendarWeek", "calendarMonth", "search"],
];
