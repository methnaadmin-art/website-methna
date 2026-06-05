import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[var(--accent-ink)] hover:bg-accent-strong shadow-[0_22px_42px_-26px_rgba(168,95,75,0.55)]",
  secondary:
    "bg-accent-soft text-accent-strong hover:bg-[#ebd5c8] shadow-[0_18px_34px_-28px_rgba(168,95,75,0.38)]",
  outline:
    "border border-border bg-white/78 text-foreground hover:border-accent/55 hover:bg-accent-soft/55",
  ghost: "bg-transparent text-foreground hover:bg-white/70",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "subtle-focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition duration-200 disabled:cursor-not-allowed disabled:opacity-70",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
