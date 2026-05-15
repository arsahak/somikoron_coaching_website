"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { TranslationKey } from "@/lib/translations";
import { useTranslation } from "@/lib/useTranslation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LineChart,
  Sparkles,
} from "lucide-react";
import {
  SECTION_CONTAINER,
  SECTION_GAP,
  SECTION_GAP_LG,
} from "./ui/sectionStyles";

const stats: { valueKey: TranslationKey; labelKey: TranslationKey }[] = [
  { valueKey: "heroStatStudentsValue", labelKey: "heroStatStudents" },
  { valueKey: "heroStatSuccessValue", labelKey: "heroStatSuccess" },
  { valueKey: "heroStatTeachersValue", labelKey: "heroStatTeachers" },
];

const graphics: {
  icon: typeof BookOpen;
  labelKey: TranslationKey;
  className: string;
  delay: number;
}[] = [
  {
    icon: BookOpen,
    labelKey: "heroGraphicStudy",
    className: "left-0 top-0",
    delay: 0.5,
  },
  {
    icon: ClipboardCheck,
    labelKey: "heroGraphicTests",
    className: "right-0 top-4",
    delay: 0.6,
  },
  {
    icon: LineChart,
    labelKey: "heroGraphicTrack",
    className: "bottom-4 left-2",
    delay: 0.7,
  },
  {
    icon: Award,
    labelKey: "heroGraphicSuccess",
    className: "bottom-0 right-0",
    delay: 0.8,
  },
];

export function Hero() {
  const { tr } = useTranslation();
  const { language } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-20 pb-8 sm:pt-32 sm:pb-20"
    >
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
        aria-hidden
      />

      <div className={`relative ${SECTION_CONTAINER}`}>
        <div className={`grid items-center ${SECTION_GAP_LG} lg:grid-cols-2`}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300"
            >
              <Sparkles className="h-4 w-4" />
              {tr("heroBadge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {tr("heroTitle")}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {tr("heroTitleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {tr("heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 flex flex-wrap ${SECTION_GAP} sm:mt-8`}
            >
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:bg-indigo-500"
              >
                {tr("ctaEnroll")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {tr("ctaLearnMore")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className={`mt-6 grid grid-cols-3 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:mt-8 sm:pt-4 ${SECTION_GAP}`}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <p
                    className="text-2xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400 sm:text-3xl"
                    lang={language}
                  >
                    {tr(stat.valueKey)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    {tr(stat.labelKey)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero visual — icon graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square w-full"
            >
              {/* Background rings */}
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/60 dark:to-violet-950/60" />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/40">
                  <GraduationCap
                    className="h-14 w-14 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Corner icon cards */}
              {graphics.map(({ icon: Icon, labelKey, className, delay }) => (
                <motion.div
                  key={labelKey}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay }}
                  className={`absolute ${className}`}
                >
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {tr(labelKey)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* GPA badge */}
              <motion.div
                className="absolute -right-2 top-1/4 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {tr("heroGpaBadge")}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
