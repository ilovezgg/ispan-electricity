import type { JSX } from "react";

/**
 * Line icons for the contact rows and form, same visual language as
 * QuizIcon (thin stroke, no fill). WhatsApp is the one exception — its
 * mark reads better solid — handled by WhatsAppIcon below.
 */
const ICONS = {
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  ),
  mail: <path d="M4 6.5h16v11H4v-11Zm0 0 8 6.5 8-6.5" />,
  arrowUpRight: <path d="M8 16 16 8M9 8h7v7" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  spinner: <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />,
} as const satisfies Record<string, JSX.Element>;

export type IconKey = keyof typeof ICONS;

interface ContactIconProps {
  readonly name: IconKey;
  readonly className?: string;
}

export function ContactIcon({ name, className }: ContactIconProps) {
  return (
    <svg
      className={className}
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

interface WhatsAppIconProps {
  readonly className?: string;
}

export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.28 4.9L2 22l5.32-1.39a9.9 9.9 0 0 0 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.31-1.93 1.36-.5.05-1.02.24-3.42-.71-2.9-1.15-4.76-4.11-4.9-4.3-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.93.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}
