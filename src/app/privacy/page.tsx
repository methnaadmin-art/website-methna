import type { Metadata } from "next";
import { PolicyContent } from "@/components/policy/policy-content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Read Methna Privacy Policy fetched from backend content manager.",
};

export default function PrivacyPage() {
  return (
    <PolicyContent
      description="This privacy policy is loaded from backend/admin-managed content."
      type="privacy"
    />
  );
}
