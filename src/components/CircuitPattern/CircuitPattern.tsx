import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { generateCircuit, type CircuitGeometry, type CircuitNode } from "./circuitGeometry";
import styles from "./CircuitPattern.module.css";

export interface CircuitPatternHandle {
  /** Point (in wrapper-local px) a few pulses should head toward, or null to release them. */
  convergeTo(point: { readonly x: number; readonly y: number } | null): void;
}

interface CircuitPatternProps {
  /** 0..1 network coverage — higher keeps more branches alive. */
  readonly density?: number;
  /** 0..1 line opacity. */
  readonly intensity?: number;
  /** Whether pulses travel the network at all. */
  readonly animated?: boolean;
  /** Geometry variant — same seed always reproduces the same board. */
  readonly seed?: number;
  /** Cursor spotlight + CTA convergence. Defaults to `animated`. */
  readonly interactive?: boolean;
  readonly pulseCount?: number;
  readonly className?: string;
}

const TAIL_LENGTH = 26;
const NODE_RADIUS = 2.2;
const FLASH_MS = 480;

interface PulseRuntime {
  nodeId: number;
  prevNodeId: number | null;
  targetId: number | null;
  progress: number;
  speed: number;
  hopsLeft: number;
  startAt: number;
  el: SVGGElement | null;
}

