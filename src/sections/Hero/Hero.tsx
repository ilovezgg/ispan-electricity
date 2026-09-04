import { useCallback, useRef } from "react";
import { Header } from "../../components/Header/Header";
import { StatCard } from "../../components/StatCard/StatCard";
import { Oscilloscope, type OscilloscopeHandle } from "../../components/Oscilloscope/Oscilloscope";
import { useTranslation } from "../../i18n/useTranslation";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

const HERO_SIGNAL_SEED = 1;

export function Hero() {
  const { t } = useTranslation();
  const [statA, statB] = t.hero.stats;
  const sectionRef = useRef<HTMLElement>(null);
  const scopeRef = useRef<OscilloscopeHandle>(null);

  const handlePointerOver = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const cta = (event.target as HTMLElement).closest<HTMLElement>("[data-oscilloscope-target]");
    const section = sectionRef.current;
    if (!cta || !section) return;
    const sectionRect = section.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();
    const xRatio = (ctaRect.left - sectionRect.left + ctaRect.width / 2) / sectionRect.width;
    scopeRef.current?.burst(xRatio);
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Smart Volt — electricista" onPointerOver={handlePointerOver}>
      <Oscilloscope ref={scopeRef} seed={HERO_SIGNAL_SEED} lineCount={3} speed={1} amplitude={1} showGrid animated interactive />
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
