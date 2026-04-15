import type { Metadata } from "next";
import { FaqAccordion } from "@/components/policy/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Methna.",
};

export default function FaqPage() {
  return <FaqAccordion />;
}
