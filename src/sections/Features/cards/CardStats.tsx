import styles from "./CardStats.module.css";

interface CardStatsProps {
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly stat1Label: string;
  readonly stat1Value: string;
  readonly stat2Label: string;
  readonly stat2Value: string;
  readonly text: string;
}

export function CardStats({
  number,
  title,
  subtitle,
  stat1Label,
  stat1Value,
  stat2Label,
  stat2Value,
  text,
}: CardStatsProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.circle} aria-hidden="true">
          {number}
        </span>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statLight}>
          <b>{stat1Value}</b>
          <span>{stat1Label}</span>
        </div>
        <div className={styles.statDark}>
          <b>{stat2Value}</b>
          <span>{stat2Label}</span>
        </div>
      </div>

      <p className={styles.text}>{text}</p>
    </article>
  );
}
