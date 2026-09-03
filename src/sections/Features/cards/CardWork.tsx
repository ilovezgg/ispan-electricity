import styles from "./CardWork.module.css";

interface CardWorkProps {
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
}

export function CardWork({ title, description, statusLabel }: CardWorkProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
          </svg>
        </span>
        <span className={styles.number}>01</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <span className={styles.status}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m3 8.5 3 3 7-7.5" />
        </svg>
        {statusLabel}
      </span>
    </article>
  );
}
