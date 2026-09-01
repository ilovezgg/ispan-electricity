import { Header } from "../../components/Header/Header";
import { StatCard } from "../../components/StatCard/StatCard";
import { useTranslation } from "../../i18n/useTranslation";
import { CableBundle } from "./CableBundle";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useTranslation();
  const [statA, statB] = t.hero.stats;

  return (
    <section className={styles.hero} aria-label="Voltia — electricista">
      <CableBundle />

      <div className={styles.foreground}>
        <Header />

        <div className={styles.bottom}>
          <HeroContent />

          <div className={styles.stats}>
            <StatCard value={statA.value} label={statA.label} />
            <StatCard value={statB.value} label={statB.label} />
          </div>
        </div>
      </div>
    </section>
  );
}
