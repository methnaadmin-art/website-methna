import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import { normalizePolicyContent } from "@/lib/api/normalizers";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const params = await context.params;
  const type = params.slug?.toLowerCase();

  if (type !== "terms" && type !== "privacy") {
    return NextResponse.json({ message: "Unsupported content type." }, { status: 400 });
  }

  try {
    const endpoints =
      type === "terms" ? backendEndpoints.terms : backendEndpoints.privacy;

    const { data } = await backendRequestFirst<unknown>([...endpoints]);
    return NextResponse.json(normalizePolicyContent(data, type));
  } catch (error) {
    if (error instanceof BackendRequestError && error.status === 404) {
      return NextResponse.json(
        {
          type,
          title: type === "terms" ? "Terms of Service" : "Privacy Policy",
          content: "Policy content was not found in backend admin content.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        type,
        title: type === "terms" ? "Terms of Service" : "Privacy Policy",
        content: "Unable to load policy content right now.",
      },
      { status: 500 },
    );
  }
}
