"use client";

import {
  BookOpen,
  ClipboardCheck,
  LineChart,
  HeartHandshake,
  Users,
  MessageSquare,
  School,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import type { TranslationKey } from "@/lib/translations";
import { MotionSection, MotionStagger, MotionItem } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import { SECTION_CONTAINER, SECTION_GAP, SECTION_PY } from "./ui/sectionStyles";

const features: {
  icon: LucideIcon;
  title: TranslationKey;
  desc: TranslationKey;
}[] = [
  { icon: BookOpen, title: "feature1Title", desc: "feature1Desc" },
  { icon: ClipboardCheck, title: "feature2Title", desc: "feature2Desc" },
  { icon: LineChart, title: "feature3Title", desc: "feature3Desc" },
  { icon: HeartHandshake, title: "feature4Title", desc: "feature4Desc" },
  { icon: Users, title: "feature5Title", desc: "feature5Desc" },
  { icon: MessageSquare, title: "feature6Title", desc: "feature6Desc" },
  { icon: School, title: "feature7Title", desc: "feature7Desc" },
  { icon: Wallet, title: "feature8Title", desc: "feature8Desc" },
];

export function Features() {
  const { tr } = useTranslation();

  return (
    <MotionSection id="features" className={`scroll-mt-20 ${SECTION_PY}`}>
      <div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("featuresLabel")}
          title={tr("featuresTitle")}
          subtitle={tr("featuresSubtitle")}
        />

        <MotionStagger className={`grid ${SECTION_GAP} sm:grid-cols-2 lg:grid-cols-4`}>
          {features.map(({ icon: Icon, title, desc }) => (
            <MotionItem key={title}>
              <div className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-600">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:scale-110 dark:bg-indigo-950 dark:text-indigo-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  {tr(title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {tr(desc)}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
