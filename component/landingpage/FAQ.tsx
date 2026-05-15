"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import type { TranslationKey } from "@/lib/translations";
import { MotionSection } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import { SECTION_CONTAINER, SECTION_GAP, SECTION_PY } from "./ui/sectionStyles";

const faqs: { id: string; q: TranslationKey; a: TranslationKey }[] = [
  { id: "1", q: "faq1Q", a: "faq1A" },
  { id: "2", q: "faq2Q", a: "faq2A" },
  { id: "3", q: "faq3Q", a: "faq3A" },
  { id: "4", q: "faq4Q", a: "faq4A" },
  { id: "5", q: "faq5Q", a: "faq5A" },
  { id: "6", q: "faq6Q", a: "faq6A" },
  { id: "7", q: "faq7Q", a: "faq7A" },
  { id: "8", q: "faq8Q", a: "faq8A" },
];

export function FAQ() {
  const { tr } = useTranslation();
  const [openId, setOpenId] = useState<string | null>("1");

  return (
    <MotionSection className={`bg-zinc-50 dark:bg-zinc-900/50 ${SECTION_PY}`}>
      <div className={SECTION_CONTAINER}>
        <SectionHeading label={tr("faqLabel")} title={tr("faqTitle")} />

        <div className={`grid ${SECTION_GAP} md:grid-cols-2`}>
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={tr(faq.q)}
              answer={tr(faq.a)}
              isOpen={openId === faq.id}
              onToggle={() =>
                setOpenId((prev) => (prev === faq.id ? null : faq.id))
              }
            />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="h-fit overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left font-semibold text-zinc-900 dark:text-white"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-snug sm:text-base">{question}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-200 dark:text-indigo-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="border-t border-zinc-100 px-5 py-4 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
