import type { Metadata } from "next";
import { FaqAccordion } from "@/components/policy/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Methna, premium features, privacy, safety, and account flows.",
};

export default function FaqPage() {
  return <FaqAccordion />;
}
