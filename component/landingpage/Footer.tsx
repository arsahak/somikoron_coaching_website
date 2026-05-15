"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ArrowRight,
  Share2,
  PlayCircle,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import {
  SECTION_CONTAINER,
  SECTION_GAP,
  SECTION_GAP_LG,
  SECTION_INNER_MT,
} from "./ui/sectionStyles";

const quickLinks = [
  { href: "#home", key: "navHome" as const },
  { href: "#about", key: "navAbout" as const },
  { href: "#teachers", key: "navTeachers" as const },
  { href: "#programs", key: "navPrograms" as const },
  { href: "#inquiry", key: "navAdmission" as const },
] as const;

const programLinks = [
  { href: "#programs", key: "program1" as const },
  { href: "#programs", key: "program2" as const },
  { href: "#programs", key: "program3" as const },
  { href: "#programs", key: "program4" as const },
] as const;

const socialLinks = [
  { href: "https://facebook.com", icon: Share2, label: "Facebook" },
  { href: "https://youtube.com", icon: PlayCircle, label: "YouTube" },
  { href: "https://wa.me/8801700000000", icon: MessageCircle, label: "WhatsApp" },
] as const;

export function Footer() {
  const { tr } = useTranslation();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="scroll-mt-20">
      {/* CTA band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className={`relative flex flex-col items-center justify-between py-8 sm:flex-row ${SECTION_CONTAINER} ${SECTION_GAP_LG}`}>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {tr("footerCtaTitle")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-indigo-100 sm:text-base">
              {tr("footerCtaDesc")}
            </p>
          </div>
          <a
            href="#inquiry"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            {tr("ctaEnroll")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* Main footer */}
      <div className="relative border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
          aria-hidden
        />

        <motion.div
          className={`relative py-10 ${SECTION_CONTAINER}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className={`grid sm:grid-cols-2 lg:grid-cols-12 ${SECTION_GAP_LG}`}>
            {/* Brand */}
            <div className="lg:col-span-4">
              <a
                href="#home"
                className="inline-flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="text-lg">{tr("brand")}</span>
              </a>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {tr("footerTagline")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {tr("footerDesc")}
              </p>
              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                {tr("footerQuickLinks")}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href + link.key}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      {tr(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                {tr("footerProgramsTitle")}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {programLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      {tr(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                {tr("footerContact")}
              </h4>
              <ul className="mt-4 space-y-3.5">
                <ContactItem icon={MapPin}>{tr("footerAddress")}</ContactItem>
                <ContactItem
                  icon={Phone}
                  href={`tel:${tr("footerPhone").replace(/[\s-]/g, "")}`}
                >
                  {tr("footerPhone")}
                </ContactItem>
                <ContactItem icon={Mail} href={`mailto:${tr("footerEmail")}`}>
                  {tr("footerEmail")}
                </ContactItem>
                <ContactItem icon={Clock}>{tr("footerHoursValue")}</ContactItem>
              </ul>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className={`${SECTION_INNER_MT} flex flex-col items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:flex-row ${SECTION_GAP}`}>
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
              © {year}{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {tr("brand")}
              </span>
              . {tr("footerRights")}
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
            >
              {tr("footerBackToTop")}
              <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon: Icon,
  children,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  href?: string;
}) {
  const rowClass =
    "grid grid-cols-[1.125rem_1fr] items-center gap-3 text-sm leading-snug text-zinc-600 dark:text-zinc-400";
  const linkClass = `${rowClass} transition hover:text-indigo-600 dark:hover:text-indigo-400`;

  const content = (
    <>
      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <li>
        <a href={href} className={linkClass}>
          {content}
        </a>
      </li>
    );
  }

  return <li className={rowClass}>{content}</li>;
}
