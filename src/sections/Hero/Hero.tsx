import { useCallback, useRef } from "react";
import { Header } from "../../components/Header/Header";
import { StatCard } from "../../components/StatCard/StatCard";
import { CircuitPattern, type CircuitPatternHandle } from "../../components/CircuitPattern/CircuitPattern";
import { useTranslation } from "../../i18n/useTranslation";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

const HERO_CIRCUIT_SEED = 1;

export function Hero() {
  const { t } = useTranslation();
  const [statA, statB] = t.hero.stats;
  const sectionRef = useRef<HTMLElement>(null);
  const circuitRef = useRef<CircuitPatternHandle>(null);

  const handlePointerOver = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const cta = (event.target as HTMLElement).closest<HTMLElement>("[data-circuit-target]");
    const section = sectionRef.current;
    if (!cta || !section) return;
    const sectionRect = section.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();
    circuitRef.current?.convergeTo({
      x: ctaRect.left - sectionRect.left + ctaRect.width / 2,
      y: ctaRect.top - sectionRect.top + ctaRect.height / 2,
    });
  }, []);

  const handlePointerOut = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const leaving = (event.target as HTMLElement).closest<HTMLElement>("[data-circuit-target]");
    if (!leaving) return;
    circuitRef.current?.convergeTo(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label="Smart Volt — electricista"
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <CircuitPattern ref={circuitRef} seed={HERO_CIRCUIT_SEED} density={0.6} intensity={0.09} animated interactive pulseCount={13} />
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