export const CircuitPattern = forwardRef<CircuitPatternHandle, CircuitPatternProps>(function CircuitPattern(
  { density = 0.55, intensity = 0.08, animated = true, seed = 1, interactive, pulseCount = 12, className },
  ref,
) {
  const { ref: sizeRef, size } = useElementSize<HTMLDivElement>();
  const inView = useInView(sizeRef);
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);

  const isInteractive = interactive ?? animated;
  const isAnimated = animated && !reducedMotion;

  // Round to steady buckets so a 1px resize doesn't regenerate the whole board.
  const bucketW = Math.round(size.width / 40) * 40;
  const bucketH = Math.round(size.height / 40) * 40;
  const isMobile = size.width > 0 && size.width < 640;
  const effectiveDensity = isMobile ? density * 0.55 : density;
  const effectivePulseCount = Math.max(1, isMobile ? Math.round(pulseCount / 2) : pulseCount);

  const geometry = useMemo<CircuitGeometry>(
    () =>
      generateCircuit({
        width: bucketW,
        height: bucketH,
        seed,
        density: effectiveDensity,
        cellSize: isMobile ? 60 : 72,
      }),
    [bucketW, bucketH, seed, effectiveDensity, isMobile],
  );

  const nodeById = useMemo(() => new Map(geometry.nodes.map((n) => [n.id, n] as const)), [geometry]);

  useEffect(() => {
    if (geometry.nodes.length === 0) return;
    const timer = window.setTimeout(() => setEntered(true), 60);
    return () => window.clearTimeout(timer);
  }, [geometry]);

  const nodeRefs = useRef(new Map<number, SVGCircleElement>());
  const pulseElRefs = useRef<(SVGGElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const convergeTargetRef = useRef<{ x: number; y: number } | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      convergeTo(point) {
        convergeTargetRef.current = point;
        const glow = glowRef.current;
        if (!glow) return;
        if (point) {
          glow.style.transform = `translate(${point.x}px, ${point.y}px)`;
          glow.classList.add(styles.visible!);
        } else {
          glow.classList.remove(styles.visible!);
        }
      },
    }),
    [],
  );

  // Pointer-follow spotlight (skipped while a converge target is pinned).
  useEffect(() => {
    if (!isInteractive || reducedMotion) return;
    const wrapper = sizeRef.current;
    const glow = glowRef.current;
    if (!wrapper || !glow) return;

    let raf = 0;
    const handleMove = (event: PointerEvent) => {
      if (convergeTargetRef.current) return;
      const rect = wrapper.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${x}px, ${y}px)`;
        glow.classList.add(styles.visible!);
      });
    };
    const handleLeave = () => {
      if (convergeTargetRef.current) return;
      glow.classList.remove(styles.visible!);
    };

    wrapper.addEventListener("pointermove", handleMove);
    wrapper.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("pointermove", handleMove);
      wrapper.removeEventListener("pointerleave", handleLeave);
    };
  }, [isInteractive, reducedMotion, sizeRef]);

  // Pulse traversal loop — imperative DOM writes only, no React state per frame.
  useEffect(() => {
    if (!isAnimated || !inView || geometry.edges.length === 0) return;
    const runtimes: PulseRuntime[] = [];
    const nodeIds = geometry.nodes.map((n) => n.id);

    function spawnAt(index: number, delayed: boolean) {
      const nodeId = nodeIds[Math.floor(Math.random() * nodeIds.length)]!;
      runtimes[index] = {
        nodeId,
        prevNodeId: null,
        targetId: null,
        progress: 0,
        speed: 70 + Math.random() * 90,
        hopsLeft: 4 + Math.floor(Math.random() * 6),
        startAt: performance.now() + (delayed ? 400 + Math.random() * 2600 : Math.random() * 800),
        el: pulseElRefs.current[index] ?? null,
      };
    }

    for (let i = 0; i < effectivePulseCount; i += 1) spawnAt(i, true);

    function pickNext(nodeId: number, prevNodeId: number | null): number | null {
      const neighbors = geometry.adjacency.get(nodeId);
      if (!neighbors || neighbors.length === 0) return null;
      const forward = neighbors.filter((n) => n !== prevNodeId);
      const pool = forward.length > 0 ? forward : neighbors;
      return pool[Math.floor(Math.random() * pool.length)]!;
    }

    function flashNode(nodeId: number) {
      const el = nodeRefs.current.get(nodeId);
      if (!el) return;
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "scale(1.9)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${FLASH_MS}ms ease, transform ${FLASH_MS}ms ease`;
        el.style.opacity = "";
        el.style.transform = "";
      });
    }

    let lastTime = performance.now();
    let frame = 0;

    function tick(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      for (const pulse of runtimes) {
        const el = pulse.el;
        if (!el) continue;
        if (now < pulse.startAt) {
          el.style.opacity = "0";
          continue;
        }

        if (pulse.targetId === null) {
          const target = pickNext(pulse.nodeId, pulse.prevNodeId);
          if (target === null) {
            const idx = runtimes.indexOf(pulse);
            spawnAt(idx, true);
            continue;
          }
          pulse.targetId = target;
          pulse.progress = 0;
        }

        const from = nodeById.get(pulse.nodeId);
        const to = nodeById.get(pulse.targetId);
        if (!from || !to) continue;
        const length = Math.hypot(to.x - from.x, to.y - from.y) || 1;
        pulse.progress += pulse.speed * dt;

        if (pulse.progress >= length) {
          flashNode(pulse.targetId);
          pulse.prevNodeId = pulse.nodeId;
          pulse.nodeId = pulse.targetId;
          pulse.targetId = null;
          pulse.hopsLeft -= 1;
          if (pulse.hopsLeft <= 0) {
            const idx = runtimes.indexOf(pulse);
            spawnAt(idx, true);
          }
          continue;
        }

        const t = pulse.progress / length;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;
        const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
        el.style.opacity = "1";
        el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isAnimated, inView, geometry, nodeById, effectivePulseCount]);

  const setNodeRef = (id: number) => (el: SVGCircleElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const wrapperStyle = { "--circuit-intensity": intensity } as CSSProperties;
  const wrapperClass = [styles.wrapper, entered ? styles.entered : "", className].filter(Boolean).join(" ");

  return (
    <div ref={sizeRef} className={wrapperClass} style={wrapperStyle} aria-hidden="true">
      {size.width > 0 ? (
        <svg
          className={styles.svg}
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          {isAnimated ? (
            <defs>
              <linearGradient id="circuitPulseGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-copper-bright)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--color-copper-bright)" stopOpacity="0.9" />
              </linearGradient>
              <filter id="circuitPulseGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
            </defs>
          ) : null}

          <g>
            {geometry.polylines.map((d, i) => (
              <path key={i} className={styles.line} d={d} strokeWidth={1.2} />
            ))}
          </g>

          <g>
            {geometry.junctions.map((node: CircuitNode) => (
              <circle
                key={node.id}
                ref={setNodeRef(node.id)}
                className={styles.node}
                cx={node.x}
                cy={node.y}
                r={NODE_RADIUS}
              />
            ))}
          </g>

          {isAnimated ? (
            <g>
              {Array.from({ length: effectivePulseCount }, (_, i) => (
                <g
                  key={i}
                  ref={(el) => {
                    pulseElRefs.current[i] = el;
                  }}
                  className={styles.pulse}
                >
                  <line className={styles.pulseTail} x1={-TAIL_LENGTH} y1={0} x2={0} y2={0} strokeWidth={2} />
                  <circle className={styles.pulseHead} cx={0} cy={0} r={2.2} />
                </g>
              ))}
            </g>
          ) : null}
        </svg>
      ) : null}

      {isInteractive && !reducedMotion ? <div ref={glowRef} className={styles.glow} /> : null}
    </div>
  );
});
