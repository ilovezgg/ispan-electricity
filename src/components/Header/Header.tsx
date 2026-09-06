import { useTranslation } from "../../i18n/useTranslation";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import styles from "./Header.module.css";

const NAV_TARGETS = ["servicios", "trabajos", "proyectos", "contacto"] as const;

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo} aria-label={t.header.logo}>
        <img src="/images/logo.png" alt="" />
      </a>

      <nav className={styles.nav} aria-label="Main">
        {t.header.nav.map((item, index) => (
          <a key={item} className={styles.navLink} href={`#${NAV_TARGETS[index]}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <LangSwitcher />
        <a className={styles.cta} href="#contacto" data-oscilloscope-target="cta">
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
