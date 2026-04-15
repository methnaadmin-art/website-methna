import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { normalizeCheckEmailResponse } from "@/lib/api/normalizers";
import { emailCheckSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = emailCheckSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        exists: false,
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  try {
    const { data } = await backendRequestFirst<unknown>(
      [...backendEndpoints.checkEmail],
      {
        method: "POST",
        body: { email: parsed.data.email },
      },
    );

    return NextResponse.json(normalizeCheckEmailResponse(data));
  } catch (error) {
    if (
      error instanceof BackendRequestError &&
      [401, 403, 404, 405].includes(error.status)
    ) {
      return NextResponse.json(
        {
          exists: false,
          message:
            "Email verification endpoint is not available yet. Backend contract required: POST /subscriptions/check-email { email } -> { exists: boolean }.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        exists: false,
        message: "Unable to verify app account email right now.",
      },
      { status: 500 },
    );
  }
}
