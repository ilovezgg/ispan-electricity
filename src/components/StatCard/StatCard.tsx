import styles from "./StatCard.module.css";

interface StatCardProps {
  readonly value: string;
  readonly label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </div>
  );
}
