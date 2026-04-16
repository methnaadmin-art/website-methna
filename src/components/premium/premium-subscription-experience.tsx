"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Crown,
  Eye,
  Globe,
  Loader2,
  Lock,
  MessageCircle,
  Rocket,
  Shield,
  Sparkles,
  Stars,
  Users,
} from "lucide-react";
import { FeatureComparison } from "@/components/premium/feature-comparison";
import { PlanCard } from "@/components/premium/plan-card";
import { SubscribeModal } from "@/components/premium/subscribe-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlansPayload, PremiumPlan } from "@/lib/api/types";
import { clientEnv } from "@/lib/config/env";

const valueHighlights = [
  {
    title: "More visibility when timing matters",
    description:
      "Boost your reach, get seen faster, and connect with people who are serious about moving forward.",
  },
  {
    title: "More control in discovery",
    description:
      "Use tools like Ghost mode and Passport mode when you want flexibility without losing privacy.",
  },
  {
    title: "More confidence in every match",
    description:
      "Premium is designed to improve quality and clarity, not just add visual extras.",
  },
];

interface FeaturePillar {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: string[];
}

const intentionPillars: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Intent",
    description:
      "Built for serious relationships and marriage-minded users, not casual swiping loops.",
    icon: Users,
  },
  {
    title: "Privacy",
    description:
      "Visibility controls, locked photos, and safer interactions designed to protect user comfort.",
    icon: Lock,
  },
  {
    title: "Compatibility",
    description:
      "Richer profile depth with values, lifestyle, timeline, and meaningful compatibility signals.",
    icon: Sparkles,
  },
];

const featurePillars: FeaturePillar[] = [
  {
    title: "Discover better",
    subtitle: "Find relevant matches with more clarity.",
    icon: Globe,
    items: [
      "Profile creation and rich preferences",
      "Discovery and browsing with smarter filters",
      "Like and pass flow designed for intention",
      "Editing tools to keep your profile current",
    ],
  },
  {
    title: "Connect with clarity",
    subtitle: "Move from interest to real conversation.",
    icon: MessageCircle,
    items: [
      "Mutual matches that feel more relevant",
      "Respectful in-app chat experience",
      "Structured profile signals before messaging",
      "Support for thoughtful communication",
    ],
  },
  {
    title: "Protect your privacy",
    subtitle: "Control access, visibility, and trust.",
    icon: Shield,
    items: [
      "Verification and moderation support",
      "Blocking and account safety controls",
      "Locked photo access rules",
      "Password and biometric account support",
    ],
  },
  {
    title: "Stand out with premium",
    subtitle: "Useful visibility and discovery advantages.",
    icon: Rocket,
    items: [
      "See who liked you",
      "Boost profile and expand reach",
      "Ghost mode and Passport mode",
      "Premium badge, more likes, boosts, and compliments",
    ],
  },
];

const comparisonRows = [
  {
    metric: "Intent",
    casual: "Built for activity and casual engagement",
    methna: "Built for serious connections and marriage-minded users",
  },
  {
    metric: "Profile depth",
    casual: "Mostly surface-level discovery",
    methna: "Values, lifestyle, preferences, and timeline signals",
  },
  {
    metric: "Privacy controls",
    casual: "Limited visibility control",
    methna: "Privacy-first discovery and stronger profile controls",
  },
  {
    metric: "Safety model",
    casual: "Reactive moderation",
    methna: "Verification, moderation, and clearer support pathways",
  },
  {
    metric: "Premium value",
    casual: "Often cosmetic extras",
    methna: "Practical visibility and compatibility advantages",
  },
];

const safetyCards = [
  {
    title: "Verification and account trust",
    text: "Verification helps build confidence and reduce low-quality behavior.",
    icon: Shield,
  },
  {
    title: "Moderation and reporting",
    text: "Reporting and moderation tools support a safer and more respectful environment.",
    icon: Eye,
  },
  {
    title: "Privacy-aware visibility",
    text: "Locked photos and profile controls add meaningful protection to discovery.",
    icon: Lock,
  },
];

