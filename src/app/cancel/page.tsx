import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  description: "Stripe checkout was canceled. User can retry premium activation.",
};

export default function CancelPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <div className="premium-panel mx-auto max-w-3xl px-6 py-10 text-center md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          Checkout Canceled
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          No payment was completed
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          Your subscription remains unchanged. You can return to plans anytime
          and restart checkout.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl bg-foreground px-5 text-sm font-semibold text-white transition hover:opacity-90"
            href="/premium"
          >
            Retry subscription
          </Link>
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-accent-soft/40"
            href="/contact"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
