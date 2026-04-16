"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { appRoutes } from "@/lib/config/env";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: `${appRoutes.premium}#intent`, label: "Intent" },
  { href: `${appRoutes.premium}#features`, label: "Features" },
  { href: `${appRoutes.premium}#premium`, label: "Premium" },
  { href: `${appRoutes.premium}#safety`, label: "Safety" },
  { href: appRoutes.about, label: "About" },
  { href: appRoutes.faq, label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background-soft/85 backdrop-blur-xl">
      <div className="section-wrap flex h-17 items-center justify-between gap-3 py-2">
        <Link href={appRoutes.premium} className="inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/35 bg-accent-soft text-accent-strong">
            <Crown className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Methna
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/85 bg-white/82 p-1.5 md:flex">
          {navLinks.map((item) => {
            const active = item.href.startsWith(appRoutes.premium)
              ? pathname === appRoutes.premium
              : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-foreground text-white"
                    : "text-muted hover:bg-accent-soft/50 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={appRoutes.manageSubscription}
            className="hidden rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent-soft/35 md:inline-flex"
          >
            Manage
          </Link>
          <a
            href={`${appRoutes.premium}#download`}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-strong"
          >
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
