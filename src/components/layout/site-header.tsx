"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { appRoutes } from "@/lib/config/env";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNav = [...primaryNav, ...secondaryNav];

  return (
    <header className="relative z-40 px-3 pt-3 sm:px-4 sm:pt-4 md:pt-5">
      <div className="section-wrap">
        <div className="rounded-[24px] border border-border/85 bg-[rgba(255,252,247,0.96)] px-4 py-3.5 shadow-[0_24px_60px_-40px_rgba(60,41,31,0.28)] backdrop-blur-xl sm:rounded-[26px] sm:px-5 sm:py-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <SiteBrand />

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/90 text-foreground shadow-sm transition hover:bg-white xl:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <div className="hidden items-center gap-1 xl:flex">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2.5 text-sm font-medium text-muted transition-all hover:bg-white hover:text-foreground hover:shadow-sm",
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
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-sm font-medium text-foreground/72 transition-all hover:bg-white/80 hover:text-foreground",
                    pathname.startsWith(item.href.split("#")[0]) && "bg-white/60 text-foreground",
                  )}
                >
                  {item.label}
                  {pathname.startsWith(item.href.split("#")[0]) && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 xl:flex xl:self-auto">
              <Link
                href={appRoutes.contact}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/72 transition-all hover:bg-white hover:text-foreground hover:shadow-sm"
              >
                Contact
              </Link>
              <a
                href={appRoutes.download}
                className="subtle-focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-all hover:bg-accent-strong hover:shadow-md"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download App
              </a>
            </div>
          </div>

          {isMobileMenuOpen ? (
            <div className="mt-4 space-y-3 border-t border-border/70 pt-4 xl:hidden">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link
                  href={appRoutes.contact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border/85 bg-white/82 px-4 py-2 text-sm font-medium text-foreground/82 transition hover:bg-white hover:text-foreground"
                >
                  Contact
                </Link>
                <a
                  href={appRoutes.download}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="subtle-focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition hover:bg-accent-strong"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download App
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {mobileNav.map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center rounded-full border border-border/70 bg-white/72 px-3 py-2 text-center text-xs font-semibold text-muted shadow-sm transition-all hover:border-border hover:bg-white hover:text-foreground hover:shadow-md",
                      pathname === item.href && "border-border bg-white text-foreground shadow-sm",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
