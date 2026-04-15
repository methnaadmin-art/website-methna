import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Success",
  description:
    "Stripe payment succeeded. Backend webhook activation is now enabling premium access.",
};

export default function SuccessPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <div className="premium-panel mx-auto max-w-3xl px-6 py-10 text-center md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          Payment Confirmed
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Premium is being activated
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          Stripe checkout completed successfully. Your backend webhook now maps
          this payment to your app account email and enables the selected premium
          features.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
          Open the app and refresh to see your premium status and unlocked
          features.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-strong"
            href="/premium"
          >
            Back to premium
          </Link>
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-accent-soft/40"
            href="/manage-subscription"
          >
            Manage subscription
          </Link>
        </div>
      </div>
    </section>
  );
}
