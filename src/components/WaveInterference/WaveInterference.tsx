import { useEffect, useMemo, useRef } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  computeAmplitudeGrid,
  generateSources,
  marchingSquares,
  resolveSource,
  type ActiveSource,
  type Segment,
  type WaveSourceDef,
} from "./waveField";
import styles from "./WaveInterference.module.css";

interface WaveInterferenceProps {
  readonly sourceCount?: number;
  readonly speed?: number;
  readonly intensity?: number;
  readonly seed?: number;
  readonly animated?: boolean;
  readonly interactive?: boolean;
  readonly className?: string;
}

const INK_RGB = "17, 18, 20";
const COPPER_RGB = "224, 153, 94";

const LEVEL_STEPS = [0.18, 0.42, 0.66, 0.88];

const CURSOR_WAVELENGTH = 28;
const CURSOR_OMEGA = 1.9;
const CURSOR_WEIGHT = 1.4;
const CURSOR_SMOOTH_TAU = 0.22;

const PULSE_POOL_SIZE = 4;
const PULSE_DURATION = 1.5;
const PULSE_WAVELENGTH = 34;
const PULSE_OMEGA = 2.4;
const PULSE_PEAK_WEIGHT = 2.4;

interface PulseSlot {
  active: boolean;
  x: number;
  y: number;
  startTime: number;
}

function levelAppearance(level: number, intensity: number): { width: number; opacity: number; copper: boolean } {
  const t = Math.abs(level);
  const width = 0.9 + t * 1.1;
  const opacity = (0.06 + Math.pow(t, 1.4) * 0.4) * intensity;
  return { width, opacity, copper: t > 0.5 };
}

export function WaveInterference({
  sourceCount = 3,
  speed = 1,
  intensity = 1,
  seed = 1,
  animated = true,
  interactive = true,
  className,
}: WaveInterferenceProps) {
  const { ref: sizeRef, size } = useElementSize<HTMLDivElement>();
  const inView = useInView(sizeRef);
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bucketW = Math.ceil(size.width / 40) * 40;
  const bucketH = Math.ceil(size.height / 40) * 40;
  const isMobile = size.width > 0 && size.width < 640;
  const isAnimated = animated && !reducedMotion;
  const isInteractive = interactive && isAnimated && !isMobile;
  const effectiveSourceCount = isMobile ? Math.min(2, sourceCount) : sourceCount;
  const cell = isMobile ? 14 : 9;

  const sourceDefs = useMemo<WaveSourceDef[]>(
    () => (bucketW > 0 && bucketH > 0 ? generateSources(bucketW, bucketH, seed, effectiveSourceCount) : []),
    [bucketW, bucketH, seed, effectiveSourceCount],
  );

  const wrapperClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sizeRef.current;
    if (!canvas || !wrapper || size.width === 0 || size.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderScale = dpr * (isMobile ? 0.45 : 0.68);
    canvas.width = Math.max(1, Math.round(size.width * renderScale));
    canvas.height = Math.max(1, Math.round(size.height * renderScale));
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;
    ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  }, [size.width, size.height, isMobile, sizeRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sizeRef.current;
    if (!canvas || !wrapper || sourceDefs.length === 0 || size.width === 0 || size.height === 0) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;
    const el: HTMLDivElement = wrapper;

    const width = bucketW;
    const height = bucketH;

    const cursorPos = { x: width / 2, y: height / 2 };
    const cursorActive = { current: false };
    const cursorWeight = { current: 0 };

    const pulses: PulseSlot[] = Array.from({ length: PULSE_POOL_SIZE }, () => ({
      active: false,
      x: 0,
      y: 0,
      startTime: 0,
    }));

    function handlePointerMove(event: PointerEvent): void {
      const rect = el.getBoundingClientRect();
      cursorPos.x = event.clientX - rect.left;
      cursorPos.y = event.clientY - rect.top;
      cursorActive.current = true;
    }
    function handlePointerLeave(): void {
      cursorActive.current = false;
    }
    function handleClick(event: MouseEvent): void {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const slot = pulses.reduce((oldest, p) => (p.startTime < oldest.startTime ? p : oldest), pulses[0]!);
      slot.active = true;
      slot.x = x;
      slot.y = y;
      slot.startTime = performance.now();
    }

    if (isInteractive) {
      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);
      el.addEventListener("click", handleClick);
    }

    const segBuf: Segment[] = [];

    function render(elapsed: number, dt: number): void {
      ctx.clearRect(0, 0, width, height);

      const active: ActiveSource[] = sourceDefs.map((def) => resolveSource(def, elapsed, speed));

      if (dt >= 0) {
        const target = cursorActive.current ? 1 : 0;
        cursorWeight.current += (target - cursorWeight.current) * (1 - Math.exp(-dt / CURSOR_SMOOTH_TAU));
        if (cursorWeight.current > 0.01) {
          active.push({
            x: cursorPos.x,
            y: cursorPos.y,
            k: (Math.PI * 2) / CURSOR_WAVELENGTH,
            omega: CURSOR_OMEGA * speed,
            phase0: 0,
            weight: cursorWeight.current * CURSOR_WEIGHT,
          });
        }

        const now = performance.now();
        for (const p of pulses) {
          if (!p.active) continue;
          const localT = (now - p.startTime) / 1000;
          const progress = localT / PULSE_DURATION;
          if (progress >= 1) {
            p.active = false;
            continue;
          }
          const rise = Math.min(1, progress / 0.05);
          const decay = Math.exp(-progress * 3.2);
          active.push({
            x: p.x,
            y: p.y,
            k: (Math.PI * 2) / PULSE_WAVELENGTH,
            omega: PULSE_OMEGA * speed,
            phase0: 0,
            weight: rise * decay * PULSE_PEAK_WEIGHT,
          });
        }
      }

      const grid = computeAmplitudeGrid(active, width, height, cell, elapsed);

      for (const level of LEVEL_STEPS) {
        const { width: lineWidth, opacity, copper } = levelAppearance(level, intensity);
        for (const sign of [1, -1]) {
          segBuf.length = 0;
          marchingSquares(grid, level * sign, segBuf);
          if (segBuf.length === 0) continue;
          ctx.beginPath();
          for (const s of segBuf) {
            ctx.moveTo(s.x1, s.y1);
            ctx.lineTo(s.x2, s.y2);
          }
          ctx.strokeStyle = `rgba(${copper ? COPPER_RGB : INK_RGB}, ${opacity})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }
    }

    let frame = 0;
    if (!isAnimated || !inView) {
      render(0, -1);
      return () => {
        if (isInteractive) {
          el.removeEventListener("pointermove", handlePointerMove);
          el.removeEventListener("pointerleave", handlePointerLeave);
          el.removeEventListener("click", handleClick);
        }
      };
    }

    const startTime = performance.now();
    let lastTime = startTime;

    function tick(now: number): void {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      render(elapsed, dt);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (isInteractive) {
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
        el.removeEventListener("click", handleClick);
      }
    };
  }, [sourceDefs, isAnimated, isInteractive, inView, bucketW, bucketH, cell, speed, intensity, sizeRef]);

  return (
    <div ref={sizeRef} className={wrapperClass} aria-hidden="true">
      {size.width > 0 ? <canvas ref={canvasRef} className={styles.canvas} /> : null}
    </div>
  );
}
