import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Shield, Sparkles } from "lucide-react";
import { AppPhoneMockups } from "@/components/marketing/app-phone-mockups";

export const metadata: Metadata = {
  title: "App Experience",
  description:
    "See the real Methna app Home, Users, Chats, and Profile screens rebuilt inside polished iPhone 17 Pro mockups.",
};

const flowSteps = [
  {
    title: "Home discovery",
    description:
      "The live discovery card, top controls, and swipe actions are shown with the same light-mode rhythm as the Flutter app.",
    icon: Shield,
  },
  {
    title: "Users and chat",
    description:
      "Interaction tabs, profile grids, active-now avatars, and message rows keep the same structure users already know inside the app.",
    icon: MessageCircle,
  },
  {
    title: "Profile depth",
    description:
      "Profile hero, verification, completion, engagement, boost, and gallery are shown as real app surfaces, not generic placeholders.",
    icon: Sparkles,
  },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="section-wrap pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="overflow-hidden rounded-[8px] border border-border/70 bg-[linear-gradient(135deg,#2a1a6d_0%,#3a2492_48%,#4c20cf_100%)] px-6 py-8 text-white shadow-[0_30px_64px_-42px_rgba(45,28,112,0.34)] md:px-10 md:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Exact app preview
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">
            The real app screens, rebuilt for the website
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
            Home, users, chats, and profile now appear here in the same light-mode
            visual language as the Flutter app, presented inside polished iPhone 17 Pro
            mockups for desktop visitors.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {flowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  className="rounded-2xl border border-white/12 bg-white/6 p-4"
                  key={step.title}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="mt-3 text-lg font-semibold text-white">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap pb-12 md:pb-16">
        <AppPhoneMockups />
      </section>

      <section className="section-wrap pb-14 md:pb-20">
        <div className="premium-panel p-6 md:p-8">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Why this preview matters
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted md:text-base">
            {[
              "Visitors see exactly how the app feels before they download it.",
              "Every screen reflects the live app structure, not generic mockups.",
              "Privacy and intent come through clearly from the very first interaction.",
            ].map((item) => (
              <li className="flex items-start gap-2" key={item}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="subtle-focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-strong"
              href="/features"
            >
              Explore features
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="subtle-focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent-soft/45"
              href="/contact"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
