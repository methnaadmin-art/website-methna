import type { Metadata } from "next";
import { PremiumSubscriptionExperience } from "@/components/premium/premium-subscription-experience";

export const metadata: Metadata = {
  title: "Methna | Serious Muslim Matchmaking",
  description:
    "Methna is a Muslim matchmaking app designed for serious connections, privacy, and meaningful compatibility.",
};

export default function PremiumPage() {
  return <PremiumSubscriptionExperience />;
}
