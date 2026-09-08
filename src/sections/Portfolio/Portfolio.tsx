import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "../../i18n/useTranslation";
import styles from "./Portfolio.module.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Portfolio() {
  const { t } = useTranslation();
  const { eyebrow, heading, headingAccent, subtitle, prevSlide, nextSlide, goToSlide, items } = t.portfolio;
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
    setActive(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.getBoundingClientRect().width ?? 1;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    setActive(Math.max(0, Math.min(index, items.length - 1)));
  };

  useEffect(() => {
    const handleResize = () => handleScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  return (
    <section className={styles.portfolio} aria-label={heading} id="trabajos">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>
          {heading} <em>{headingAccent}</em>
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div ref={ref} className={visible ? `${styles.slider} ${styles.visible}` : styles.slider}>
        <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
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

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label={prevSlide}
          >
            ←
          </button>

          <div className={styles.dots}>
            {items.map((item, index) => (
              <button
                type="button"
                key={item.image}
                className={index === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                onClick={() => scrollToIndex(index)}
                aria-label={goToSlide.replace("{n}", String(index + 1))}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === items.length - 1}
            aria-label={nextSlide}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
