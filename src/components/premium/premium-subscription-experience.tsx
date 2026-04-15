"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Loader2, Sparkles, Stars } from "lucide-react";
import { FeatureComparison } from "@/components/premium/feature-comparison";
import { PlanCard } from "@/components/premium/plan-card";
import { SubscribeModal } from "@/components/premium/subscribe-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlansPayload, PremiumPlan } from "@/lib/api/types";

const valueHighlights = [
  {
    title: "Immediate premium activation",
    description:
      "Once Stripe confirms payment, backend webhook activation unlocks your app features automatically.",
  },
  {
    title: "Email-gated checkout safety",
    description:
      "Only existing app accounts can proceed to card entry, preventing mismatched subscriptions.",
  },
  {
    title: "Admin-driven plan control",
    description:
      "Pricing, limits, and feature flags come directly from your backend plan manager.",
  },
];

interface PremiumSubscriptionExperienceProps {
  prefilledEmail?: string;
  preselectedPlanCode?: string;
}

export function PremiumSubscriptionExperience({
  prefilledEmail,
  preselectedPlanCode,
}: PremiumSubscriptionExperienceProps) {
  const [plans, setPlans] = useState<PremiumPlan[]>([]);
  const [source, setSource] = useState<"backend" | "fallback">("backend");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPlans = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/plans", {
          cache: "no-store",
          signal: controller.signal,
        });

        const payload = (await response.json()) as PlansPayload;

        if (!response.ok) {
          throw new Error(payload.message ?? "Unable to load plans right now.");
        }

        setPlans(payload.plans ?? []);
        setSource(payload.source ?? "backend");
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to fetch plans.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPlans();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!plans.length || !preselectedPlanCode) {
      return;
    }

    const match = plans.find(
      (plan) =>
        plan.code.toLowerCase() === preselectedPlanCode.trim().toLowerCase(),
    );

    if (match) {
      setSelectedPlan(match);
      setModalOpen(true);
    }
  }, [plans, preselectedPlanCode]);

  const headlinePlan = useMemo(
    () => plans.find((plan) => plan.recommended) ?? plans[0] ?? null,
    [plans],
  );

  return (
    <>
      <section className="section-wrap relative pt-14 pb-12 md:pt-20 md:pb-16">
        <motion.div
          className="pointer-events-none absolute -left-5 top-9 h-40 w-40 rounded-full bg-accent-soft blur-3xl"
          animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="pointer-events-none absolute -right-3 top-12 h-52 w-52 rounded-full bg-amber-100/70 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="premium-panel relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-soft/70 to-transparent" />

          <div className="relative max-w-3xl">
            <Badge>Premium Experience</Badge>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-tight text-foreground md:text-7xl">
              Unlock your best
              <span className="gradient-text"> premium flow</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Dynamic plans, account-safe email verification, and Stripe checkout
              orchestration wired to your backend source of truth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => {
                  if (!headlinePlan) {
                    return;
                  }

                  setSelectedPlan(headlinePlan);
                  setModalOpen(true);
                }}
              >
                <Sparkles className="h-4 w-4" />
                Start upgrade
              </Button>
              <a
                className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/50"
                href="#plans"
              >
                <Stars className="h-4 w-4" />
                Compare plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="section-wrap pb-10 md:pb-14">
        {source === "fallback" ? (
          <div className="mb-5 rounded-xl border border-accent/35 bg-accent-soft/55 px-4 py-3 text-sm text-accent-strong">
            Live plan endpoint is currently unavailable. Showing fallback plans
            until backend sync is reachable.
          </div>
        ) : null}

        {loading ? <PlansSkeleton /> : null}

        {!loading && error ? (
          <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <PlanCard
                index={index}
                key={plan.code}
                onSubscribe={(selected) => {
                  setSelectedPlan(selected);
                  setModalOpen(true);
                }}
                plan={plan}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="section-wrap pb-8 md:pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {valueHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              className="premium-panel p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 * index }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                <Crown className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <FeatureComparison plans={plans} />

      <AnimatePresence>
        <SubscribeModal
          onClose={() => setModalOpen(false)}
          open={modalOpen}
          plan={selectedPlan}
          prefilledEmail={prefilledEmail}
        />
      </AnimatePresence>
    </>
  );
}

function PlansSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          className="premium-panel h-[420px] animate-pulse border-border/60 bg-white/60"
          key={`skeleton-${item}`}
        >
          <div className="flex h-full items-center justify-center text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </div>
      ))}
    </div>
  );
}
