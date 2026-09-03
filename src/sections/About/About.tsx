import type { CSSProperties } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "../../i18n/useTranslation";
import { CHIP_POSITIONS } from "./chipConfig";
import styles from "./About.module.css";

export function About() {
  const { t } = useTranslation();
  const { eyebrow, heading, subtitle, founder, quoteKicker, quote, paragraph, pillars } = t.about;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.about} aria-label={heading}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div ref={ref} className={styles.visual}>
          <div className={styles.photoWrap}>
            <div className={styles.photo}>
              <img src="/images/features/smart-home.jpg" alt="" />
            </div>

            {pillars.map((pillar, i) => {
              const pos = CHIP_POSITIONS[i];
              const style: CSSProperties = {
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                "--chip-rotate": pos.rotate,
                transitionDelay: visible ? `${pos.delayMs}ms` : "0ms",
              } as CSSProperties;

              return (
                <span
                  key={pillar.title}
                  className={visible ? `${styles.chip} ${styles.chipVisible}` : styles.chip}
                  style={style}
                >
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {pillar.title}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.quoteBlock}>
        <span className={styles.kicker}>{quoteKicker}</span>
        <blockquote className={styles.quote}>{quote}</blockquote>
        <p className={styles.paragraph}>{paragraph}</p>

        <div className={styles.byline}>
          <img src="/images/about/founder.png" alt={founder.name} />
          <div>
            <b>{founder.name}</b>
            <span>{founder.role}</span>
          </div>
        </div>

        <div className={styles.facts}>
          {pillars.map((pillar, i) => (
            <div className={styles.fact} key={pillar.title}>
              <span className={styles.factIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.factLabel}>{pillar.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
