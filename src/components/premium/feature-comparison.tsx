"use client";

import { Check, Minus } from "lucide-react";
import type { PremiumPlan } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

interface FeatureComparisonProps {
  plans: PremiumPlan[];
}

const normalizeFeature = (feature: string) => feature.trim().toLowerCase();

const featureRows = (plans: PremiumPlan[]): string[] => {
  const unique = new Set<string>();

  plans.forEach((plan) => {
    plan.features.forEach((feature) => unique.add(feature));
  });

  return Array.from(unique).slice(0, 12);
};

export function FeatureComparison({ plans }: FeatureComparisonProps) {
  if (!plans.length) {
    return null;
  }

  const rows = featureRows(plans);

  return (
    <section className="section-wrap pb-16 md:pb-20">
      <div className="premium-panel overflow-hidden">
        <div className="border-b border-border/70 px-5 py-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Compare plans
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground">
            Premium plan comparison
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            See which benefits open up as you move from focused discovery to fuller
            visibility and premium support.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#f2e5dc] text-foreground">
              <tr>
                <th className="px-5 py-4 font-semibold md:px-8">Feature</th>
                {plans.map((plan) => (
                  <th
                    className="px-5 py-4 text-center font-semibold md:px-8"
                    key={`heading-${plan.code}`}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((feature, rowIndex) => {
                const normalized = normalizeFeature(feature);
                return (
                  <tr
                    key={feature}
                    className={cn(
                      "border-t border-border/60",
                      rowIndex % 2 === 0 ? "bg-white/88" : "bg-[#fcf7f1]",
                    )}
                  >
                    <td className="px-5 py-3.5 text-foreground/92 md:px-8">
                      {feature}
                    </td>
                    {plans.map((plan) => {
                      const hasFeature = plan.features.some(
                        (entry) => normalizeFeature(entry) === normalized,
                      );

                      return (
                        <td
                          className="px-5 py-3.5 text-center md:px-8"
                          key={`${plan.code}-${feature}`}
                        >
                          {hasFeature ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f2ece6] text-[#b0a59b]">
                              <Minus className="h-4 w-4" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
