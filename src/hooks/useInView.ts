import { useEffect, useState } from "react";

/** Reports whether the element is currently intersecting the viewport (live, not one-shot). */
export function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
