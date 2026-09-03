import { useMemo } from "react";
import { generateShadowPath, VIEWBOX_HEIGHT, VIEWBOX_WIDTH } from "../Hero/cableGeometry";
import styles from "./FeaturesBackground.module.css";

/**
 * The same fallen-log spine curve as the hero cable bundle, reduced to a
 * single faint silhouette — no strands, no motion. Just a mass of weight
 * sitting low behind the cards.
 */
export function FeaturesBackground() {
  const path = useMemo(() => generateShadowPath(), []);

  return (
    <svg
      className={styles.wave}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
      aria-hidden="true"
    >
      <path d={path} fill="none" stroke="#6b5c4a" strokeOpacity="0.06" strokeWidth={220} strokeLinecap="round" />
    </svg>
  );
}
