"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Globe,
  Heart,
  Loader2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FeatureComparison } from "@/components/premium/feature-comparison";
import { PlanCard } from "@/components/premium/plan-card";
import { SubscribeModal } from "@/components/premium/subscribe-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlansPayload, PremiumPlan } from "@/lib/api/types";
import { clientEnv } from "@/lib/config/env";
import { cn } from "@/lib/utils/cn";

interface PremiumSubscriptionExperienceProps {
  prefilledEmail?: string;
  preselectedPlanCode?: string;
}

const philosophyPoints = [
  {
    title: "Intentional Discovery",
    description:
      "Detailed profiles focus on values, deen, and long-term aspirations instead of endless surface-level swiping.",
  },
  {
    title: "Wali Integration",
    description:
      "Optional family involvement helps the journey stay transparent, respectful, and serious from the start.",
  },
  {
    title: "Sustainable Growth",
    description:
      "Resources, support, and healthier communication patterns are built for what comes after the match as well.",
  },
];

const trustCards = [
  {
    icon: Users,
    title: "Verified Members",
    description:
      "Our verification process helps make sure every profile belongs to a real person who is serious about marriage.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First by Design",
    description:
      "Your details stay yours. Visibility controls and safer defaults give you more say in who sees you and when.",
  },
  {
    icon: Heart,
    title: "Safe Interaction",
    description:
      "Built-in moderation tools and community guidelines keep every conversation respectful and purpose-driven.",
  },
];

const heroFacts = [
  { label: "Success stories", value: "600k+" },
  { label: "Members worldwide", value: "15M" },
  { label: "Focused discovery", value: "Marriage-first" },
];

const platformStats = [
  {
    icon: Globe,
    value: "600,000",
    label: "success stories across the world",
  },
  {
    icon: Heart,
    value: "15 million",
    label: "members looking for meaningful connection",
  },
];

const premiumFallbackFeatures = [
  "See who liked you before you reply.",
  "Travel and match in the cities you care about.",
  "Protect your visibility when you want more privacy.",
  "Unlock a calmer, more serious path to conversation.",
  "Keep the same verified app-account checkout flow.",
];

const heroImage =
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=1800&q=80";
const familyImage =
  "https://images.pexels.com/photos/4657988/pexels-photo-4657988.jpeg?cs=srgb&dl=pexels-lombejr-4657988.jpg&fm=jpg";
const serenityImage =
  "https://images.pexels.com/photos/32399750/pexels-photo-32399750.jpeg?cs=srgb&dl=pexels-through-noyan-s-lens-2151445904-32399750.jpg&fm=jpg";
const profilePhoneImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";
const matchPhoneLeftImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80";
const matchPhoneRightImage =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80";

const priceFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

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

  const headlinePrice = headlinePlan
    ? priceFormatter(headlinePlan.currency || "USD").format(headlinePlan.price || 0)
    : null;

  const openPreferredPlan = () => {
    if (headlinePlan) {
      setSelectedPlan(headlinePlan);
      setModalOpen(true);
      return;
    }

    document.getElementById("premium-plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const premiumHighlights =
    headlinePlan?.features.slice(0, 5) ?? premiumFallbackFeatures;

  return (
    <>
      <section id="vision" className="section-wrap pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-[40px] border border-[#eadccf] bg-[#1e1713] text-white shadow-[0_45px_110px_-70px_rgba(56,37,29,0.75)]">
          <img
            alt="A joyful Muslim couple enjoying a peaceful outdoor moment together"
            className="absolute inset-0 h-full w-full object-cover"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(33,22,18,0.84)_18%,rgba(55,38,29,0.46)_52%,rgba(25,16,12,0.72)_100%)]" />
          <div className="premium-hero-lines absolute inset-0" />

          <div className="relative px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="max-w-[46rem]">
              <Badge className="border-white/16 bg-white/10 text-white">
                Rooted Tradition, Built for the Future
              </Badge>

              <h1
                className="mt-6 font-display text-[clamp(3.8rem,8vw,7rem)] font-semibold leading-[0.88] text-white"
              >
                Build Your Future,
                <br />
                <span className="italic">Rooted in Faith.</span>
              </h1>

              <p
                className="mt-6 max-w-2xl text-lg leading-relaxed text-white/82"
              >
                Methna is more than an app. It is the first step toward the family
                life you have always envisioned, with calmer discovery, better
                privacy, and a path that respects intention from the very start.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="h-12 px-7" onClick={openPreferredPlan} size="lg">
                  Start Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 text-sm font-semibold text-white transition hover:bg-white/14"
                  href="#community"
                >
                  Explore the Platform
                </a>
              </div>

              <div className="mt-10 grid gap-3 md:max-w-3xl md:grid-cols-3">
                {heroFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-white/56">
                      {fact.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="section-wrap py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="premium-panel p-5 md:p-6">
            <img
              alt="A parent's hand gently holding a baby's hand"
              className="h-full min-h-[430px] w-full rounded-[28px] object-cover md:min-h-[520px]"
              src={familyImage}
            />
          </div>

          <div className="px-1 md:px-4">
            <Badge>Our Philosophy</Badge>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
              Designed for Marriage.
              <br />
              Built for Family.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              In a world of fleeting interactions, Methna prioritizes
              intentionality. We believe a strong marriage begins with clearer
              values, better pacing, and a community built around respect.
            </p>

            <div className="mt-8 space-y-5">
              {philosophyPoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white shadow-[0_16px_28px_-24px_rgba(42,25,20,0.25)]">
                    <Check className="h-4 w-4 text-accent-strong" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-base leading-relaxed text-muted">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section-wrap pb-16 md:pb-20">
        <div className="overflow-hidden rounded-[40px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(248,242,235,0.92)_100%)] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h2 className="font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                A Space for Serenity
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                We have removed the noise of modern dating to provide a sanctuary
                where you can truly get to know someone. No endless swiping, just
                purposeful exploration that helps good conversations breathe.
              </p>

              <a
                className="subtle-focus-ring mt-8 inline-flex h-12 items-center rounded-full border border-accent/35 bg-white px-6 text-sm font-semibold text-accent-strong transition hover:bg-accent-soft/55"
                href="#premium-plans"
              >
                Explore the Platform
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] pb-10">
              <img
                alt="A woman standing in a warm softly lit interior"
                className="ml-auto h-[320px] w-[86%] rounded-[30px] object-cover shadow-[0_30px_60px_-42px_rgba(60,41,31,0.28)] md:h-[360px]"
                src={serenityImage}
              />
              <div className="premium-panel absolute bottom-0 left-0 w-[76%] px-6 py-5">
                <p className="font-display text-[1.65rem] italic leading-snug text-accent-strong">
                  &quot;Your story begins with a single, meaningful connection.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mx-auto">Trust &amp; Safety</Badge>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
            A Foundation of Trust
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Safety and privacy are not just features; they are our commitments to
            you at every stage of the journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {trustCards.map((card) => (
            <TrustCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <div className="overflow-hidden rounded-[38px] border border-border bg-white shadow-[0_34px_82px_-54px_rgba(58,39,31,0.22)]">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="bg-accent px-6 py-8 text-[var(--accent-ink)] md:px-8 md:py-10">
              <Badge className="border-white/28 bg-white/10 text-white">
                Premium Membership
              </Badge>
              <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">
                Premium Benefits
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/82 md:text-base">
                Unlock smarter visibility, calmer discovery, and more control when
                the right timing matters most.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/18 bg-white/14 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/64">
                  Most chosen
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-white">
                  {headlinePlan?.name ?? "Premium"}
                </p>
                <p className="mt-2 text-sm text-white/78">
                  {headlinePrice
                    ? `${headlinePrice}/${headlinePlan?.interval ?? "month"}`
                    : "Live pricing from your subscription catalog"}
                </p>
              </div>
            </div>

            <div className="px-6 py-8 md:px-8 md:py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                What opens up
              </p>
              <div className="mt-5 space-y-3">
                {premiumHighlights.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-[24px] border border-border bg-[#fff9f2] px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/86">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="soft-divider my-7" />

              <p className="text-sm leading-relaxed text-muted md:text-base">
                Use the exact email from your app account. We verify it first and
                then open secure checkout, so the experience stays familiar while
                your premium access activates cleanly on the same account.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button onClick={openPreferredPlan} size="lg">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center rounded-full border border-border bg-white px-6 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/45"
                  href="/manage-subscription"
                >
                  Manage Subscription
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto h-[500px] w-full max-w-[460px]">
            <PhoneShell className="absolute bottom-4 left-0 rotate-[-8deg] bg-white">
              <div className="relative h-[420px] bg-[#111319] text-white">
                <img
                  alt="Profile preview"
                  className="absolute inset-0 h-full w-full object-cover"
                  src={profilePhoneImage}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.05),rgba(0,0,0,0.82))]" />
                <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black/75" />
                <div className="absolute inset-x-0 top-4 flex items-center justify-between px-5 text-[11px] font-semibold text-white/88">
                  <span>9:41</span>
                  <span>3 likes</span>
                </div>
                <div className="absolute bottom-6 left-5 right-5">
                  <p className="text-4xl font-semibold text-white">Adnan, 26</p>
                  <p className="mt-2 text-sm text-white/78">7 km away, Paris</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white">
                      ×
                    </span>
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent-strong shadow-[0_20px_45px_-30px_rgba(255,255,255,0.68)]">
                      <Heart className="h-6 w-6 fill-accent-soft text-accent-strong" />
                    </span>
                  </div>
                </div>
              </div>
            </PhoneShell>

            <PhoneShell className="absolute right-0 top-0 rotate-[6deg] bg-white">
              <div className="relative h-[420px] overflow-hidden bg-[#ff4d84] px-5 py-6 text-white">
                <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-[#d63a6a]" />
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span>9:41</span>
                  <span>Match</span>
                </div>

                <p className="mt-11 text-center text-[2rem] font-semibold leading-tight">
                  Vous et Salma
                  <br />
                  êtes assortis !
                </p>

                <div className="relative mx-auto mt-8 h-[170px] w-[180px]">
                  <PhonePortrait
                    className="absolute left-1 top-4 -rotate-[12deg]"
                    image={matchPhoneLeftImage}
                  />
                  <PhonePortrait
                    className="absolute right-0 top-7 rotate-[10deg]"
                    image={matchPhoneRightImage}
                  />
                </div>

                <div className="mt-5 text-center">
                  <p className="text-3xl font-semibold">
                    Salma <span className="text-2xl text-white/78">24</span>
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/78">
                    7 km away, Montreuil
                  </p>
                </div>

                <div className="mt-6 rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-[#cf4a73]">
                  Ask a thoughtful first question
                </div>
              </div>
            </PhoneShell>
          </div>

          <div>
            <Badge>App Experience</Badge>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.94] text-foreground md:text-6xl">
              The app that connects Muslim singles around the world.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              From discovery to the match moment, every screen keeps the journey
              hopeful, focused, and designed around meaningful connection instead
              of noise.
            </p>

            <div className="mt-8 space-y-4">
              {platformStats.map((stat) => (
                <ShowcaseStat key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="subtle-focus-ring inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-accent-strong"
                href="/experience"
              >
                See the App Preview
              </a>
              <a
                className="subtle-focus-ring inline-flex h-12 items-center rounded-full border border-border bg-white px-6 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-accent-soft/45"
                href="#premium-plans"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="premium-plans" className="section-wrap pb-16 md:pb-20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge>Choose Your Pace</Badge>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
              Pick the plan that matches your season.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Live plan details still come from your subscription catalog. The
              design changed, but the pricing flow and checkout behavior remain the
              same underneath.
            </p>
          </div>

          <div className="rounded-full border border-accent/18 bg-accent-soft px-4 py-2 text-sm font-semibold text-accent-strong">
            Live subscription details from your backend
          </div>
        </div>

        {source === "fallback" ? (
          <div className="mb-5 rounded-[24px] border border-accent/25 bg-accent-soft/70 px-4 py-3 text-sm text-accent-strong">
            Plan details are refreshing. You can still choose a plan below.
          </div>
        ) : null}

        {loading ? <PlansSkeleton /> : null}

        {!loading && error ? (
          <div className="rounded-[24px] border border-danger/28 bg-danger/6 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <PlanCard
                index={index}
                key={plan.code}
                onSubscribe={(planToOpen) => {
                  setSelectedPlan(planToOpen);
                  setModalOpen(true);
                }}
                plan={plan}
              />
            ))}
          </div>
        ) : null}
      </section>

      {!loading && !error && plans.length > 1 ? (
        <FeatureComparison plans={plans} />
      ) : null}

      <section id="support" className="section-wrap pb-20 md:pb-24">
        <div className="surface-dark overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="border-white/16 bg-white/8 text-white">
                Ready When You Are
              </Badge>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.97] text-white md:text-5xl">
                Start on web, continue in the app, and get support whenever you
                need it.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Checkout happens here, premium unlocks in the app, and our support
                team stays reachable for account, privacy, billing, and safety
                questions without changing the rest of your flow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-accent-strong"
                href={clientEnv.appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Download App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="subtle-focus-ring inline-flex h-12 items-center rounded-full border border-white/18 bg-white/6 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                href="/manage-subscription"
              >
                Manage Subscription
              </a>
              <a
                className="subtle-focus-ring inline-flex h-12 items-center rounded-full border border-white/18 bg-white/6 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                href="/contact"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <SubscribeModal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        plan={selectedPlan}
        prefilledEmail={prefilledEmail}
      />
    </>
  );
}

function TrustCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <article className="premium-panel px-6 py-7 md:px-7 md:py-8">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f1ea] text-accent-strong">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-3xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
    </article>
  );
}

function ShowcaseStat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[28px] border border-border bg-white/86 px-5 py-4 shadow-[0_18px_38px_-30px_rgba(42,25,20,0.22)]">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-3xl font-semibold tracking-tight text-[#ff4d84]">{value}</p>
        <p className="mt-1 text-base leading-relaxed text-muted">{label}</p>
      </div>
    </div>
  );
}

function PhoneShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[38px] border border-white/80 p-3 shadow-[0_40px_90px_-46px_rgba(42,25,20,0.38)]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[30px]">{children}</div>
    </div>
  );
}

function PhonePortrait({
  className,
  image,
}: {
  className?: string;
  image: string;
}) {
  return (
    <div
      className={cn(
        "h-[120px] w-[82px] overflow-hidden rounded-[22px] border border-white/20 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <img alt="Profile portrait" className="h-full w-full object-cover" src={image} />
    </div>
  );
}

function PlansSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          className="premium-panel flex h-[420px] items-center justify-center bg-white/72"
          key={`skeleton-${item}`}
        >
          <div className="flex items-center gap-2 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading plans...</span>
          </div>
        </div>
      ))}
    </div>
  );
}
