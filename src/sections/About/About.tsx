import { useTranslation } from "../../i18n/useTranslation";
import styles from "./About.module.css";

const CHIP_POSITIONS = [styles.chip1, styles.chip2, styles.chip3, styles.chip4] as const;

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
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.photo}>
            <img src="/images/features/smart-home.jpg" alt="" />
          </div>
          {pillars.map((pillar, i) => (
            <span key={pillar.title} className={`${styles.chip} ${CHIP_POSITIONS[i]}`}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {pillar.title}
            </span>
          ))}
        </div>

        <div className={styles.word}>
          <span className={styles.kicker}>{quoteKicker}</span>
          <blockquote className={styles.quote}>{quote}</blockquote>
          <p>{paragraph1}</p>
          <p className={styles.muted}>{paragraph2}</p>

          <div className={styles.byline}>
            <img src="/images/about/founder.png" alt={founder.name} />
            <div>
              <b>{founder.name}</b>
              <span>
                {founder.role} · {founder.since}
              </span>
            </div>
          </div>
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
