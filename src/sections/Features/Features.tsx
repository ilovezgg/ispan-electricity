import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "../../i18n/useTranslation";
import { CardRegions } from "./cards/CardRegions";
import { CardStats } from "./cards/CardStats";
import { CardWork } from "./cards/CardWork";
import { FeaturesBackground } from "./FeaturesBackground";
import styles from "./Features.module.css";

export function Features() {
  const { t } = useTranslation();
  const { eyebrow, footnote, cardWork, cardStats, cardRegions } = t.features;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.features} aria-label={eyebrow} id="servicios">
      <FeaturesBackground />

      <span className={styles.pill}>
        <span className={styles.dot} />
        {eyebrow}
      </span>

      <div ref={ref} className={visible ? `${styles.grid} ${styles.visible}` : styles.grid}>
        <div className={`${styles.item} ${styles.item1}`}>
          <CardWork title={cardWork.title} description={cardWork.description} statusLabel={cardWork.statusLabel} />
        </div>
        <div className={`${styles.item} ${styles.item2}`}>
          <CardStats
            number={cardStats.number}
            title={cardStats.title}
            subtitle={cardStats.subtitle}
            stat1Label={cardStats.stat1Label}
            stat1Value={cardStats.stat1Value}
            stat2Label={cardStats.stat2Label}
            stat2Value={cardStats.stat2Value}
            text={cardStats.text}
          />
        </div>
        <div className={`${styles.item} ${styles.item3}`}>
          <CardRegions label={cardRegions.label} heading={cardRegions.heading} tags={cardRegions.tags} />
        </div>
      </div>

      <div className={styles.footline}>
        <span className={styles.footnote}>{footnote}</span>
      </div>
    </section>
  );
}
