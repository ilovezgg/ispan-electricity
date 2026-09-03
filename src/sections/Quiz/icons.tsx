import type { JSX } from "react";

/**
 * One shared visual language for every quiz option: thin line, no fill,
 * geometric. Icons are purely decorative — the option label carries the
 * meaning — so callers mark the wrapper aria-hidden.
 */
const ICONS = {
  home: (
    <path d="M4 11.5 12 5l8 6.5M6.5 10v8.5h11V10" />
  ),
  house: (
    <path d="M4 12 12 5.5 20 12M7 10.5v8h4v-5h2v5h4v-8" />
  ),
  storefront: (
    <path d="M4 9.5 5.5 5h13L20 9.5M4.5 9.5v9h15v-9M4.5 9.5a2 2 0 0 0 4 0M8.5 9.5a2 2 0 0 0 4 0M12.5 9.5a2 2 0 0 0 4 0M16.5 9.5a2 2 0 0 0 4 0" />
  ),
  construction: (
    <path d="M4 20h16M6 20V9l6-4.5L18 9v11M9.5 20v-5h5v5" />
  ),
  bolt: <path d="M13 3 5 13.5h5.5L10 21l8-10.5h-5.5L13 3Z" />,
  smartHome: (
    <path d="M4 11.5 12 5l8 6.5M7 10.5V19h10v-8.5M12 14.5v2M9.8 12.7a3 3 0 0 1 4.4 0" />
  ),
  shield: <path d="M12 4 5 6.5v5.3c0 4.2 3 7 7 8.2 4-1.2 7-4 7-8.2V6.5L12 4Zm-2.8 8.2 2 2 4-4.4" />,
  wrench: (
    <path d="M14.5 6.5a4 4 0 0 1-5.4 5.4L5 16l3 3 4.1-4.1a4 4 0 0 1 5.4-5.4l-2.7 2.7-2-2 2.7-2.7Z" />
  ),
  rulerSmall: <path d="M5 15.5 15.5 5M8 8l2 2M11 5l2 2M5 12l2 2" />,
  rulerMedium: <path d="M4 16 16 4M7 7l2 2M10 4l2 2M4 13l2 2M13 4l2 2" />,
  rulerLarge: <path d="M3.5 17 17 3.5M6.5 6.5l2 2M10 3l2 2M3 14l2 2M13.5 3.5l2 2" />,
  building: (
    <path d="M6 20V4h9v16M6 20h12M15 20V9h4v11M9 7.5h2M9 11h2M9 14.5h2" />
  ),
  alarm: (
    <path d="M12 8v4.5l3 2M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM5.5 5.5 4 4M18.5 5.5 20 4" />
  ),
  calendarWeek: (
    <path d="M4.5 6.5h15v13h-15v-13ZM4.5 10h15M8 4v4M16 4v4M9 14h2M13 14h2" />
  ),
  calendarMonth: (
    <path d="M4.5 6.5h15v13h-15v-13ZM4.5 10h15M8 4v4M16 4v4M8.5 13.5h1M11.5 13.5h1M14.5 13.5h1M8.5 16.5h1M11.5 16.5h1" />
  ),
  search: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM16.2 16.2 21 21" />,
} as const satisfies Record<string, JSX.Element>;

export type IconKey = keyof typeof ICONS;

interface QuizIconProps {
  readonly name: IconKey;
}

export function QuizIcon({ name }: QuizIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
