import { useMemo, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { usePointerParallax } from "../../hooks/usePointerParallax";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  COPPER_FADE_GRADIENT_ID,
  MOBILE_STRAND_COUNT,
  STRAND_SHEEN_GRADIENT_ID,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  generateShadowPath,
  generateStrands,
  type Strand,
  type StrandLayer,
} from "./cableGeometry";
import styles from "./CableBundle.module.css";

const MOBILE_QUERY = "(max-width: 640px)";

interface StrandStyle extends CSSProperties {
  readonly "--sway-duration"?: string;
  readonly "--sway-delay"?: string;
  readonly "--sway-amplitude"?: string;
  readonly "--enter-delay"?: string;
  readonly "--pulse-duration"?: string;
  readonly "--pulse-delay"?: string;
  readonly "--parallax-depth"?: string;
}

export function CableBundle() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const parallaxRef = usePointerParallax<HTMLDivElement>(!reducedMotion);

  const strands = useMemo(
    () => generateStrands(isMobile ? MOBILE_STRAND_COUNT : undefined),
    [isMobile],
  );
  const shadowPath = useMemo(() => generateShadowPath(), []);

  const layers: Record<StrandLayer, ReactNode[]> = { back: [], mid: [], front: [] };

  for (const strand of strands) {
    const style: StrandStyle = reducedMotion
      ? {}
      : {
          "--sway-duration": `${strand.swayDuration}s`,
          "--sway-delay": `${strand.swayDelay}s`,
          "--sway-amplitude": `${strand.swayAmplitude}px`,
          "--enter-delay": `${strand.enterDelay}s`,
          "--pulse-duration": `${strand.pulseDuration}s`,
          "--pulse-delay": `${strand.pulseDelay}s`,
          "--parallax-depth": `${(2 + strand.reach * 7).toFixed(2)}`,
        };

    const enterClass = reducedMotion ? "" : styles.enter;
    const parallaxClass = reducedMotion ? "" : styles.parallax;
    const swayClass = reducedMotion ? "" : styles.sway;

    for (const [segmentIndex, segment] of strand.segments.entries()) {
      layers[segment.layer].push(
        <g key={`${strand.id}-${segmentIndex}`} className={enterClass} style={style}>
          <g className={parallaxClass}>
            <g className={swayClass}>
              <path
                d={segment.d}
                fill="none"
                stroke={strand.stroke}
                strokeWidth={strand.strokeWidth}
                strokeLinecap="round"
              />
              {strand.hasSheen ? (
                <path
                  d={segment.d}
                  fill="none"
                  stroke={`url(#${STRAND_SHEEN_GRADIENT_ID})`}
                  strokeWidth={strand.strokeWidth * 0.85}
                  strokeLinecap="round"
                  className={styles.sheen}
                />
              ) : null}
            </g>
          </g>
        </g>,
      );
    }

    if (strand.hasPulse && !reducedMotion) {
      layers.front.push(
        <PulseOverlay key={`${strand.id}-pulse`} strand={strand} style={style} enterClass={enterClass} />,
      );
    }
  }

  return (
    <div ref={parallaxRef} className={styles.wrapper} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio={isMobile ? "xMidYMid slice" : "xMidYMid meet"}
        focusable="false"
      >
        <defs>
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="cableShadow" x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <linearGradient id={COPPER_FADE_GRADIENT_ID} gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="380" y2="0">
            <stop offset="0%" stopColor="#E0995E" />
            <stop offset="45%" stopColor="#B87333" />
            <stop offset="100%" stopColor="#1a1a1c" />
          </linearGradient>
          <linearGradient id={STRAND_SHEEN_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        <path
          d={shadowPath}
          fill="none"
          stroke="#4a4038"
          strokeOpacity="0.22"
          strokeWidth={46}
          strokeLinecap="round"
          filter="url(#cableShadow)"
        />

        <g>{layers.back}</g>
        <g>{layers.mid}</g>
        <g>{layers.front}</g>
      </svg>
    </div>
  );
}

function PulseOverlay({
  strand,
  style,
  enterClass,
}: {
  strand: Strand;
  style: StrandStyle;
  enterClass: string | undefined;
}) {
  return (
    <g className={enterClass} style={style}>
      <g className={styles.parallax}>
        <g className={styles.sway}>
          <path
            d={strand.fullPath}
            fill="none"
            stroke="#F3B27A"
            strokeWidth={Math.max(strand.strokeWidth * 0.55, 1)}
            strokeLinecap="round"
            strokeDasharray="2 340"
            filter="url(#cableGlow)"
            className={styles.pulse}
          />
        </g>
      </g>
    </g>
  );
}
