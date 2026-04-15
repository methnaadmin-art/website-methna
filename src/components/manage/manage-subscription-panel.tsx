"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  SubscriptionManageResponse,
  SubscriptionStatus,
} from "@/lib/api/types";
import { emailCheckSchema } from "@/lib/validation/schemas";

type ManageFormValues = z.infer<typeof emailCheckSchema>;

export function ManageSubscriptionPanel({
  prefilledEmail,
}: {
  prefilledEmail?: string;
}) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [portalMessage, setPortalMessage] = useState("");

  const form = useForm<ManageFormValues>({
    resolver: zodResolver(emailCheckSchema),
    defaultValues: {
      email: prefilledEmail ?? "",
    },
  });

  const onCheckStatus = form.handleSubmit(async ({ email }) => {
    setStatusMessage("");
    setPortalMessage("");

    try {
      const response = await fetch(
        `/api/subscription/status?email=${encodeURIComponent(email)}`,
        {
          cache: "no-store",
        },
      );

      const payload = (await response.json()) as SubscriptionStatus;
      setStatus(payload);

      if (!response.ok) {
        setStatusMessage(payload.message ?? "Could not fetch status right now.");
        return;
      }

      setStatusMessage(
        payload.exists
          ? "Subscription details loaded."
          : payload.message ?? "No active premium subscription found.",
      );
    } catch {
      setStatusMessage("Unable to fetch subscription status.");
    }
  });

  const onOpenPortal = form.handleSubmit(async ({ email }) => {
    setPortalMessage("");

    try {
      const response = await fetch("/api/subscription/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as SubscriptionManageResponse & {
        message?: string;
      };

      if (!response.ok) {
        setPortalMessage(payload.message ?? "Unable to open management portal.");
        return;
      }

      setPortalMessage(payload.message ?? "Redirecting to management portal...");
      window.location.assign(payload.url);
    } catch {
      setPortalMessage("Unable to launch subscription management.");
    }
  });

  return (
    <section className="section-wrap py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Manage Subscription
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
            Billing control center
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Enter the app account email to check your subscription and open
            billing management.
          </p>

          <form className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                App account email
              </label>
              <Input
                placeholder="you@domain.com"
                type="email"
                {...form.register("email")}
              />
              {form.formState.errors.email?.message ? (
                <p className="mt-1.5 text-xs text-danger">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                loading={form.formState.isSubmitting}
                onClick={onCheckStatus}
                type="button"
                variant="outline"
              >
                <RefreshCcw className="h-4 w-4" />
                Check status
              </Button>
              <Button
                loading={form.formState.isSubmitting}
                onClick={onOpenPortal}
                type="button"
              >
                <ExternalLink className="h-4 w-4" />
                Manage billing
              </Button>
            </div>
          </form>

          {statusMessage ? (
            <p className="mt-4 text-sm text-muted">{statusMessage}</p>
          ) : null}
          {portalMessage ? (
            <p className="mt-2 text-sm text-muted">{portalMessage}</p>
          ) : null}
        </div>

        <aside className="premium-panel p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground">Current status</h2>
          {status ? (
            <div className="mt-4 space-y-3 text-sm">
              <InfoRow label="Plan" value={status.planName ?? "Not available"} />
              <InfoRow label="Code" value={status.planCode ?? "Not available"} />
              <InfoRow label="Status" value={status.status ?? "Unknown"} />
              <InfoRow
                label="Renewal"
                value={
                  status.renewalDate
                    ? new Date(status.renewalDate).toLocaleString()
                    : "Not provided"
                }
              />
              <InfoRow
                label="Features"
                value={status.features?.length ? status.features.join(", ") : "Not provided"}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Check status to see current plan data and guidance for cancellation
              or management actions.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-white/70 px-3 py-2.5">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
