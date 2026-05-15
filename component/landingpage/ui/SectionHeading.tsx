"use client";

import { motion } from "framer-motion";
import { SECTION_HEADING_MB } from "./sectionStyles";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`${SECTION_HEADING_MB} max-w-2xl ${alignClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        {label}
      </span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:mt-4 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 sm:mt-3 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
