import { getPolicyContent } from "@/lib/api/server-content";

interface PolicyContentProps {
  type: "terms" | "privacy";
  description: string;
}

export async function PolicyContent({ type, description }: PolicyContentProps) {
  const policy = await getPolicyContent(type);
  const legalLabel = type === "privacy" ? "Privacy" : "Terms";

  return (
    <section className="section-wrap py-14 md:py-20">
      <article className="premium-panel px-6 py-8 md:px-10 md:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          {legalLabel}
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          {policy.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>

        {policy.updatedAt ? (
          <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted">
            Updated: {new Date(policy.updatedAt).toLocaleDateString()}
          </p>
        ) : null}

        <div className="mt-6 rounded-2xl border border-border/70 bg-white/80 p-4 text-sm leading-relaxed text-muted">
          Legal content is versioned and managed from backend content sources to
          keep public policy pages up to date.
        </div>

        <div className="mt-8 space-y-4 whitespace-pre-wrap text-[15px] leading-7 text-foreground/90">
          {policy.content || "Policy content is currently unavailable."}
        </div>
      </article>
    </section>
  );
}
