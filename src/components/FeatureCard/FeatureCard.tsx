import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  readonly index: number;
  readonly image: string;
  readonly title: string;
  readonly description: string;
  readonly cta: string;
}

export function FeatureCard({
  index,
  image,
  title,
  description,
  cta,
}: FeatureCardProps) {
  return (
    <article
      className={styles.card}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.top}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.index}>
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.bottom}>
        <p className={styles.description}>{description}</p>
        <a className={styles.link} href="#contacto">
          {cta}
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
