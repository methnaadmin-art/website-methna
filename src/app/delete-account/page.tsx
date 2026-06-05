import Link from "next/link";
import type { Metadata } from "next";
import { Trash2, Mail, AlertCircle, Clock } from "lucide-react";
import { appRoutes, clientEnv } from "@/lib/config/env";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Request permanent deletion of your Methna account and all associated personal data.",
};

export default function DeleteAccountPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="premium-panel px-6 py-10 text-center md:px-12 md:py-14">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D14F6A]/10 text-[#D14F6A]">
            <Trash2 className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Delete Your Account
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            You can request the permanent deletion of your Methna account and all
            associated personal data. Choose one of the options below.
          </p>
        </div>

        {/* Two Options */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Option 1: In-App */}
          <div className="premium-panel px-6 py-8 md:px-8 md:py-10">
            <span className="inline-block rounded-full bg-[#D14F6A]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D14F6A]">
              Option 1
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Delete via the App
            </h3>
            <ol className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D14F6A] text-[11px] font-semibold text-white">
                  1
                </span>
                Open the Methna app
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D14F6A] text-[11px] font-semibold text-white">
                  2
                </span>
                Go to Settings → Account & Security
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D14F6A] text-[11px] font-semibold text-white">
                  3
                </span>
                Tap &quot;Delete Account&quot;
              </li>
            </ol>
          </div>

          {/* Option 2: Email */}
          <div className="premium-panel px-6 py-8 md:px-8 md:py-10">
            <span className="inline-block rounded-full bg-[#D14F6A]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D14F6A]">
              Option 2
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Delete via Email
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Send a deletion request to our support team, including:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D14F6A]" />
                Registered email or phone number
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D14F6A]" />
                Username (if available)
              </li>
            </ul>
            <a
              href={`mailto:${clientEnv.supportEmail}`}
              className="subtle-focus-ring mt-5 inline-flex items-center gap-2 rounded-xl border border-[#D14F6A]/20 bg-[#D14F6A]/5 px-4 py-2.5 text-sm font-semibold text-[#D14F6A] transition hover:border-[#D14F6A]/40 hover:bg-[#D14F6A]/10"
            >
              <Mail className="h-4 w-4" />
              {clientEnv.supportEmail}
            </a>
          </div>
        </div>

        {/* What Happens Section */}
        <div className="premium-panel mt-6 px-6 py-8 md:px-8 md:py-10">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
            <AlertCircle className="h-5 w-5 text-[#D14F6A]" />
            What happens when you delete your account?
          </h2>
          <ul className="mt-5 space-y-3">
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#D14F6A]" />
              All personal data is permanently deleted
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#D14F6A]" />
              Profile, matches, messages, and activity are removed
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted/70 italic">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
              Some data may be retained if required by law or security reasons
            </li>
          </ul>
        </div>

        {/* Processing Note */}
        <div className="mt-6 rounded-2xl border border-[#D14F6A]/12 bg-[#D14F6A]/4 px-6 py-5 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#D14F6A]">
            <Clock className="h-4 w-4" />
            Requests are processed within 24–48 hours
          </p>
        </div>

        {/* Back Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-[#D14F6A]/40 hover:bg-[#D14F6A]/5"
            href={appRoutes.privacy}
          >
            Privacy Policy
          </Link>
          <a
            className="subtle-focus-ring inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:border-[#D14F6A]/40 hover:bg-[#D14F6A]/5"
            href={`mailto:${clientEnv.supportEmail}`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
