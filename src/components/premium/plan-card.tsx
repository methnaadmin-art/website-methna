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

export function PlanCard({ plan, index, onSubscribe }: PlanCardProps) {
  const interval = plan.interval === "month" ? "month" : plan.interval;
  const topFeatures = plan.features.slice(0, 6);
  const priceLabel = formatter(plan.currency || "USD").format(plan.price || 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
      className={cn(
        "premium-panel relative flex h-full flex-col overflow-hidden p-6 md:p-7",
        plan.recommended
          ? "border-accent/40 bg-gradient-to-b from-white via-[#fffaf1] to-[#fff7e8]"
          : "",
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent-soft/55 to-transparent" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-4xl font-semibold tracking-tight text-foreground">
              {plan.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {plan.description}
            </p>
          </div>
          {plan.badge ? <Badge>{plan.badge}</Badge> : null}
        </div>

        <div className="mt-8 flex items-end gap-2">
          <span className="font-display text-5xl font-semibold leading-none text-foreground">
            {priceLabel}
          </span>
          <span className="mb-1 text-sm text-muted">/{interval}</span>
        </div>

        <ul className="mt-7 space-y-2.5 text-sm text-foreground/90">
          {topFeatures.map((feature) => (
            <li key={`${plan.code}-${feature}`} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Button
            className="w-full"
            onClick={() => onSubscribe(plan)}
            variant={plan.recommended ? "primary" : "outline"}
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            {plan.ctaLabel ?? "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
