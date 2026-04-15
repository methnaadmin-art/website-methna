import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Methna Premium subscription infrastructure keeps upgrades secure and instant.",
};

const pillars = [
  {
    title: "Backend-first billing integrity",
    description:
      "Plans, prices, and entitlements are controlled from admin/backend and never hardcoded as business truth in the frontend.",
  },
  {
    title: "Pre-checkout account verification",
    description:
      "Every web upgrade flow verifies the app account email before Stripe checkout opens, preventing mismatched subscriptions.",
  },
  {
    title: "Webhook-driven premium activation",
    description:
      "Stripe success alone is not trusted by frontend. Backend webhook activation is the source of truth for premium unlocks.",
  },
];

export default function AboutPage() {
  return (
    <section className="section-wrap py-12 md:py-18">
      <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          About Methna Premium
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Premium infrastructure,
          <span className="gradient-text"> engineered for trust</span>
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          This website is a dedicated subscription surface built for seamless app
          upgrades, account safety, and production billing operations.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              className="rounded-2xl border border-border/70 bg-white/75 p-4"
              key={pillar.title}
            >
              <h2 className="text-lg font-semibold text-foreground">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
