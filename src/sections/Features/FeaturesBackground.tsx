import { CircuitPattern } from "../../components/CircuitPattern/CircuitPattern";
import styles from "./FeaturesBackground.module.css";

/** Muted, static reuse of the hero's circuit pattern — no pulses, just faint board texture. */
export function FeaturesBackground() {
  return <CircuitPattern className={styles.wave!} seed={2} density={0.45} intensity={0.05} animated={false} />;
}
