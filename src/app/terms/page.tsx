import type { Metadata } from "next";
import { PolicyContent } from "@/components/policy/policy-content";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Read Methna Terms of Service for account usage, subscriptions, and user responsibilities.",
};

export default function TermsPage() {
  return (
    <PolicyContent
      description="These terms describe account, subscription, and usage conditions for Methna services."
      type="terms"
    />
  );
}
