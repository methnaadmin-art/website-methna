import type { Metadata } from "next";
import { PremiumSubscriptionExperience } from "@/components/premium/premium-subscription-experience";

interface PremiumPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: "Methna | Serious Muslim Matchmaking",
  description:
    "Methna is a Muslim matchmaking app designed for serious connections, privacy, and meaningful compatibility.",
};

export default async function PremiumPage({ searchParams }: PremiumPageProps) {
  const resolved = (await searchParams) ?? {};

  const emailParam = resolved.email;
  const planParam = resolved.plan;

  const prefilledEmail =
    typeof emailParam === "string"
      ? emailParam
      : Array.isArray(emailParam)
        ? emailParam[0]
        : undefined;

  const preselectedPlanCode =
    typeof planParam === "string"
      ? planParam
      : Array.isArray(planParam)
        ? planParam[0]
        : undefined;

  return (
    <PremiumSubscriptionExperience
      prefilledEmail={prefilledEmail}
      preselectedPlanCode={preselectedPlanCode}
    />
  );
}
