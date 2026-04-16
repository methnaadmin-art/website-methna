import Link from "next/link";
import { appRoutes, clientEnv } from "@/lib/config/env";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-white/90 py-12">
      <div className="section-wrap flex flex-col justify-between gap-8 text-sm text-muted md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">
            Methna
          </p>
          <p className="mt-2 max-w-xl leading-relaxed">
            Serious Muslim matchmaking, designed for intention, privacy, and
            meaningful compatibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link className="hover:text-foreground" href={appRoutes.about}>
            About
          </Link>
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
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
