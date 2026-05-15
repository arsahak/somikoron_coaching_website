"use client";

import { BRAND_LOGO_SRC } from "@/lib/brand";
import { useTranslation } from "@/lib/useTranslation";

const sizes = {
  sm: { px: 32, text: "text-base", gap: "gap-2" },
  md: { px: 36, text: "text-lg", gap: "gap-2" },
  lg: { px: 48, text: "text-xl", gap: "gap-2.5" },
} as const;

export function BrandLogo({
  size = "md",
  showName = true,
  className = "",
}: {
  size?: keyof typeof sizes;
  showName?: boolean;
  className?: string;
}) {
  const { tr } = useTranslation();
  const s = sizes[size];

  return (
    <span
      className={`inline-flex items-center ${s.gap} font-bold text-zinc-900 dark:text-white ${className}`}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt={tr("brandLogoAlt")}
        width={s.px}
        height={s.px}
        className="shrink-0 rounded-xl object-contain shadow-sm shadow-indigo-500/20"
        decoding="async"
      />
      {showName && <span className={s.text}>{tr("brand")}</span>}
    </span>
  );
}
