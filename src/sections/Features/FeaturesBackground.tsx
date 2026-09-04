import { Oscilloscope } from "../../components/Oscilloscope/Oscilloscope";
import styles from "./FeaturesBackground.module.css";

/** Muted, static reuse of the hero's oscilloscope signal — no motion, just faint texture. */
export function FeaturesBackground() {
  return (
    <Oscilloscope
      className={styles.wave!}
      seed={2}
      lineCount={1}
      amplitude={0.6}
      showGrid={false}
      animated={false}
      interactive={false}
    />
  );
}
