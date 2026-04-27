"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { appRoutes, clientEnv } from "@/lib/config/env";
import { cn } from "@/lib/utils/cn";

const primaryNav = [
  { href: `${appRoutes.premium}#vision`, label: "Our Vision" },
  { href: `${appRoutes.premium}#community`, label: "Community" },
  { href: `${appRoutes.premium}#process`, label: "The Process" },
  { href: `${appRoutes.premium}#support`, label: "Support" },
];

const secondaryNav = [
  { href: appRoutes.experience, label: "App Preview" },
  { href: appRoutes.features, label: "Features" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="section-wrap">
        <div className="rounded-[30px] border border-border/85 bg-[rgba(255,252,247,0.94)] px-5 py-4 shadow-[0_24px_60px_-40px_rgba(60,41,31,0.28)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link href={appRoutes.premium} className="inline-flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-[var(--accent-ink)] shadow-[0_18px_40px_-26px_rgba(168,95,75,0.58)]">
                  <Crown className="h-5 w-5" />
                </span>
                <span className="font-display text-[2rem] font-semibold tracking-tight text-foreground">
                  Methna
                </span>
              </Link>

              <div className="hidden items-center gap-2 lg:flex">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-foreground",
                      pathname === item.href && "bg-white shadow-sm text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <nav className="hidden items-center justify-center gap-1 xl:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/82 transition hover:bg-white hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 self-start xl:self-auto">
              <Link
                href={appRoutes.contact}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/82 transition hover:bg-white hover:text-foreground"
              >
                Contact
              </Link>
              <a
                href={clientEnv.appDownloadUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="subtle-focus-ring inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-accent-strong"
              >
                Download App
              </a>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto xl:hidden">
            {[...primaryNav, ...secondaryNav].map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full border border-transparent bg-white/72 px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-border hover:text-foreground",
                  pathname === item.href && "border-border text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
