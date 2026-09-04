import { useTranslation } from "../../i18n/useTranslation";
import styles from "./About.module.css";

export function About() {
  const { t } = useTranslation();
  const { eyebrow, heading, headingAccent, intro, founder, principle, timeline, cta, ctaNote } = t.about;

  return (
    <section className={styles.about} aria-label={heading}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.visual}>
            <div className={styles.photo}>
              <img src="/images/about/founder.png" alt={founder.badgeName} />
            </div>

            <div className={styles.founderCard}>
              <span className={styles.founderName}>{founder.name}</span>
              <span className={styles.founderBadge}>{founder.badgeName}</span>
              <span className={styles.founderRole}>{founder.role}</span>
              <span className={styles.founderLocation}>{founder.location}</span>
              <div className={styles.founderTags}>
                {founder.badges.map((badge) => (
                  <span key={badge} className={styles.founderTag}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.heading}>
              {heading}
              <br />
              <em>{headingAccent}</em>
            </h2>

            <div className={styles.introRow}>
              <p className={styles.intro}>{intro}</p>

              <div className={styles.principle}>
                <span className={styles.principleKicker}>{principle.kicker}</span>
                <blockquote className={styles.principleQuote}>{principle.quote}</blockquote>
                <span className={styles.principleByline}>— {founder.initials}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.timeline}>
          {timeline.map((item) => (
            <div className={styles.timelineItem} key={item.year}>
              <span className={styles.timelineYear}>{item.year}</span>
              <b className={styles.timelineTitle}>{item.title}</b>
              <span className={styles.timelineDescription}>{item.description}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="#contacto" className={styles.ctaButton}>
            {cta} <span aria-hidden="true">→</span>
          </a>
          <span className={styles.ctaNote}>{ctaNote}</span>
        </div>
      </div>
    </section>
  );
}
