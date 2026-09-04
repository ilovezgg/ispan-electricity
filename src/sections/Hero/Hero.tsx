import { Header } from "../../components/Header/Header";
import { StatCard } from "../../components/StatCard/StatCard";
import { WaveInterference } from "../../components/WaveInterference/WaveInterference";
import { useTranslation } from "../../i18n/useTranslation";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

const HERO_WAVE_SEED = 1;

export function Hero() {
  const { t } = useTranslation();
  const [statA, statB] = t.hero.stats;

  return (
    <section className={styles.hero} aria-label="Smart Volt — electricista">
      <WaveInterference seed={HERO_WAVE_SEED} sourceCount={3} speed={1} intensity={1} animated interactive />
      <div className={styles.scrim} />

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
