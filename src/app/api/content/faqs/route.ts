import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";
  const category = searchParams.get("category") ?? undefined;

  try {
    const queryParams = new URLSearchParams({ locale });
    if (category) queryParams.set("category", category);

    const paths = backendEndpoints.faqs.map(
      (ep) => `${ep}?${queryParams.toString()}`,
    );

    const { data } = await backendRequestFirst<unknown>(paths);

    const nestedData =
      typeof data === "object" && data !== null && "data" in data
        ? (data as { data?: unknown }).data
        : undefined;

    const faqs = Array.isArray(data)
      ? data
      : Array.isArray(nestedData)
        ? nestedData
        : [];

    return NextResponse.json(faqs);
  } catch (error) {
    if (error instanceof BackendRequestError && [404, 405].includes(error.status)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      { message: "Unable to load FAQs right now." },
      { status: 500 },
    );
  }
}
