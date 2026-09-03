import styles from "./FooterCables.module.css";

/**
 * Faint, static cable lines threading through the footer — a quiet echo of
 * the hero bundle, not a repeat of it. No pulses, no sway.
 */
export function FooterCables() {
  return (
    <svg
      className={styles.cables}
      viewBox="0 0 1600 500"
      preserveAspectRatio="none"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M-40 90 C 300 40, 550 150, 850 100 S 1400 30, 1680 110" />
      <path d="M-40 220 C 350 280, 600 160, 900 220 S 1450 300, 1680 230" />
      <path d="M-40 380 C 300 330, 620 420, 920 360 S 1420 300, 1680 400" />
    </svg>
  );
}
