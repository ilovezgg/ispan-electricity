import { useTranslation } from "../../i18n/useTranslation";
import styles from "./About.module.css";

export function About() {
  const { t } = useTranslation();
  const { eyebrow, heading, subtitle, founder, quoteKicker, quote, paragraph1, paragraph2, pillars } =
    t.about;

  return (
    <section className={styles.about} aria-label={heading}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        <figure className={styles.portrait}>
          <img src="/images/about/founder.png" alt={founder.name} />
          <span className={styles.badge}>{founder.since}</span>
          <figcaption>
            <b>{founder.name}</b>
            <span>{founder.role}</span>
          </figcaption>
        </figure>

        <div className={styles.word}>
          <span className={styles.kicker}>{quoteKicker}</span>
          <blockquote className={styles.quote}>{quote}</blockquote>
          <p>{paragraph1}</p>
          <p className={styles.muted}>{paragraph2}</p>
        </div>

        {pillars.map((pillar, i) => (
          <article className={styles.card} key={pillar.title}>
            <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
