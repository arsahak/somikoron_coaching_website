"use client";

import { t, type TranslationKey } from "./translations";
import { useLanguage } from "./LanguageContext";

export function useTranslation() {
  const { language, setLanguage } = useLanguage();
  return {
    lang: language,
    setLanguage,
    tr: (key: TranslationKey) => t(language, key),
  };
}
