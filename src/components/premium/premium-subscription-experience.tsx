"use client";

import {
  ArrowRight,
  Check,
  Heart,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AppPhoneMockups } from "@/components/marketing/app-phone-mockups";
import { clientEnv } from "@/lib/config/env";

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

const heroImage =
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=1800&q=80";
const familyImage =
  "https://images.pexels.com/photos/4657988/pexels-photo-4657988.jpeg?cs=srgb&dl=pexels-lombejr-4657988.jpg&fm=jpg";
const serenityImage =
  "https://images.pexels.com/photos/32399750/pexels-photo-32399750.jpeg?cs=srgb&dl=pexels-through-noyan-s-lens-2151445904-32399750.jpg&fm=jpg";

export function PremiumSubscriptionExperience() {
  return (
    <>
      <section id="vision" className="section-wrap pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-[40px] border border-[#d8ccff] bg-[#140b30] text-white shadow-[0_45px_110px_-70px_rgba(40,24,101,0.72)]">
          <img
            alt="A joyful Muslim couple enjoying a peaceful outdoor moment together"
            className="absolute inset-0 h-full w-full object-cover"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(20,11,48,0.9)_16%,rgba(59,32,136,0.56)_52%,rgba(17,10,41,0.82)_100%)]" />
          <div className="premium-hero-lines absolute inset-0" />

          <div className="relative px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="max-w-[48rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/62">
                Rooted tradition. Built for the future.
              </p>

              <h1 className="mt-6 font-display text-[clamp(3.8rem,8vw,7rem)] font-semibold leading-[0.88] text-white">
                Build Your Future,
                <br />
                <span className="italic">Rooted in Faith.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/82">
                Methna is more than an app. It is the first step toward the family
                life you have always envisioned, with calmer discovery, better
                privacy, and a path that respects intention from the very start.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-accent-strong"
                  href={clientEnv.appDownloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Download the App
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  className="subtle-focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 text-sm font-semibold text-white transition hover:bg-white/12"
                  href="#app-preview"
                >
                  Explore the Platform
                </a>
              </div>

              <div className="mt-10 grid gap-4 text-sm text-white/82 md:max-w-3xl md:grid-cols-3 md:text-base">
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">600k+</span> success stories
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">15M</span> members worldwide
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">Marriage-first</span> focused
                  discovery
                </p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/72">
              Our Philosophy
            </p>
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
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white shadow-[0_16px_28px_-24px_rgba(64,37,151,0.25)]">
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
        <div className="overflow-hidden rounded-[40px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(242,236,255,0.95)_100%)] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/72">
                The Process
              </p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                A Space for Serenity
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                We have removed the noise of modern dating to provide a sanctuary
                where you can truly get to know someone. No endless swiping, just
                purposeful exploration that helps good conversations breathe.
              </p>

              <a
                className="subtle-focus-ring mt-8 inline-flex h-12 items-center rounded-full border border-accent/35 bg-white px-6 text-sm font-semibold text-accent-strong transition hover:bg-accent-soft/55"
                href="#app-preview"
              >
                Explore the Platform
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] pb-10">
              <img
                alt="A woman standing in a warm softly lit interior"
                className="ml-auto h-[320px] w-[86%] rounded-[30px] object-cover shadow-[0_30px_60px_-42px_rgba(64,37,151,0.24)] md:h-[360px]"
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/72">
            Trust and Safety
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
            A Foundation of Trust
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Safety and privacy are not just features. They are commitments that
            shape the product at every stage of the journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {trustCards.map((card) => (
            <TrustCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="app-preview" className="section-wrap pb-16 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/72">
            App Experience
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.94] text-foreground md:text-6xl">
            The real app, shown clearly on the website.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Home, users, chats, and profile appear here in polished iPhone
            mockups so visitors understand the real product without decorative
            pills or fake marketing cards.
          </p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              <span className="font-semibold text-foreground">Home:</span> discovery
              cards, top controls, and the swipe dock from the app.
            </p>
            <p>
              <span className="font-semibold text-foreground">Users and chats:</span>{" "}
              interaction tabs, active-now avatars, and inbox rows in the same light
              mode language.
            </p>
            <p>
              <span className="font-semibold text-foreground">Profile:</span> hero
              header, verification, completion, engagement, boost, and gallery.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <AppPhoneMockups compact />
        </div>
      </section>

      <section id="support" className="section-wrap pb-20 md:pb-24">
        <div className="surface-dark overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/62">
                Ready When You Are
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.97] text-white md:text-5xl">
                Download the app and get support whenever you need it.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Our support team stays reachable for account, privacy, and safety
                questions. Reach out anytime &mdash; we are here to help you
                build something meaningful.
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
                href="/contact"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
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
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-3xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
    </article>
  );
}
