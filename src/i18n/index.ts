import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";

export const LANGUAGE_STORAGE_KEY = "i18nextLng";
export const supportedLanguages = ["en", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = "en";

export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

export { en, es };

export function getStoredLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return defaultLanguage;
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY)?.startsWith("es") ? "es" : "en";
}

if (!i18n.isInitialized) {
  void i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
  });
}

export default i18n;
