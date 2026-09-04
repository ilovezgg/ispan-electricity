import { useTranslation } from "../../i18n/useTranslation";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo} aria-label={t.header.logo}>
        <img src="/images/logo.png" alt="" />
      </a>

      <nav className={styles.nav} aria-label="Main">
        {t.header.nav.map((item) => (
          <a key={item} className={styles.navLink} href="#">
            {item}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <LangSwitcher />
        <a className={styles.cta} href="#contacto" data-circuit-target="cta">
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
