import { QuizIcon, type IconKey } from "./icons";
import type { PastelKey } from "./quizConfig";
import styles from "./QuizOptionCard.module.css";

interface QuizOptionCardProps {
  readonly label: string;
  readonly tag: string;
  readonly icon: IconKey;
  readonly pastel: PastelKey;
  readonly selected: boolean;
  readonly pickLabel: string;
  readonly onSelect: () => void;
}

export function QuizOptionCard({ label, tag, icon, pastel, selected, pickLabel, onSelect }: QuizOptionCardProps) {
  return (
    <button
      type="button"
      className={selected ? `${styles.card} ${styles.selected}` : styles.card}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={`${styles.plate} ${styles[pastel]}`}>
        <span className={styles.tag}>{tag}</span>
        <span className={styles.iconWrap}>
          <QuizIcon name={icon} />
        </span>
        {selected ? (
          <span className={styles.check} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 8.5 3 3 7-7.5" />
            </svg>
          </span>
        ) : null}
      </span>

      <span className={styles.bottom}>
        <span className={styles.label}>{label}</span>
        <span className={styles.pick}>
          {pickLabel}
          <span className={styles.arrow} aria-hidden="true">→</span>
        </span>
      </span>
    </button>
  );
}
