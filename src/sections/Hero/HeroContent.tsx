import { useTranslation } from "../../i18n/useTranslation";
import styles from "./HeroContent.module.css";

export function HeroContent() {
  const { t, locale } = useTranslation();

  return (
    <div className={styles.content}>
      <span className={styles.badge}>{t.hero.badge}</span>

      <div key={locale} className={styles.fade}>
        <h1 className={styles.title}>
          <span>{t.hero.titleLine1}</span>
          <span>{t.hero.titleLine2}</span>
        </h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
      </div>
    </div>
  );
}
