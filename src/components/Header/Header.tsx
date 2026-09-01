import { useTranslation } from "../../i18n/useTranslation";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <span className={styles.logo}>{t.header.logo}</span>

      <nav className={styles.nav} aria-label="Main">
        {t.header.nav.map((item) => (
          <a key={item} className={styles.navLink} href="#">
            {item}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <LangSwitcher />
        <a className={styles.cta} href="#contacto">
          {t.header.cta}
        </a>
      </div>
    </header>
  );
}
