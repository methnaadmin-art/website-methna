"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { appRoutes } from "@/lib/config/env";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: appRoutes.premium, label: "Premium" },
  { href: appRoutes.manageSubscription, label: "Manage" },
  { href: appRoutes.faq, label: "FAQ" },
  { href: appRoutes.about, label: "About" },
  { href: appRoutes.contact, label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background-soft/80 backdrop-blur-xl">
      <div className="section-wrap flex h-16 items-center justify-between gap-3">
        <Link href={appRoutes.premium} className="inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent-strong">
            <Crown className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            Methna Premium
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/80 bg-white/80 p-1.5 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
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

        <Link
          href={appRoutes.premium}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-strong"
        >
          Upgrade
        </Link>
      </div>
    </header>
  );
}
