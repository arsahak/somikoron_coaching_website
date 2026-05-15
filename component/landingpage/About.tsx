"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  ClipboardCheck,
  MessageSquare,
  Monitor,
  GraduationCap,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import type { TranslationKey } from "@/lib/translations";
import { MotionSection, MotionStagger, MotionItem } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import {
  SECTION_CONTAINER,
  SECTION_GAP,
  SECTION_GAP_LG,
  SECTION_INNER_MT,
  SECTION_PY,
} from "./ui/sectionStyles";

const highlights: {
  icon: LucideIcon;
  title: TranslationKey;
  desc: TranslationKey;
}[] = [
  { icon: Users, title: "aboutPoint1Title", desc: "aboutPoint1Desc" },
  { icon: ClipboardCheck, title: "aboutPoint2Title", desc: "aboutPoint2Desc" },
  { icon: MessageSquare, title: "aboutPoint3Title", desc: "aboutPoint3Desc" },
  { icon: Monitor, title: "aboutPoint4Title", desc: "aboutPoint4Desc" },
  { icon: GraduationCap, title: "aboutPoint5Title", desc: "aboutPoint5Desc" },
  { icon: ShieldCheck, title: "aboutPoint6Title", desc: "aboutPoint6Desc" },
];

const stats: { value: TranslationKey; label: TranslationKey }[] = [
  { value: "aboutStatFounded", label: "aboutStatFoundedLabel" },
  { value: "aboutStatStudents", label: "aboutStatStudentsLabel" },
  { value: "aboutStatSuccess", label: "aboutStatSuccessLabel" },
  { value: "aboutStatYears", label: "aboutStatYearsLabel" },
];

export function About() {
  const { tr } = useTranslation();

  return (
    <MotionSection
      id="about"
      className={`scroll-mt-20 bg-zinc-50 dark:bg-zinc-900/50 ${SECTION_PY}`}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("aboutLabel")}
          title={tr("aboutTitle")}
          subtitle={tr("aboutDesc")}
        />

        <motion.div className={`${SECTION_INNER_MT} grid ${SECTION_GAP_LG} lg:grid-cols-12`}>
          <motion.div
            className="space-y-4 sm:space-y-6 lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Target className="h-5 w-5" />
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  {tr("aboutMissionTitle")}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {tr("aboutMissionText")}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Eye className="h-5 w-5" />
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  {tr("aboutVisionTitle")}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {tr("aboutVisionText")}
              </p>
            </div>

            <div className={`grid grid-cols-2 ${SECTION_GAP}`}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-indigo-100 bg-indigo-50/80 px-4 py-4 text-center dark:border-indigo-900 dark:bg-indigo-950/40"
                >
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {tr(stat.value)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {tr(stat.label)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <MotionStagger className={`grid ${SECTION_GAP} sm:grid-cols-2 lg:col-span-7`}>
            {highlights.map(({ icon: Icon, title, desc }) => (
              <MotionItem key={title}>
                <div className={`flex h-full ${SECTION_GAP} rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-5`}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">
                      {tr(title)}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {tr(desc)}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </motion.div>
      </div>
    </MotionSection>
  );
}
