import type { Metadata } from "next";
import { ManageSubscriptionPanel } from "@/components/manage/manage-subscription-panel";

interface ManagePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = {
  title: "Manage Subscription",
  description:
    "Review your Methna premium plan status and open billing management for your account.",
};

export default async function ManageSubscriptionPage({
  searchParams,
}: ManagePageProps) {
  const resolved = (await searchParams) ?? {};
  const emailParam = resolved.email;
  const prefilledEmail =
    typeof emailParam === "string"
      ? emailParam
      : Array.isArray(emailParam)
        ? emailParam[0]
        : undefined;

  return <ManageSubscriptionPanel prefilledEmail={prefilledEmail} />;
}
