import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import styles from "./Header.module.css";

const NAV_TARGETS = ["servicios", "trabajos", "proyectos", "contacto"] as const;

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const focusable = () =>
      menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      ) ?? [];
    focusable()[0]?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    mediaQuery.addEventListener("change", handleDesktop);

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      mediaQuery.removeEventListener("change", handleDesktop);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

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
        <button
          type="button"
          ref={toggleRef}
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? `${styles.burger} ${styles.burgerOpen}` : styles.burger} aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
          <nav id="mobile-menu" ref={menuRef} className={styles.mobileMenu} aria-label="Main">
            {t.header.nav.map((item, index) => (
              <a
                key={item}
                className={styles.mobileNavLink}
                href={`#${NAV_TARGETS[index]}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              className={styles.mobileCta}
              href="#contacto"
              onClick={() => setMenuOpen(false)}
            >
              {t.header.cta}
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
