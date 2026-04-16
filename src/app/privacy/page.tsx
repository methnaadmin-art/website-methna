import type { Metadata } from "next";
import { PolicyContent } from "@/components/policy/policy-content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Read Methna Privacy Policy and how user visibility, data, and trust are handled.",
};

export default function PrivacyPage() {
  return (
    <PolicyContent
      description="This policy explains how privacy, visibility control, and data handling are managed across Methna services."
      type="privacy"
    />
  );
}
