"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function SiteBrand({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <img
        alt="Methna logo"
        className={cn(
          "h-10 w-10 rounded-2xl shadow-[0_18px_40px_-26px_rgba(95,49,244,0.5)] sm:h-11 sm:w-11",
          compact && "h-10 w-10",
        )}
        src="/methna_app_icon.jpg"
      />
      <span
        className={cn(
          "font-display text-[1.85rem] font-semibold tracking-tight text-foreground sm:text-[2rem]",
          compact && "text-[1.7rem]",
        )}
      >
        Methna
      </span>
    </Link>
  );
}
