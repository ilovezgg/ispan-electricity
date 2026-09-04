import { useEffect, useRef, useState } from "react";

export interface ElementSize {
  readonly width: number;
  readonly height: number;
}

/** Tracks an element's content-box pixel size via ResizeObserver. */
export function useElementSize<T extends HTMLElement>(): {
  readonly ref: React.RefObject<T | null>;
  readonly size: ElementSize;
} {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { inlineSize, blockSize } = entry.borderBoxSize?.[0] ?? {
        inlineSize: entry.contentRect.width,
        blockSize: entry.contentRect.height,
      };
      setSize({ width: Math.round(inlineSize), height: Math.round(blockSize) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
