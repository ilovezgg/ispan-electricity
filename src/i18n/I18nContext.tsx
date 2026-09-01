import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations } from "./translations";
import { SUPPORTED_LOCALES } from "./locales";
import type { Locale, Translation } from "./types";

const STORAGE_KEY = "voltia-locale";
const DEFAULT_LOCALE: Locale = "es";

function isLocale(value: string | null): value is Locale {
  return value !== null && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

export interface I18nContextValue {
  readonly locale: Locale;
  readonly t: Translation;
  readonly setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  readonly children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = translations[locale].meta.htmlLang;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: translations[locale], setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
