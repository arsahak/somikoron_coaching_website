"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, MapPin, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import {
  submitInquiry,
  validateInquiryClient,
  type InquiryFormData,
} from "@/lib/inquiry";
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

function readFormData(form: HTMLFormElement): InquiryFormData {
  const data = new FormData(form);
  return {
    studentName: (data.get("studentName") as string).trim(),
    parentName: (data.get("parentName") as string).trim(),
    phone: (data.get("phone") as string).trim(),
    email: (data.get("email") as string).trim(),
    desiredClass: (data.get("desiredClass") as string).trim(),
    message: (data.get("message") as string).trim(),
  };
}

export function InquiryForm() {
  const { tr } = useTranslation();
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const clearFeedback = () => {
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
    setServerError("");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = readFormData(form);

    const nextErrors = validateInquiryClient(payload, {
      required: tr("formRequired"),
      phoneInvalid: tr("formPhoneInvalid"),
      emailInvalid: tr("formEmailInvalid"),
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setServerError("");
      setStatus("idle");
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("loading");

    const result = await submitInquiry(payload);

    if (result.ok) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("error");
    setServerError(result.message);
    if (result.field) {
      setErrors((prev) => ({ ...prev, [result.field!]: result.message }));
    }
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white";

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
          className={`${SECTION_INNER_MT} grid items-stretch ${SECTION_GAP_LG} lg:grid-cols-2`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.div className="mb-4 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {tr("inquiryMapTitle")}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {tr("inquiryMapAddress")}
                </p>
              </div>
            </motion.div>

            <motion.div className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg dark:border-zinc-700 sm:min-h-[420px]">
              <iframe
                title={tr("inquiryMapTitle")}
                src={MAP_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

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

          <motion.form
            onSubmit={handleSubmit}
            onChange={clearFeedback}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-8"
            noValidate
          >
            <div className={`grid ${SECTION_GAP} sm:grid-cols-2`}>
              <Field
                label={tr("formStudentName")}
                name="studentName"
                error={errors.studentName}
                inputClass={inputClass}
                disabled={status === "loading"}
                required
              />
              <Field
                label={tr("formParentName")}
                name="parentName"
                error={errors.parentName}
                inputClass={inputClass}
                disabled={status === "loading"}
                required
              />
              <Field
                label={tr("formPhone")}
                name="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                error={errors.phone}
                inputClass={inputClass}
                disabled={status === "loading"}
                required
              />
              <Field
                label={tr("formEmail")}
                name="email"
                type="email"
                error={errors.email}
                inputClass={inputClass}
                disabled={status === "loading"}
              />
              <div className="sm:col-span-2">
                <Field
                  label={tr("formClass")}
                  name="desiredClass"
                  error={errors.desiredClass}
                  inputClass={inputClass}
                  disabled={status === "loading"}
                  required
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
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </div>
            </div>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
                role="status"
              >
                <CheckCircle className="h-4 w-4 shrink-0" />
                {tr("formSuccess")}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError || tr("formError")}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
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
  placeholder,
  error,
  inputClass,
  disabled,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  inputClass: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
