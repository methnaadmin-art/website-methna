import { NextResponse } from "next/server";
import { backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { fallbackPlans } from "@/lib/api/fallback";
import { normalizePlans } from "@/lib/api/normalizers";
import type { PlansPayload } from "@/lib/api/types";

export async function GET() {
  try {
    const { data } = await backendRequestFirst<unknown>([...backendEndpoints.plans]);
    const plans = normalizePlans(data);

    if (!plans.length) {
      throw new Error("No plans available from backend response.");
    }

    return NextResponse.json<PlansPayload>({
      plans,
      source: "backend",
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json<PlansPayload>({
      plans: fallbackPlans,
      source: "fallback",
      updatedAt: new Date().toISOString(),
      message: "Using fallback plans while backend plan endpoint is unavailable.",
    });
  }
}
