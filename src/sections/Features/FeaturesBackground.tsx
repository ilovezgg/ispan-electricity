import { WaveInterference } from "../../components/WaveInterference/WaveInterference";
import styles from "./FeaturesBackground.module.css";

/** Muted, static reuse of the hero's wave-interference pattern — no motion, just faint texture. */
export function FeaturesBackground() {
  return (
    <WaveInterference
      className={styles.wave!}
      seed={2}
      sourceCount={2}
      intensity={0.55}
      animated={false}
      interactive={false}
    />
  );
}
