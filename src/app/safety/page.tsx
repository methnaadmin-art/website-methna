import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Ban,
  Flag,
  Gavel,
  UserCheck,
  Scale,
  Mail,
} from "lucide-react";
import { appRoutes, clientEnv } from "@/lib/config/env";

export const metadata: Metadata = {
  title: "Child Safety Standards",
  description:
    "Methna's Child Safety Standards — our zero-tolerance policy against child sexual abuse and exploitation (CSAE/CSAM), age restrictions, reporting mechanisms, and enforcement actions.",
};

const sections = [
  {
    icon: ShieldCheck,
    heading: "Child Safety Commitment",
    body: "Methna has a zero-tolerance policy toward child sexual abuse and exploitation (CSAE) and child sexual abuse material (CSAM). The safety of minors is our highest priority, and we are committed to keeping our platform free from any content or behavior that endangers children. We actively invest in detection, prevention, and rapid response systems to identify and remove harmful content before it reaches our community.",
  },
  {
    icon: Ban,
    heading: "Prohibited Content",
    body: "The following content is strictly prohibited on Methna and will result in immediate removal and permanent ban:",
    items: [
      "Any sexual content involving minors, including CSAM (child sexual abuse material)",
      "Grooming, solicitation, or any attempt to lure minors into sexual activity",
      "Depictions, descriptions, or implied sexual content involving anyone under 18",
      "Any content that sexualizes, exploits, or endangers children in any form",
      "Links, references, or redirections to external sites hosting child exploitation material",
      "Any communication intended to recruit, coerce, or manipulate a minor",
    ],
  },
  {
    icon: Flag,
    heading: "User Reporting",
    body: "Every user plays a critical role in keeping Methna safe. If you encounter any content or behavior that involves the exploitation or endangerment of minors, report it immediately.",
    items: [
      "Use the in-app reporting feature by tapping the flag icon on any profile, message, or content piece",
      "Reports are reviewed by our dedicated Trust & Safety team within hours",
      "All reports can be submitted anonymously — your identity will not be disclosed to the reported user",
      "You may also report concerns directly via email to our safety team",
    ],
  },
  {
    icon: Gavel,
    heading: "Moderation & Enforcement",
    body: "Methna enforces its safety policies through a combination of automated systems and human review. When a violation is confirmed, we take the following actions:",
    items: [
      "Immediate removal of the violating content from the platform",
      "Permanent ban of the offending account — no warnings, no appeals for CSAE/CSAM violations",
      "Escalation to the National Center for Missing & Exploited Children (NCMEC) and relevant local authorities where required by law",
      "Preservation of evidence for law enforcement investigations",
      "Cooperation with legal authorities in any jurisdiction where child exploitation is reported",
    ],
  },
  {
    icon: UserCheck,
    heading: "Age Restrictions",
    body: "Methna is strictly for adults aged 18 and older. Our age policy is enforced as follows:",
    items: [
      "All users must verify they are 18 or older during account creation",
      "Accounts belonging to users found to be under 18 are immediately terminated and all associated data is deleted",
      "We employ age-verification checks and may request additional proof of age when suspicious activity is detected",
      "Any attempt by an adult to misrepresent their age to interact with a minor results in permanent ban and escalation to authorities",
    ],
  },
  {
    icon: Scale,
    heading: "Legal Compliance",
    body: "Methna complies with all applicable international and local laws regarding child safety, including but not limited to:",
    items: [
      "Google Play Child Safety Standards (CSAE/CSAM policy)",
      "U.S. Children's Online Privacy Protection Act (COPPA)",
      "UK Online Safety Act",
      "EU Digital Services Act (DSA)",
      "Australian Online Safety Act",
      "Mandatory reporting to NCMEC and relevant law enforcement agencies worldwide",
      "Cooperation with Interpol and national law enforcement on cross-border cases",
    ],
  },
];

export default function SafetyPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="premium-panel px-6 py-10 text-center md:px-12 md:py-14">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Child Safety Standards
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            Methna maintains a zero-tolerance policy against child sexual abuse
            and exploitation. This page outlines our commitment, policies, and
            the measures we take to protect minors.
          </p>
        </div>

        {/* Sections */}
        <div className="mt-6 space-y-5">
          {sections.map((s) => (
            <div
              key={s.heading}
              className="premium-panel px-6 py-8 md:px-8 md:py-10"
            >
              <h2 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
                <s.icon className="h-5 w-5 shrink-0 text-accent" />
                {s.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
              {s.items && (
                <ul className="mt-4 space-y-2.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="premium-panel mt-6 px-6 py-8 md:px-8 md:py-10">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
            <Mail className="h-5 w-5 shrink-0 text-accent" />
            Contact Information
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            If you have any concerns about child safety on Methna, or if you
            need to report a case involving the exploitation of a minor, please
            contact our Trust &amp; Safety team immediately.
          </p>
          <a
            href={`mailto:${clientEnv.supportEmail}`}
            className="subtle-focus-ring mt-5 inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-4 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/40 hover:bg-accent/10"
          >
            <Mail className="h-4 w-4" />
            {clientEnv.supportEmail}
          </a>
        </div>

        {/* Emergency Note */}
        <div className="mt-6 rounded-2xl border border-accent/12 bg-accent/4 px-6 py-5 text-center">
          <p className="text-sm font-medium text-accent">
            If a child is in immediate danger, contact your local emergency
            services or law enforcement right away.
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent/5"
            href={appRoutes.privacy}
          >
            Privacy Policy
          </Link>
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent/5"
            href={appRoutes.terms}
          >
            Terms of Service
          </Link>
          <a
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent/5"
            href={`mailto:${clientEnv.supportEmail}`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
