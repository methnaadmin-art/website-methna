import type { Metadata } from "next";
import { HeartHandshake, Lock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Methna and the mission behind a more intentional Muslim matchmaking experience.",
};

const pillars = [
  {
    title: "Intent first",
    icon: HeartHandshake,
    description:
      "Methna is built for people seeking serious relationships and marriage, not endless casual swiping.",
  },
  {
    title: "Privacy by design",
    icon: Lock,
    description:
      "Profile controls, locked photo access, moderation, and safer account flows are built into the product experience.",
  },
  {
    title: "Compatibility with depth",
    icon: Sparkles,
    description:
      "We prioritize meaningful profile signals like values, lifestyle, and timelines to improve connection quality.",
  },
];

export default function AboutPage() {
  return (
    <section className="section-wrap py-12 md:py-18">
      <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          About Methna
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          A more respectful,
          <span className="gradient-text"> intentional way to connect</span>
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          Methna was built to create a better matchmaking environment for Muslims.
          We believe serious relationships deserve better tools, stronger privacy,
          and clearer compatibility than casual-first platforms.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                className="rounded-2xl border border-border/70 bg-white/80 p-4"
                key={pillar.title}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="h-4 w-4" />
                </span>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-7 rounded-2xl border border-border/70 bg-white/80 p-5 md:p-6">
          <h2 className="text-xl font-semibold text-foreground">What guides our product decisions</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
            Every feature is evaluated through one question: does this help serious,
            marriage-minded people connect with more clarity, respect, and trust?
            If not, it does not belong in Methna.
          </p>
        </div>
      </div>
    </section>
  );
}
