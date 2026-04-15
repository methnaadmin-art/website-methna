import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import {
  normalizeCheckEmailResponse,
  normalizeCheckoutResponse,
} from "@/lib/api/normalizers";
import { serverEnv } from "@/lib/config/env";
import { checkoutSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid checkout payload.",
      },
      { status: 400 },
    );
  }

  try {
    const { data: checkData } = await backendRequestFirst<unknown>(
      [...backendEndpoints.checkEmail],
      {
        method: "POST",
        body: {
          email: parsed.data.email,
        },
      },
    );

    const emailCheck = normalizeCheckEmailResponse(checkData);

    if (!emailCheck.exists) {
      return NextResponse.json(
        {
          message:
            "Please install the app and create your account first.",
        },
        { status: 403 },
      );
    }

    const { data: checkoutData } = await backendRequestFirst<unknown>(
      [...backendEndpoints.createCheckoutSession],
      {
        method: "POST",
        body: {
          planCode: parsed.data.planCode,
          email: parsed.data.email,
          successUrl: parsed.data.successUrl ?? serverEnv.stripeSuccessUrl,
          cancelUrl: parsed.data.cancelUrl ?? serverEnv.stripeCancelUrl,
          source: "premium-web",
        },
      },
    );

    const normalized = normalizeCheckoutResponse(checkoutData);

    if (!normalized.url && !normalized.sessionId) {
      return NextResponse.json(
        {
          message:
            "Checkout session response is missing a redirect URL. Backend must return { url } or { sessionId }.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ...normalized,
      publishableKey: normalized.publishableKey || serverEnv.stripePublishableKey,
    });
  } catch (error) {
    if (
      error instanceof BackendRequestError &&
      [400, 401, 403, 404, 405].includes(error.status)
    ) {
      return NextResponse.json(
        {
          message:
            "Stripe checkout endpoint is unavailable in current backend. Required contract: POST /payments/create-checkout-session with { email, planCode, successUrl, cancelUrl } returning { url }.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected checkout error.",
      },
      { status: 500 },
    );
  }
}
