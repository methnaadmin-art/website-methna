import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock, MessageCircle, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Methna features across intent-led matching, privacy controls, and respectful communication.",
};

const pillars = [
  {
    title: "Intent-led matching",
    icon: Users,
    items: [
      "Serious relationship and marriage-minded discovery",
      "Rich profile depth for values, goals, and timelines",
      "Signal-first experience over casual engagement loops",
    ],
  },
  {
    title: "Privacy-first design",
    icon: Lock,
    items: [
      "Visibility controls with safer discovery patterns",
      "Locked photos and controlled profile access",
      "Support paths for account safety and trust",
    ],
  },
  {
    title: "Communication quality",
    icon: MessageCircle,
    items: [
      "Respectful chat patterns after mutual interest",
      "Moderation support and reporting pathways",
      "More context before conversation starts",
    ],
  },
  {
    title: "Trust & safety",
    icon: Shield,
    items: [
      "Verification support to keep profiles authentic",
      "Strict 18+ age requirement and child safety policy",
      "Clear paths to report and resolve concerns",
    ],
  },
];

const comparisonRows = [
  {
    area: "Intent",
    ordinary: "Engagement-driven loops",
    methna: "Serious outcomes and compatibility focus",
  },
  {
    area: "Privacy",
    ordinary: "Basic visibility settings",
    methna: "Privacy-aware discovery with safer defaults",
  },
  {
    area: "Trust",
    ordinary: "Reactive moderation",
    methna: "Verification support and moderated pathways",
  },
  {
    area: "Community",
    ordinary: "Anonymous crowds",
    methna: "Family-aware, marriage-first experience",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="section-wrap pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Product pillars
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">
            Built for serious progress, not casual noise
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Methna combines intentional matching, stronger trust controls, and
            respectful communication so users can move from discovery to
            meaningful conversations.
          </p>
        </div>
      </section>

      <section className="section-wrap pb-12 md:pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="premium-panel p-5" key={pillar.title}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">{pillar.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {pillar.items.map((item) => (
                    <li className="flex items-start gap-2" key={item}>
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-wrap pb-12 md:pb-16">
        <div className="premium-panel overflow-hidden">
          <div className="border-b border-border/70 px-5 py-6 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
              Comparison
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              What feels different in practice
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-accent-soft/45">
                <tr>
                  <th className="px-5 py-4 font-semibold md:px-8">Area</th>
                  <th className="px-5 py-4 font-semibold text-muted md:px-8">Ordinary apps</th>
                  <th className="px-5 py-4 font-semibold text-foreground md:px-8">Methna</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    className={index % 2 === 0 ? "bg-white/75" : "bg-[#f6f8fb]"}
                    key={row.area}
                  >
                    <td className="px-5 py-3.5 font-semibold text-foreground md:px-8">{row.area}</td>
                    <td className="px-5 py-3.5 text-muted md:px-8">{row.ordinary}</td>
                    <td className="px-5 py-3.5 text-foreground md:px-8">{row.methna}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-14 md:pb-20">
        <div className="premium-panel border-border/70 bg-gradient-to-br from-[#2a1a6d] via-[#3a2492] to-[#4c20cf] p-6 text-white md:p-8">
          <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Ready to start your journey?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                Download the app, build a thoughtful profile, and connect with
                people who share your values and intent.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                className="subtle-focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-strong"
                href="/experience"
              >
                See app preview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className="subtle-focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/6 px-5 text-sm font-semibold text-white transition hover:bg-white/12"
                href="/contact"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