const faqItems = [
  {
    question: "Is Methna for casual dating?",
    answer:
      "No. Methna is designed for serious relationships and marriage-minded users who want more intentional matchmaking.",
  },
  {
    question: "What makes Methna different from ordinary dating apps?",
    answer:
      "Methna combines intentional discovery, stronger privacy controls, and richer compatibility signals in one focused experience.",
  },
  {
    question: "How does premium help?",
    answer:
      "Premium gives you more visibility, more control, and more ways to connect through features like who liked you, boosts, ghost mode, and passport mode.",
  },
  {
    question: "Does Methna support privacy and safety?",
    answer:
      "Yes. Privacy and trust are core product principles, with verification, moderation, profile controls, and clearer support flows.",
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
      <section className="section-wrap relative overflow-hidden pt-12 pb-12 md:pt-20 md:pb-16">
        <motion.div
          className="pointer-events-none absolute -left-6 top-8 h-44 w-44 rounded-full bg-accent-soft blur-3xl"
          animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="pointer-events-none absolute -right-4 top-6 h-60 w-60 rounded-full bg-accent-soft/80 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="premium-panel relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-soft/85 to-transparent" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge>Muslim Matchmaking App</Badge>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-tight text-foreground md:text-7xl">
                Serious connections,
                <span className="gradient-text"> built with intention.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                Methna helps Muslims connect with clarity and intention through a
                respectful, privacy-focused matchmaking experience designed for
                people seeking something real.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-strong"
                  href={clientEnv.appDownloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Download Methna
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/45"
                  href="#premium"
                >
                  <Stars className="h-4 w-4" />
                  Explore Premium
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5 text-sm text-muted">
                {[
                  "Built for marriage-minded users",
                  "Privacy-first visibility controls",
                  "Meaningful compatibility signals",
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-white/80 px-3 py-1.5"
                  >
                    <Check className="h-3.5 w-3.5 text-accent-strong" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative grid gap-3">
              <motion.article
                className="glass-surface rounded-2xl p-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  More than a swipe
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  Structured discovery, respectful communication, and profile depth
                  designed around serious intent.
                </p>
              </motion.article>

              <motion.article
                className="glass-surface rounded-2xl p-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Privacy and trust
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  Verification, moderation, locked photo access, and stronger
                  visibility controls built into core flows.
                </p>
              </motion.article>

              <motion.article
                className="glass-surface rounded-2xl p-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Premium with purpose
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  See who liked you, boost your profile, use Ghost mode and Passport
                  mode, and increase meaningful reach.
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <div className="section-wrap pb-4 md:pb-6">
        <div className="soft-divider" />
      </div>

      <section id="intent" className="section-wrap pt-6 pb-12 md:pb-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Built for intention
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            A serious matchmaking experience for Muslims
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Methna is designed for serious connections, privacy, and meaningful
            compatibility, not casual noise.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {intentionPillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="premium-panel p-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.07 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="why" className="section-wrap pb-12 md:pb-16">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Why Methna
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            More clarity. Less noise.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Most dating products optimize for activity. Methna is built for
            outcomes. From richer profile depth to safer interactions and premium
            visibility tools, every part of the product is designed to help serious
            people connect with intention.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Structured profile depth beyond surface-level swiping",
              "Stronger privacy and moderation foundations",
              "Premium features that improve discovery quality",
            ].map((point) => (
              <div key={point} className="rounded-2xl border border-border bg-white/80 p-4">
                <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-wrap pb-12 md:pb-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Feature pillars
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Designed for serious progress
          </h2>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {featurePillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                className="premium-panel p-5 md:p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 * index }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted">{pillar.subtitle}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5 text-sm text-foreground/90">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="premium" className="section-wrap pb-10 md:pb-14">
        <div className="premium-panel overflow-hidden p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge>Premium Value</Badge>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Premium that gives you real advantage
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                Premium gives you more visibility, more control, and more ways to
                connect. See who liked you, unlock advanced discovery tools,
                increase your reach, and stand out with exclusive profile
                advantages.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
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
                  View premium plans
                </Button>

                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/50"
                  href="#premium-plans"
                >
                  <Stars className="h-4 w-4" />
                  Compare plans
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "See who liked you",
                "Boost profile",
                "Ghost mode",
                "Passport mode",
                "Premium badge",
                "More likes, boosts, compliments",
              ].map((item) => (
                <div key={item} className="glass-surface rounded-2xl p-4 text-sm font-medium text-foreground/90">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {valueHighlights.map((item, index) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-border bg-white/82 p-4"
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
        </div>
      </section>

      <section id="premium-plans" className="section-wrap pb-10 md:pb-14">
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

      <FeatureComparison plans={plans} />

      <section id="comparison" className="section-wrap pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="premium-panel overflow-hidden p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Comparison
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Built for serious connections, not casual noise
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-accent-soft/55">
                <tr>
                  <th className="px-4 py-3 font-semibold text-foreground">Area</th>
                  <th className="px-4 py-3 font-semibold text-muted">Ordinary casual apps</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Methna</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.metric} className={index % 2 === 0 ? "bg-white" : "bg-[#f8f5ff]"}>
                    <td className="px-4 py-3 font-semibold text-foreground">{row.metric}</td>
                    <td className="px-4 py-3 text-muted">{row.casual}</td>
                    <td className="px-4 py-3 text-foreground">{row.methna}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="safety" className="section-wrap pb-12 md:pb-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Safety and privacy
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Privacy and trust are built in
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Privacy and trust are not optional. Methna gives users more control
            over visibility, access, and interactions through verification,
            moderation, and privacy-aware profile design.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {safetyCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="premium-panel p-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.07 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="about" className="section-wrap pb-12 md:pb-16">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            About us
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Built to create a more respectful matchmaking experience
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Methna was built to create a more respectful and intentional
            matchmaking experience for Muslims. We believe serious relationships
            deserve better tools, better privacy, and a better environment than
            casual-first platforms.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Serious intent from the beginning",
              "Meaningful compatibility signals",
              "Privacy and trust as product foundations",
              "Premium features with practical value",
            ].map((point) => (
              <div key={point} className="rounded-2xl border border-border bg-white/82 p-4 text-sm text-foreground/90">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section-wrap pb-12 md:pb-16">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Helpful answers, clearly explained
          </h2>

          <div className="mt-6 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-2xl border border-border bg-white/85 p-4">
                <summary className="cursor-pointer list-none text-base font-semibold text-foreground">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="section-wrap pb-14 md:pb-18">
        <div className="premium-panel relative overflow-hidden p-6 text-center md:p-9">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-accent-soft/80 to-transparent" />

          <div className="relative">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Ready for a more intentional way to connect?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Join a Muslim matchmaking experience built for serious connections,
              stronger privacy, and meaningful compatibility.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-strong"
                href={clientEnv.appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Download Methna
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/45"
                href="#premium-plans"
              >
                View premium plans
              </a>
            </div>
          </div>
        </div>
      </section>

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
          className="premium-panel h-[420px] animate-pulse border-border/60 bg-white/72"
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
