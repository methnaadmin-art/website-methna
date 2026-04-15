import Link from "next/link";
import { appRoutes, clientEnv } from "@/lib/config/env";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-white/85 py-10">
      <div className="section-wrap flex flex-col justify-between gap-8 text-sm text-muted md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">
            Built for confident upgrades.
          </p>
          <p className="mt-2 max-w-xl leading-relaxed">
            Methna Premium keeps billing transparent, account-safe, and synced to
            your app experience in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link className="hover:text-foreground" href={appRoutes.terms}>
            Terms
          </Link>
          <Link className="hover:text-foreground" href={appRoutes.privacy}>
            Privacy
          </Link>
          <Link className="hover:text-foreground" href={appRoutes.contact}>
            Contact
          </Link>
          <Link className="hover:text-foreground" href={appRoutes.faq}>
            FAQ
          </Link>
          <a
            className="hover:text-foreground"
            href={`mailto:${clientEnv.supportEmail}`}
          >
            {clientEnv.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
