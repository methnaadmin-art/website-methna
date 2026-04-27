import Link from "next/link";
import { Crown } from "lucide-react";
import { appRoutes, clientEnv } from "@/lib/config/env";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-10 md:pt-12">
      <div className="section-wrap">
        <div className="premium-panel px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-[var(--accent-ink)]">
                  <Crown className="h-5 w-5" />
                </span>
                <p className="font-display text-3xl font-semibold text-foreground">
                  Methna
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                Serious Muslim matchmaking with privacy, intention, and a calmer
                path from first interest to meaningful family-ready conversations.
              </p>
            </div>

            <div className="grid gap-6 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Explore
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <Link className="hover:text-foreground" href={`${appRoutes.premium}#vision`}>
                    Our Vision
                  </Link>
                  <Link className="hover:text-foreground" href={`${appRoutes.premium}#community`}>
                    Community
                  </Link>
                  <Link className="hover:text-foreground" href={`${appRoutes.premium}#process`}>
                    The Process
                  </Link>
                  <Link className="hover:text-foreground" href={`${appRoutes.premium}#support`}>
                    Support
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Platform
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <Link className="hover:text-foreground" href={appRoutes.experience}>
                    App Preview
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.features}>
                    Features
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.about}>
                    About
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.faq}>
                    FAQ
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                  Support
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <Link className="hover:text-foreground" href={appRoutes.contact}>
                    Contact
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.terms}>
                    Terms
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.privacy}>
                    Privacy
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.deleteAccount}>
                    Delete Account
                  </Link>
                  <Link className="hover:text-foreground" href={appRoutes.safety}>
                    Child Safety
                  </Link>
                  <a className="hover:text-foreground" href={`mailto:${clientEnv.supportEmail}`}>
                    {clientEnv.supportEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
