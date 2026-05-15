"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
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

const testimonialKeys: { text: TranslationKey; author: TranslationKey }[] = [
  { text: "testimonial1", author: "testimonial1Author" },
  { text: "testimonial2", author: "testimonial2Author" },
  { text: "testimonial3", author: "testimonial3Author" },
  { text: "testimonial4", author: "testimonial4Author" },
  { text: "testimonial5", author: "testimonial5Author" },
  { text: "testimonial6", author: "testimonial6Author" },
];

export function Testimonials() {
  const { tr } = useTranslation();

  return (
    <MotionSection className={`overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 ${SECTION_PY}`}>
      <motion.div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("testimonialsLabel")}
          title={tr("testimonialsTitle")}
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
          slidesPerView={1.1}
          centeredSlides
          grabCursor
          breakpoints={{
            640: { slidesPerView: 1.6, spaceBetween: 16 },
            768: { slidesPerView: 2.2, spaceBetween: 16 },
            1024: { slidesPerView: 2.8, spaceBetween: 16 },
            1280: { slidesPerView: 3.2, spaceBetween: 16 },
          }}
          className={`testimonials-swiper !overflow-visible ${SWIPER_EDGE_PADDING}`}
        >
          {testimonialKeys.map((item, i) => (
            <SwiperSlide key={item.text} className="!h-auto">
              <TestimonialCard
                text={tr(item.text)}
                author={tr(item.author)}
                index={i}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </MotionSection>
  );
}

function TestimonialCard({
  text,
  author,
  index,
}: {
  text: string;
  author: string;
  index: number;
}) {
  return (
    <blockquote className="relative flex h-full min-h-[220px] flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/50 sm:p-8 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none">
      <Quote className="absolute right-5 top-5 h-9 w-9 text-indigo-100 dark:text-indigo-950" />
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
            aria-hidden
          />
        ))}
      </div>
      <p className="relative flex-1 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-5 border-t border-zinc-100 pt-4 text-sm font-semibold text-indigo-600 dark:border-zinc-800 dark:text-indigo-400">
        {author}
      </footer>
      <span className="sr-only">Testimonial {index + 1}</span>
    </blockquote>
  );
}
