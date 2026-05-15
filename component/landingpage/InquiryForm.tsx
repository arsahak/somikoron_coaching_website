"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, MapPin, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { MotionSection } from "./ui/MotionSection";
import { SectionHeading } from "./ui/SectionHeading";
import {
  SECTION_CONTAINER,
  SECTION_GAP,
  SECTION_GAP_LG,
  SECTION_INNER_MT,
  SECTION_PY,
} from "./ui/sectionStyles";

const MAP_QUERY = "Birganj, Dinajpur, Bangladesh";
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&hl=en&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

type FormState = "idle" | "loading" | "success" | "error";

export function InquiryForm() {
  const { tr } = useTranslation();
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      studentName: (data.get("studentName") as string).trim(),
      parentName: (data.get("parentName") as string).trim(),
      phone: (data.get("phone") as string).trim(),
      email: (data.get("email") as string).trim(),
      desiredClass: (data.get("desiredClass") as string).trim(),
      message: (data.get("message") as string).trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (!payload.studentName) nextErrors.studentName = tr("formRequired");
    if (!payload.parentName) nextErrors.parentName = tr("formRequired");
    if (!payload.phone) nextErrors.phone = tr("formRequired");
    if (!payload.desiredClass) nextErrors.desiredClass = tr("formRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white";

  return (
    <MotionSection
      id="inquiry"
      className={`scroll-mt-20 bg-gradient-to-b from-indigo-50/80 to-white dark:from-indigo-950/30 dark:to-zinc-950 ${SECTION_PY}`}
    >
      <motion.div className={SECTION_CONTAINER}>
        <SectionHeading
          label={tr("inquiryLabel")}
          title={tr("inquiryTitle")}
          subtitle={tr("inquirySubtitle")}
          align="left"
        />

        <motion.div
          className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left — Google Map */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {tr("inquiryMapTitle")}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {tr("inquiryMapAddress")}
                </p>
              </div>
            </div>

            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg dark:border-zinc-700 sm:min-h-[420px]">
              <iframe
                title={tr("inquiryMapTitle")}
                src={MAP_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {tr("inquiryOpenMaps")}
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-8"
          >
            <div className={`grid ${SECTION_GAP} sm:grid-cols-2`}>
              <Field
                label={tr("formStudentName")}
                name="studentName"
                error={errors.studentName}
                inputClass={inputClass}
              />
              <Field
                label={tr("formParentName")}
                name="parentName"
                error={errors.parentName}
                inputClass={inputClass}
              />
              <Field
                label={tr("formPhone")}
                name="phone"
                type="tel"
                error={errors.phone}
                inputClass={inputClass}
              />
              <Field
                label={tr("formEmail")}
                name="email"
                type="email"
                inputClass={inputClass}
              />
              <div className="sm:col-span-2">
                <Field
                  label={tr("formClass")}
                  name="desiredClass"
                  error={errors.desiredClass}
                  inputClass={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tr("formMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle className="h-4 w-4" />
                {tr("formSuccess")}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-sm text-red-600"
              >
                <AlertCircle className="h-4 w-4" />
                {tr("formError")}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === "loading" ? tr("formSubmitting") : tr("formSubmit")}
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </MotionSection>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  inputClass,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  inputClass: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input id={name} name={name} type={type} className={inputClass} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
