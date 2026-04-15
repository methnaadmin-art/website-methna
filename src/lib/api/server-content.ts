import { backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { normalizePolicyContent } from "@/lib/api/normalizers";
import type { PolicyContent } from "@/lib/api/types";

export async function getPolicyContent(
  type: "terms" | "privacy",
): Promise<PolicyContent> {
  try {
    const endpoints =
      type === "terms" ? backendEndpoints.terms : backendEndpoints.privacy;

    const { data } = await backendRequestFirst<unknown>([...endpoints]);
    return normalizePolicyContent(data, type);
  } catch {
    return {
      type,
      title: type === "terms" ? "Terms of Service" : "Privacy Policy",
      content:
        "Content is temporarily unavailable. Please try again later or contact support.",
    };
  }
}
