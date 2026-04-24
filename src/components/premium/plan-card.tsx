"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PremiumPlan } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

interface PlanCardProps {
  plan: PremiumPlan;
  index: number;
  onSubscribe: (plan: PremiumPlan) => void;
}

const formatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

const formatLimitLabel = (key: string, value: string | number | boolean | null) => {
  if (typeof value === "boolean") {
    return value ? key : undefined;
  }

  if (typeof value === "number") {
    if (value === -1) {
      return `Unlimited ${key}`;
    }

    if (value > 0) {
      return `${value} ${key}`;
    }
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return `${key}: ${value.trim()}`;
  }

  return undefined;
};

export function PlanCard({ plan, index, onSubscribe }: PlanCardProps) {
  const interval = plan.interval === "month" ? "month" : plan.interval;
  const priceLabel = formatter(plan.currency || "USD").format(plan.price || 0);
  const topFeatures = plan.features.slice(0, 7);
  const topLimits = Object.entries(plan.limits ?? {})
    .map(([key, value]) => formatLimitLabel(key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase(), value))
    .filter((entry): entry is string => Boolean(entry))
    .slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[32px] border p-6 md:p-7",
        plan.recommended
          ? "border-[#d6b3a3] bg-[linear-gradient(180deg,#f4d8cc_0%,#fff8f3_30%,#fffdf9_100%)] text-foreground shadow-[0_36px_76px_-50px_rgba(140,95,73,0.38)]"
          : "premium-panel text-foreground",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28",
          plan.recommended
            ? "bg-gradient-to-b from-white/60 to-transparent"
            : "bg-gradient-to-b from-[#f7ede4] to-transparent",
        )}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.18em]",
                plan.recommended ? "text-accent-strong" : "text-accent-strong",
              )}
            >
              {plan.badge ?? (plan.recommended ? "Most chosen" : "Premium access")}
            </p>
            <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed",
                plan.recommended ? "text-white/72" : "text-muted",
              )}
            >
              {plan.description}
            </p>
          </div>
          {plan.recommended ? (
            <Badge className="border-white/80 bg-white/70 text-accent-strong">
              Best value
            </Badge>
          ) : null}
        </div>

        <div className="mt-8 flex items-end gap-2">
          <span
            className={cn(
              "font-display text-5xl font-semibold leading-none",
              plan.recommended ? "text-foreground" : "text-foreground",
            )}
          >
            {priceLabel}
          </span>
          <span
            className={cn(
              "mb-1 text-sm",
              plan.recommended ? "text-muted" : "text-muted",
            )}
          >
            /{interval}
          </span>
        </div>

        {topLimits.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {topLimits.map((limit) => (
              <span
                key={`${plan.code}-${limit}`}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  plan.recommended
                    ? "bg-white text-accent-strong"
                    : "bg-accent-soft text-accent-strong",
                )}
              >
                {limit}
              </span>
            ))}
          </div>
        ) : null}

        <ul
          className={cn(
            "mt-6 space-y-2.5 text-sm",
            plan.recommended ? "text-foreground/84" : "text-foreground/92",
          )}
        >
          {topFeatures.map((feature) => (
            <li key={`${plan.code}-${feature}`} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  plan.recommended
                    ? "bg-white text-accent-strong"
                    : "bg-accent-soft text-accent-strong",
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Button
            className={cn(
              "w-full",
              plan.recommended
                ? "bg-accent text-[var(--accent-ink)] hover:bg-accent-strong"
                : "",
            )}
            onClick={() => onSubscribe(plan)}
            variant={plan.recommended ? "primary" : "outline"}
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            {plan.ctaLabel ?? "Choose plan"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
