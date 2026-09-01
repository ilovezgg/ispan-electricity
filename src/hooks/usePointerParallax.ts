import { useEffect, useRef, type RefObject } from "react";

const PARALLAX_X_VAR = "--parallax-x";
const PARALLAX_Y_VAR = "--parallax-y";

/**
 * Tracks pointer position over an element and exposes it as normalized
 * (-1..1) CSS custom properties, updated at most once per animation frame.
 * Strands read the properties directly in their transform, so no re-render
 * is triggered on every pointer move.
 */
export function usePointerParallax<T extends HTMLElement>(
  enabled: boolean,
): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !enabled) {
      return;
    }

    let frame = 0;
    let pendingX = 0;
    let pendingY = 0;

    const applyFrame = (): void => {
      node.style.setProperty(PARALLAX_X_VAR, pendingX.toFixed(4));
      node.style.setProperty(PARALLAX_Y_VAR, pendingY.toFixed(4));
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent): void => {
      const rect = node.getBoundingClientRect();
      pendingX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pendingY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (frame === 0) {
        frame = window.requestAnimationFrame(applyFrame);
      }
    };

    const handlePointerLeave = (): void => {
      pendingX = 0;
      pendingY = 0;
      if (frame === 0) {
        frame = window.requestAnimationFrame(applyFrame);
      }
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [enabled]);

  return containerRef;
}
