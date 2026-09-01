import { FeatureCard } from "../../components/FeatureCard/FeatureCard";
import { useTranslation } from "../../i18n/useTranslation";
import styles from "./Features.module.css";

const IMAGES: readonly [string, string, string, string] = [
  "/images/features/wiring.jpg",
  "/images/features/smart-home.jpg",
  "/images/features/panel.jpg",
  "/images/features/maintenance.jpg",
];

export function Features() {
  const { t } = useTranslation();
  const { eyebrow, heading, cta, items } = t.features;

  return (
    <section className={styles.features} aria-label={heading} id="servicios">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <FeatureCard
            key={item.title}
            index={i + 1}
            image={IMAGES[i]!}
            title={item.title}
            description={item.description}
            cta={cta}
          />
        ))}
      </div>
    </section>
  );
}
