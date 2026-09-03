import styles from "./QuizStepper.module.css";

interface QuizStepperProps {
  readonly total: number;
  /** 0-based index of the current step; may equal `total` once every step is done. */
  readonly currentIndex: number;
}

export function QuizStepper({ total, currentIndex }: QuizStepperProps) {
  return (
    <ol className={styles.stepper}>
      {Array.from({ length: total }, (_, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        const state = isDone ? styles.done : isActive ? styles.active : styles.future;

        return (
          <li
            key={i}
            className={`${styles.step} ${state}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className={styles.circle}>
              {isDone ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 8.5 3 3 7-7.5" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            {i < total - 1 ? <span className={styles.line} aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
