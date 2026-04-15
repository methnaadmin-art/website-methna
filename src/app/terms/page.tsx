import type { Metadata } from "next";
import { PolicyContent } from "@/components/policy/policy-content";

export const metadata: Metadata = {
  title: "Terms",
  description: "Read Methna Terms of Service fetched from backend content manager.",
};

export default function TermsPage() {
  return (
    <PolicyContent
      description="These terms are fetched dynamically from your backend content system."
      type="terms"
    />
  );
}
