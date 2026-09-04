import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { DEFAULT_HARMONICS, deriveHarmonics, gaussian, makeRng, sampleSignal, type Harmonic } from "./signalMath";
import styles from "./Oscilloscope.module.css";

export interface OscilloscopeHandle {
  /** Fires a short, stationary burst on the main line at the given horizontal ratio (0-1). */
  burst(xRatio?: number): void;
}

interface OscilloscopeProps {
  readonly harmonics?: readonly Harmonic[];
  readonly speed?: number;
  readonly amplitude?: number;
  readonly lineCount?: number;
  readonly showGrid?: boolean;
  readonly animated?: boolean;
  readonly seed?: number;
  readonly interactive?: boolean;
  readonly className?: string;
}

const INK_RGB = "17, 18, 20";
const COPPER_RGB = "224, 153, 94";
const SURFACE_RGB = "242, 241, 239";

const MAIN_Y_RATIO = 0.46;
const SECONDARY_OFFSETS = [-0.16, 0.18];
const TRAIL_ALPHA = 0.4;
const MAIN_LINE_WIDTH = 2.4;
const GLOW_WIDTH = 3.6;
const GLOW_BAND = 140;
const GLOW_SPEED = 130;

const TRAVEL_SPEED_BASE = 55;
const BREATH_PERIOD = 22;
const SPEED_MOD_PERIOD = 29;

const CURSOR_SIGMA = 110;
const CURSOR_THRESHOLD = 140;
const CURSOR_STIFFNESS = 90;
const CURSOR_DAMPING = 13;

const SPIKE_POOL = 2;
const SPIKE_DURATION = 1.0;
const SPIKE_SIGMA = 30;
const SPIKE_MIN_GAP = 10;
const SPIKE_MAX_GAP = 20;

const BURST_DURATION = 0.6;
const BURST_SIGMA = 70;

interface SpikeSlot {
  active: boolean;
  startTime: number;
  x0: number;
  sign: number;
  nextAt: number;
}

function gridLines(count: number, size: number): number[] {
  const out: number[] = [];
  for (let i = 1; i < count; i += 1) out.push((size * i) / count);
  return out;
}

