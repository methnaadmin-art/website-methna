import type { Metadata } from "next";
import { ArrowRight, Apple, Smartphone } from "lucide-react";
import { clientEnv } from "@/lib/config/env";

export const metadata: Metadata = {
  title: "Download Methna",
  description:
    "Choose your app store and download Methna on iPhone or Android.",
};

const stores = [
  {
    name: "Download on the App Store",
    detail: "For iPhone and iPad users.",
    href: clientEnv.iosAppUrl,
    icon: Apple,
  },
  {
    name: "Get it on Google Play",
    detail: "For Android phones and tablets.",
    href: clientEnv.androidAppUrl,
    icon: Smartphone,
  },
];

export default function DownloadPage() {
  return (
    <section className="section-wrap py-12 md:py-16">
      <div className="premium-panel p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          Download Methna
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">
          Choose your app store
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          Methna is available on both iPhone and Android. Choose the store that
          matches your device.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {stores.map((store) => {
            const Icon = store.icon;
            return (
              <a
                key={store.name}
                className="subtle-focus-ring premium-panel flex items-center justify-between gap-4 p-5 transition hover:border-accent/40 hover:bg-accent-soft/25"
                href={store.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{store.name}</p>
                    <p className="mt-1 text-sm text-muted">{store.detail}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent-strong" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
