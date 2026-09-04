export type PastelKey = "beige" | "sage" | "lavender" | "sand";

/** Pastel fill cycles by column position, so it stays consistent across steps. */
export const PASTELS: readonly [PastelKey, PastelKey, PastelKey, PastelKey] = [
  "beige",
  "sage",
  "lavender",
  "sand",
];

/**
 * Photo per step/option, independent of language. Order matches the
 * `quiz.steps` translation arrays: property type, task, floor area, timing.
 */
export const QUIZ_OPTION_IMAGES: readonly (readonly [string, string, string, string])[] = [
  [
    "/images/quiz/apartment.jpg",
    "/images/quiz/house.jpg",
    "/images/quiz/storefront.jpg",
    "/images/quiz/construction.jpg",
  ],
  [
    "/images/quiz/installation.jpg",
    "/images/quiz/smart-home.jpg",
    "/images/quiz/panel.jpg",
    "/images/quiz/repair.jpg",
  ],
  [
    "/images/quiz/compact.jpg",
    "/images/quiz/medium.jpg",
    "/images/quiz/spacious.jpg",
    "/images/quiz/large.jpg",
  ],
  [
    "/images/quiz/urgent.jpg",
    "/images/quiz/week.jpg",
    "/images/quiz/month.jpg",
    "/images/quiz/comparing.jpg",
  ],
];
