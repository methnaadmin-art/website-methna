"use client";

import Link from "next/link";
import { appRoutes } from "@/lib/config/env";
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
      href={appRoutes.premium}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <img
        alt="Methna logo"
        className={cn(
          "h-11 w-11 rounded-2xl shadow-[0_18px_40px_-26px_rgba(95,49,244,0.5)]",
          compact && "h-10 w-10",
        )}
        src="/methna-mark.svg"
      />
      <span
        className={cn(
          "font-display text-[2rem] font-semibold tracking-tight text-foreground",
          compact && "text-[1.7rem]",
        )}
      >
        Methna
      </span>
    </Link>
  );
}
