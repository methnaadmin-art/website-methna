import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-strong",
        className,
      )}
      {...props}
    />
  );
}
