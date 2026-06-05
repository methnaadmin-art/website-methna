"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes, clientEnv } from "@/lib/config/env";
import { SiteBrand } from "@/components/layout/site-brand";
import { cn } from "@/lib/utils/cn";

const primaryNav = [
  { href: `${appRoutes.premium}#vision`, label: "Our Vision" },
  { href: `${appRoutes.premium}#community`, label: "Community" },
  { href: `${appRoutes.premium}#process`, label: "The Process" },
  { href: appRoutes.contact, label: "Support" },
];

const secondaryNav = [
  { href: appRoutes.experience, label: "App Preview" },
  { href: appRoutes.features, label: "Features" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-40 px-4 pt-4 md:pt-5">
      <div className="section-wrap">
        <div className="rounded-[26px] border border-border/85 bg-[rgba(255,252,247,0.94)] px-4 py-4 shadow-[0_24px_60px_-40px_rgba(60,41,31,0.28)] backdrop-blur-xl sm:px-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <SiteBrand />

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

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center xl:self-auto">
              <Link
                href={appRoutes.contact}
                className="inline-flex h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground/82 transition hover:bg-white hover:text-foreground"
              >
                Contact
              </Link>
              <a
                href={clientEnv.appDownloadUrl}
                className="subtle-focus-ring inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-accent-strong"
              >
                Download App
              </a>
            </div>
          </div>

          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 xl:hidden">
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
