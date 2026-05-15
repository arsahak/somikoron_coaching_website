"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslation } from "@/lib/useTranslation";
import type { TranslationKey } from "@/lib/translations";
import { MotionSection } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import {
  SECTION_CONTAINER,
  SECTION_INNER_MT,
  SECTION_PY,
  SWIPER_EDGE_PADDING,
} from "./ui/sectionStyles";

import "swiper/css";
import "swiper/css/pagination";

type TeacherItem = {
  name: TranslationKey;
  role: TranslationKey;
  subject: TranslationKey;
  initials: string;
  color: string;
};

const teachers: TeacherItem[] = [
  {
    name: "teacher1Name",
    role: "teacher1Role",
    subject: "teacher1Subject",
    initials: "রু",
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "teacher2Name",
    role: "teacher2Role",
    subject: "teacher2Subject",
    initials: "ফা",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "teacher3Name",
    role: "teacher3Role",
    subject: "teacher3Subject",
    initials: "খ",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "teacher4Name",
    role: "teacher4Role",
    subject: "teacher4Subject",
    initials: "নু",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "teacher5Name",
    role: "teacher5Role",
    subject: "teacher5Subject",
    initials: "সা",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "teacher6Name",
    role: "teacher6Role",
    subject: "teacher6Subject",
    initials: "আ",
    color: "from-cyan-500 to-sky-600",
  },
  {
    name: "teacher7Name",
    role: "teacher7Role",
    subject: "teacher7Subject",
    initials: "ত",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    name: "teacher8Name",
    role: "teacher8Role",
    subject: "teacher8Subject",
    initials: "জ",
    color: "from-slate-600 to-zinc-700",
  },
];

export function Teachers() {
  const { tr } = useTranslation();

  return (
    <MotionSection
      id="teachers"
      className={`scroll-mt-20 overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 ${SECTION_PY}`}
    >
      <motion.div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("teachersLabel")}
          title={tr("teachersTitle")}
          subtitle={tr("teachersSubtitle")}
        />
      </motion.div>

      <motion.div
        className={`relative w-full ${SECTION_INNER_MT}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          speed={500}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          spaceBetween={8}
          breakpoints={{ 640: { spaceBetween: 16 } }}
          slidesPerView="auto"
          centeredSlides
          grabCursor
          className={`teachers-swiper !overflow-visible ${SWIPER_EDGE_PADDING}`}
        >
          {teachers.map((teacher) => (
            <SwiperSlide key={teacher.name} className="!h-auto !w-[300px]">
              <TeacherCard
                name={tr(teacher.name)}
                role={tr(teacher.role)}
                subject={tr(teacher.subject)}
                initials={teacher.initials}
                color={teacher.color}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </MotionSection>
  );
}

function TeacherCard({
  name,
  role,
  subject,
  initials,
  color,
}: {
  name: string;
  role: string;
  subject: string;
  initials: string;
  color: string;
}) {
  return (
    <article className="group h-full w-[300px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-indigo-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-indigo-600">
      <div
        className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${color} text-3xl font-bold text-white sm:h-32 sm:text-4xl`}
      >
        {initials}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {subject}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold leading-snug text-zinc-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {role}
        </p>
      </div>
    </article>
  );
}
