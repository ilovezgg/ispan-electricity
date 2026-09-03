import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Reports true once the element has scrolled into view, and stays true —
 * used to trigger a one-shot entrance animation. Reduced-motion users get
 * `true` immediately so nothing depends on the observer firing.
 */
export function useScrollReveal<T extends HTMLElement>(): {
  readonly ref: React.RefObject<T | null>;
  readonly visible: boolean;
} {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, visible };
}
