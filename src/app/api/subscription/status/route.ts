import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { normalizeSubscriptionStatus } from "@/lib/api/normalizers";
import { emailSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim() ?? "";
  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return NextResponse.json(
      { exists: false, message: "Valid email is required to check status." },
      { status: 400 },
    );
  }

  try {
    const { data } = await backendRequestFirst<unknown>(
      [...backendEndpoints.subscriptionStatus],
      {
        method: "GET",
        headers: {
          "X-Account-Email": parsed.data,
        },
      },
    );

    return NextResponse.json(normalizeSubscriptionStatus(data));
  } catch (error) {
    if (
      error instanceof BackendRequestError &&
      [401, 403, 404, 405].includes(error.status)
    ) {
      return NextResponse.json(
        {
          exists: false,
          message:
            "Subscription status endpoint by email is not available yet. Required contract: GET /subscription/status?email=...",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        exists: false,
        message: "Unable to retrieve subscription status now.",
      },
      { status: 500 },
    );
  }
}
