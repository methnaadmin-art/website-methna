import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "subtle-focus-ring h-11 w-full rounded-xl border border-border bg-white/85 px-3 text-sm text-foreground placeholder:text-muted transition focus:border-accent",
        className,
      )}
      {...props}
    />
  );
}
