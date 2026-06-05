import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "subtle-focus-ring min-h-32 w-full rounded-xl border border-border bg-white/85 px-3 py-2.5 text-sm text-foreground placeholder:text-muted transition focus:border-accent",
        className,
      )}
      {...props}
    />
  );
}
