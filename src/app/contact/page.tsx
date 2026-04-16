import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

interface ContactPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Methna support for account, premium, privacy, and subscription help.",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolved = (await searchParams) ?? {};
  const emailParam = resolved.email;
  const prefilledEmail =
    typeof emailParam === "string"
      ? emailParam
      : Array.isArray(emailParam)
        ? emailParam[0]
        : undefined;

  return <ContactForm prefilledEmail={prefilledEmail} />;
}
