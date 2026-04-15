import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { serverEnv } from "@/lib/config/env";
import { emailCheckSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = emailCheckSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "A valid account email is required.",
      },
      { status: 400 },
    );
  }

  try {
    const { data } = await backendRequestFirst<unknown>(
      [...backendEndpoints.manageSubscription],
      {
        method: "POST",
        body: {
          email: parsed.data.email,
        },
      },
    );

    const record =
      data && typeof data === "object" && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : null;

    const urlCandidate =
      typeof record?.url === "string"
        ? record.url
        : typeof record?.managementUrl === "string"
          ? record.managementUrl
          : null;

    if (!urlCandidate) {
      return NextResponse.json(
        {
          message:
            "Manage subscription endpoint returned no URL. Expected { url }.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: urlCandidate,
      message: "Opening your subscription management portal.",
    });
  } catch (error) {
    if (
      error instanceof BackendRequestError &&
      [401, 403, 404, 405].includes(error.status)
    ) {
      return NextResponse.json({
        url: serverEnv.stripeManagementUrl,
        message:
          "Backend manage endpoint is not available, redirecting to configured Stripe management URL.",
      });
    }

    return NextResponse.json(
      {
        message: "Unable to launch subscription management right now.",
      },
      { status: 500 },
    );
  }
}
