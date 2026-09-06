import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "../../i18n/useTranslation";
import styles from "./Portfolio.module.css";

export function Portfolio() {
  const { t } = useTranslation();
  const { eyebrow, heading, headingAccent, subtitle, items } = t.portfolio;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.portfolio} aria-label={heading} id="trabajos">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>
          {heading} <em>{headingAccent}</em>
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div ref={ref} className={visible ? `${styles.grid} ${styles.visible}` : styles.grid}>
        {items.map((item, index) => (
          <figure className={styles.card} key={item.image} style={{ transitionDelay: `${index * 70}ms` }}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.tag}>{item.tag}</span>
              <span className={styles.title}>{item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
