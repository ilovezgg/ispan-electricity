import { useTranslation, SUPPORTED_LOCALES } from "../../i18n/useTranslation";
import type { Locale } from "../../i18n/types";
import styles from "./LangSwitcher.module.css";

const LOCALE_LABEL: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  ru: "RU",
};

export function LangSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {SUPPORTED_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={code === locale ? styles.active : styles.option}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {LOCALE_LABEL[code]}
        </button>
      ))}
    </div>
  );
}
