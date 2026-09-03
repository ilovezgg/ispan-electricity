import styles from "./CardRegions.module.css";

interface CardRegionsProps {
  readonly label: string;
  readonly heading: string;
  readonly tags: readonly string[];
}

export function CardRegions({ label, heading, tags }: CardRegionsProps) {
  return (
    <article className={styles.card}>
      <span className={styles.label}>{label}</span>
      <h3 className={styles.heading}>{heading}</h3>

      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
