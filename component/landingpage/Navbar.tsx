"use client";

import { useTheme } from "@/lib/ThemeContext";
import { useTranslation } from "@/lib/useTranslation";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Languages, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SECTION_CONTAINER } from "./ui/sectionStyles";
const navLinks = [
  { href: "#home", key: "navHome" as const },
  { href: "#about", key: "navAbout" as const },
  { href: "#teachers", key: "navTeachers" as const },
  { href: "#programs", key: "navPrograms" as const },
  { href: "#inquiry", key: "navAdmission" as const },
];

export function Navbar() {
  const { tr, lang, setLanguage } = useTranslation();
  const { theme, toggleTheme, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    setLanguage(lang === "bn" ? "en" : "bn");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex h-16 items-center justify-between ${SECTION_CONTAINER}`}
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg">{tr("brand")}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
            >
              {tr(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            {lang === "bn" ? tr("langEn") : tr("langBn")}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <a
            href="#inquiry"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
          >
            {tr("ctaEnroll")}
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
          >
            <motion.div className="flex flex-col gap-1 px-2 py-4 sm:px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {tr(link.key)}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2 text-sm dark:border-zinc-700"
                >
                  <Languages className="h-4 w-4" />
                  {lang === "bn" ? tr("langEn") : tr("langBn")}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-lg border border-zinc-200 p-2 dark:border-zinc-700"
                  aria-label="Toggle theme"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <a
                href="#inquiry"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-indigo-600 py-3 text-center text-sm font-semibold text-white"
              >
                {tr("ctaEnroll")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
