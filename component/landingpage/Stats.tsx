"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { SECTION_CONTAINER, SECTION_GAP } from "./ui/sectionStyles";

const items = [
  { value: "২,৫০০+", key: "statsStudents" as const },
  { value: "৪৫+", key: "statsTeachers" as const },
  { value: "১০+", key: "statsYears" as const },
  { value: "৯৮%", key: "statsSuccess" as const },
];

export function Stats() {
  const { tr } = useTranslation();

  return (
    <section className="border-y border-indigo-100 bg-indigo-600 py-10 dark:border-indigo-900 dark:bg-indigo-700 sm:py-12">
      <motion.div className={`${SECTION_CONTAINER} grid grid-cols-2 sm:grid-cols-4 ${SECTION_GAP}`}>
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl font-bold text-white sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-indigo-100">{tr(item.key)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
