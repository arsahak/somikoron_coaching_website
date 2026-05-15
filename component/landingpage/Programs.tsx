"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  Backpack,
  School,
  ClipboardList,
  Languages,
  Calculator,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import type { TranslationKey } from "@/lib/translations";
import { MotionSection, MotionStagger, MotionItem } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import {
  SECTION_CONTAINER,
  SECTION_GAP,
  SECTION_INNER_MT,
  SECTION_PY,
} from "./ui/sectionStyles";

type ProgramItem = {
  title: TranslationKey;
  desc: TranslationKey;
  badge: TranslationKey;
  icon: LucideIcon;
  accent: string;
};

const programs: ProgramItem[] = [
  {
    title: "program1",
    desc: "program1Desc",
    badge: "program1Badge",
    icon: GraduationCap,
    accent: "from-indigo-500 to-blue-600",
  },
  {
    title: "program2",
    desc: "program2Desc",
    badge: "program2Badge",
    icon: BookOpen,
    accent: "from-violet-500 to-purple-600",
  },
  {
    title: "program3",
    desc: "program3Desc",
    badge: "program3Badge",
    icon: Stethoscope,
    accent: "from-rose-500 to-pink-600",
  },
  {
    title: "program4",
    desc: "program4Desc",
    badge: "program4Badge",
    icon: Backpack,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    title: "program5",
    desc: "program5Desc",
    badge: "program5Badge",
    icon: School,
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "program6",
    desc: "program6Desc",
    badge: "program6Badge",
    icon: ClipboardList,
    accent: "from-cyan-500 to-sky-600",
  },
  {
    title: "program7",
    desc: "program7Desc",
    badge: "program7Badge",
    icon: Languages,
    accent: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "program8",
    desc: "program8Desc",
    badge: "program8Badge",
    icon: Calculator,
    accent: "from-slate-600 to-zinc-700",
  },
];

export function Programs() {
  const { tr } = useTranslation();

  return (
    <MotionSection
      id="programs"
      className={`scroll-mt-20 bg-zinc-50 dark:bg-zinc-900/50 ${SECTION_PY}`}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("programsLabel")}
          title={tr("programsTitle")}
          subtitle={tr("programsSubtitle")}
        />

        <MotionStagger className={`grid ${SECTION_GAP} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <MotionItem key={program.title}>
                <motion.a
                  href="#inquiry"
                  whileHover={{ y: -4 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-indigo-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-600"
                >
                  <div
                    className={`flex items-center justify-between bg-gradient-to-r ${program.accent} px-5 py-4`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {tr(program.badge)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug text-zinc-900 dark:text-white">
                      {tr(program.title)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {tr(program.desc)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition group-hover:gap-2.5 dark:text-indigo-400">
                      {tr("programEnroll")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.a>
              </MotionItem>
            );
          })}
        </MotionStagger>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`${SECTION_INNER_MT} text-center text-sm text-zinc-500 dark:text-zinc-400`}
        >
          {tr("inquirySubtitle")}
        </motion.p>
      </div>
    </MotionSection>
  );
}
