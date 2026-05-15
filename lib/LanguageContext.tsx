"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./translations";

interface LanguageContextType {
  language: Lang;
  setLanguage: (language: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Lang>("bn");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("landing-lang");
    if (saved === "en" || saved === "bn") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = "bn";
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    localStorage.setItem("landing-lang", lang);
    document.documentElement.lang = lang;
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "bn", setLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
