"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LifeBuoy } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactTicketResponse } from "@/lib/api/types";
import { contactTicketSchema } from "@/lib/validation/schemas";

type ContactFormValues = z.infer<typeof contactTicketSchema>;

export function ContactForm({ prefilledEmail }: { prefilledEmail?: string }) {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactTicketSchema),
    defaultValues: {
      name: "",
      email: prefilledEmail ?? "",
      accountEmail: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResponseMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      const payload = (await response.json()) as ContactTicketResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to submit your ticket.");
      }

      setIsSuccess(true);
      setResponseMessage(payload.message || "Support ticket submitted.");
      form.reset({
        ...values,
        subject: "",
        message: "",
      });
    } catch (error) {
      setIsSuccess(false);
      setResponseMessage(
        error instanceof Error
          ? error.message
          : "Unexpected error while sending message.",
      );
    }
  });

  return (
    <section className="section-wrap py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="premium-panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Contact Support
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
            We respond fast
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Submit a support ticket and our team will get back to you as soon as possible.
          </p>

          <form className="mt-7 space-y-4" onSubmit={onSubmit}>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input placeholder="you@domain.com" {...form.register("email")} />
            </Field>
            <Field label="Subject" error={form.formState.errors.subject?.message}>
              <Input
                placeholder="Billing, activation, refund, etc."
                {...form.register("subject")}
              />
            </Field>
            <Field label="Message" error={form.formState.errors.message?.message}>
              <Textarea
                placeholder="Describe the issue in detail"
                {...form.register("message")}
              />
            </Field>

            {responseMessage ? (
              <div
                className={`rounded-xl border px-3.5 py-2.5 text-sm ${
                  isSuccess
                    ? "border-success/30 bg-success/5 text-success"
                    : "border-danger/30 bg-danger/5 text-danger"
                }`}
              >
                {responseMessage}
              </div>
            ) : null}

            <Button
              className="w-full"
              loading={form.formState.isSubmitting}
              size="lg"
              type="submit"
            >
              Submit support ticket
            </Button>
          </form>
        </div>

        <aside className="premium-panel p-6 md:p-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-xl font-semibold text-foreground">
            Support workflow
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
            <li>1. Submit your ticket with email and details.</li>
            <li>2. Our team reviews and triages your request.</li>
            <li>3. You receive a response via email.</li>
            <li>
              4. For billing issues, include your account email for faster resolution.
            </li>
          </ul>

          {isSuccess ? (
            <div className="mt-5 rounded-xl border border-success/30 bg-success/5 p-3.5 text-sm text-success">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Ticket created successfully.
              </span>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
