"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Download, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  CheckEmailResponse,
  CheckoutResponse,
  PremiumPlan,
} from "@/lib/api/types";
import { clientEnv } from "@/lib/config/env";
import { emailSchema } from "@/lib/validation/schemas";

interface SubscribeModalProps {
  open: boolean;
  plan: PremiumPlan | null;
  prefilledEmail?: string;
  onClose: () => void;
}

const formSchema = z.object({ email: emailSchema });

type FormValues = z.infer<typeof formSchema>;

export function SubscribeModal({
  open,
  plan,
  prefilledEmail,
  onClose,
}: SubscribeModalProps) {
  const [state, setState] = useState<"idle" | "checking" | "creating" | "error" | "missing">("idle");
  const [message, setMessage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: prefilledEmail ?? "",
    },
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({ email: prefilledEmail ?? "" });
    setState("idle");
    setMessage("");
  }, [form, open, prefilledEmail]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  const isBusy = state === "checking" || state === "creating";

  const statusText = useMemo(() => {
    if (state === "checking") {
      return "Checking if this email already has an app account...";
    }

    if (state === "creating") {
      return "Email verified. Creating Stripe checkout session...";
    }

    if (state === "missing") {
      return "Please install the app and create your account first.";
    }

    return message;
  }, [message, state]);

  const onSubmit = form.handleSubmit(async ({ email }) => {
    if (!plan) {
      return;
    }

    setMessage("");
    setState("checking");

    try {
      const checkResponse = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const checkPayload = (await checkResponse.json()) as CheckEmailResponse;

      if (!checkResponse.ok) {
        throw new Error(
          checkPayload.message ??
            "We could not verify your app account right now. Please try again.",
        );
      }

      if (!checkPayload.exists) {
        setState("missing");
        setMessage(
          checkPayload.message ??
            "Please install the app and create your account first.",
        );
        return;
      }

      setState("creating");

      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          planCode: plan.code,
        }),
      });

      const checkoutPayload = (await checkoutResponse.json()) as CheckoutResponse;

      if (!checkoutResponse.ok) {
        throw new Error(
          checkoutPayload.message ??
            "Unable to create checkout session. Please try again shortly.",
        );
      }

      if (checkoutPayload.url) {
        window.location.assign(checkoutPayload.url);
        return;
      }

      throw new Error(
        "Checkout session was created without a redirect URL. Backend must return { url }.",
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Unexpected error during checkout.",
      );
    }
  });

  return (
    <AnimatePresence>
      {open && plan ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="premium-panel relative w-full max-w-lg p-6 md:p-7"
          >
            <button
              className="subtle-focus-ring absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/75 text-muted transition hover:text-foreground"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
              Secure Checkout
            </p>
            <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground">
              Continue with {plan.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enter the exact email you used in the mobile app. We verify account
              existence before opening Stripe.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">
                  App account email
                </label>
                <Input
                  autoFocus
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

              {statusText ? (
                <div
                  className={`rounded-xl border px-3.5 py-2.5 text-sm ${
                    state === "missing"
                      ? "border-danger/30 bg-danger/5 text-danger"
                      : state === "error"
                        ? "border-danger/30 bg-danger/5 text-danger"
                        : state === "creating" || state === "checking"
                          ? "border-accent/30 bg-accent-soft/45 text-accent-strong"
                          : "border-success/30 bg-success/5 text-success"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {state === "missing" || state === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {statusText}
                  </span>
                </div>
              ) : null}

              {state === "missing" ? (
                <a
                  className="subtle-focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-soft font-semibold text-accent-strong transition hover:bg-accent-soft/70"
                  href={clientEnv.appDownloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Download className="h-4 w-4" />
                  Install the app
                </a>
              ) : null}

              <Button className="w-full" loading={isBusy} size="lg" type="submit">
                {isBusy ? "Processing..." : "Verify email and continue"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