export const Oscilloscope = forwardRef<OscilloscopeHandle, OscilloscopeProps>(function Oscilloscope(
  {
    harmonics = DEFAULT_HARMONICS,
    speed = 1,
    amplitude = 1,
    lineCount = 3,
    showGrid = true,
    animated = true,
    seed = 1,
    interactive = true,
    className,
  },
  ref,
) {
  const { ref: sizeRef, size } = useElementSize<HTMLDivElement>();
  const inView = useInView(sizeRef);
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRequestRef = useRef<{ xRatio: number } | null>(null);

  const bucketW = Math.ceil(size.width / 40) * 40;
  const bucketH = Math.ceil(size.height / 40) * 40;
  const isMobile = size.width > 0 && size.width < 640;
  const isAnimated = animated && !reducedMotion;
  const isInteractive = interactive && isAnimated && !isMobile;
  const effectiveLineCount = isMobile ? 1 : Math.max(1, Math.min(3, lineCount));
  const sampleCount = isMobile ? 140 : 300;

  useImperativeHandle(
    ref,
    () => ({
      burst(xRatio = 0.5) {
        burstRequestRef.current = { xRatio };
      },
    }),
    [],
  );

  const secondaryHarmonics = useMemo(() => {
    const rng = makeRng(seed);
    return Array.from({ length: Math.max(0, effectiveLineCount - 1) }, () => deriveHarmonics(harmonics, rng));
  }, [harmonics, seed, effectiveLineCount]);

  const wrapperClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0 || size.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(size.width * dpr));
    canvas.height = Math.max(1, Math.round(size.height * dpr));
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [size.width, size.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = sizeRef.current;
    if (!canvas || !wrapper || bucketW === 0 || bucketH === 0) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;
    const el: HTMLDivElement = wrapper;

    const width = bucketW;
    const height = bucketH;
    const ampPx = height * 0.2 * amplitude * (isMobile ? 0.7 : 1);

    const rng = makeRng(seed * 7919 + 13);
    const breathPhase = rng() * Math.PI * 2;
    const speedModPhase = rng() * Math.PI * 2;

    const xs: number[] = [];
    const pad = 24;
    for (let s = 0; s <= sampleCount; s += 1) {
      xs.push(-pad + (s / sampleCount) * (width + pad * 2));
    }

    const cursorPos = { x: width / 2, y: height * MAIN_Y_RATIO };
    const cursorActive = { current: false };
    const cursorAmp = { value: 0, vel: 0 };

    const spikeRng = makeRng(seed * 104729 + 3);
    const spikes: SpikeSlot[] = Array.from({ length: SPIKE_POOL }, (_, i) => ({
      active: false,
      startTime: 0,
      x0: 0,
      sign: 1,
      nextAt: SPIKE_MIN_GAP + spikeRng() * (SPIKE_MAX_GAP - SPIKE_MIN_GAP) + i * 4,
    }));

    const burst = { active: false, startTime: 0, x: width / 2 };

    function handlePointerMove(event: PointerEvent): void {
      const rect = el.getBoundingClientRect();
      cursorPos.x = event.clientX - rect.left;
      cursorPos.y = event.clientY - rect.top;
      cursorActive.current = true;
    }
    function handlePointerLeave(): void {
      cursorActive.current = false;
    }

    if (isInteractive) {
      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);
    }

    let phaseOffset = 0;

    function mainSignal(x: number, breathMod: number): number {
      return height * MAIN_Y_RATIO + ampPx * breathMod * sampleSignal(x, phaseOffset, harmonics, 1);
    }

    function drawGrid(): void {
      ctx.strokeStyle = `rgba(${INK_RGB}, 0.06)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const gx of gridLines(8, width)) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (const gy of gridLines(5, height)) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();
    }

    function drawSecondary(breathMod: number): void {
      secondaryHarmonics.forEach((hs, idx) => {
        const yRatio = MAIN_Y_RATIO + SECONDARY_OFFSETS[idx % SECONDARY_OFFSETS.length]!;
        ctx.beginPath();
        for (let i = 0; i < xs.length; i += 1) {
          const x = xs[i]!;
          const y = height * yRatio + ampPx * 0.55 * breathMod * sampleSignal(x, phaseOffset * 0.7, hs, 1);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${INK_RGB}, 0.22)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
    }

    function render(elapsed: number, dt: number): void {
      if (dt >= 0) {
        ctx.fillStyle = `rgba(${SURFACE_RGB}, ${TRAIL_ALPHA})`;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      if (showGrid) drawGrid();

      const breathMod = 1 + 0.3 * Math.sin((elapsed * Math.PI * 2) / BREATH_PERIOD + breathPhase);

      if (secondaryHarmonics.length > 0) drawSecondary(breathMod);

      const yAtCursor = mainSignal(cursorPos.x, breathMod);
      if (dt >= 0) {
        const near = cursorActive.current && Math.abs(cursorPos.y - yAtCursor) < CURSOR_THRESHOLD;
        const target = near ? 1 : 0;
        const accel = (target - cursorAmp.value) * CURSOR_STIFFNESS - cursorAmp.vel * CURSOR_DAMPING;
        cursorAmp.vel += accel * dt;
        cursorAmp.value = Math.max(0, cursorAmp.value + cursorAmp.vel * dt);
      }

      ctx.beginPath();
      let glowX = 0;
      for (let i = 0; i < xs.length; i += 1) {
        const x = xs[i]!;
        let y = mainSignal(x, breathMod);

        if (cursorAmp.value > 0.01) {
          y += ampPx * 0.5 * cursorAmp.value * gaussian(x - cursorPos.x, CURSOR_SIGMA) * Math.sin((x - phaseOffset) * 0.16 + elapsed * 7);
        }

        for (const s of spikes) {
          if (!s.active) continue;
          const p = Math.max(0, Math.min(1, (elapsed - s.startTime) / SPIKE_DURATION));
          const spikeX = s.x0 + p * (width + GLOW_BAND * 2) - GLOW_BAND;
          const env = gaussian(p - 0.35, 0.22);
          y += s.sign * ampPx * 1.7 * env * gaussian(x - spikeX, SPIKE_SIGMA);
        }

        if (burst.active) {
          const p = (elapsed - burst.startTime) / BURST_DURATION;
          const env = Math.exp(-p * 5) * Math.min(1, p / 0.08);
          y += ampPx * 1.3 * env * gaussian(x - burst.x, BURST_SIGMA);
        }

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(${INK_RGB}, 1)`;
      ctx.lineWidth = MAIN_LINE_WIDTH;
      ctx.stroke();

      if (dt >= 0) {
        glowX = ((elapsed * GLOW_SPEED * speed) % (width + GLOW_BAND * 2)) - GLOW_BAND;
        const gradient = ctx.createLinearGradient(glowX - GLOW_BAND, 0, glowX + GLOW_BAND, 0);
        gradient.addColorStop(0, `rgba(${COPPER_RGB}, 0)`);
        gradient.addColorStop(0.5, `rgba(${COPPER_RGB}, 0.9)`);
        gradient.addColorStop(1, `rgba(${COPPER_RGB}, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = GLOW_WIDTH;
        ctx.stroke();
      }

      if (dt >= 0) {
        for (const s of spikes) {
          if (s.active) {
            const p = (elapsed - s.startTime) / SPIKE_DURATION;
            if (p >= 1) {
              s.active = false;
              s.nextAt = elapsed + SPIKE_MIN_GAP + spikeRng() * (SPIKE_MAX_GAP - SPIKE_MIN_GAP);
            }
          } else if (elapsed >= s.nextAt) {
            s.active = true;
            s.startTime = elapsed;
            s.x0 = -GLOW_BAND;
            s.sign = spikeRng() > 0.5 ? 1 : -1;
          }
        }

        if (burst.active && (elapsed - burst.startTime) / BURST_DURATION >= 1) {
          burst.active = false;
        }
        const req = burstRequestRef.current;
        if (req) {
          burst.active = true;
          burst.startTime = elapsed;
          burst.x = req.xRatio * width;
          burstRequestRef.current = null;
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
        }
      };
    }

    const startTime = performance.now();
    let lastTime = startTime;

    function tick(now: number): void {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      const speedMod = 1 + 0.4 * Math.sin((elapsed * Math.PI * 2) / SPEED_MOD_PERIOD + speedModPhase);
      phaseOffset += TRAVEL_SPEED_BASE * speed * speedMod * dt;
      render(elapsed, dt);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (isInteractive) {
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [
    bucketW,
    bucketH,
    isMobile,
    isAnimated,
    isInteractive,
    inView,
    harmonics,
    secondaryHarmonics,
    amplitude,
    speed,
    showGrid,
    seed,
    sampleCount,
    sizeRef,
  ]);

  return (
    <div ref={sizeRef} className={wrapperClass} aria-hidden="true">
      {size.width > 0 ? <canvas ref={canvasRef} className={styles.canvas} /> : null}
    </div>
  );
});
