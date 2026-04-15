import { NextResponse } from "next/server";
import { BackendRequestError, backendRequestFirst } from "@/lib/api/backend";
import { backendEndpoints } from "@/lib/api/endpoints";
import type { ContactTicketResponse } from "@/lib/api/types";
import { z } from "zod";

const webTicketSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Subject is required.").max(200),
  message: z.string().min(10, "Message must be at least 10 characters.").max(2000),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = webTicketSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json<ContactTicketResponse>(
      {
        success: false,
        message: "Please complete all required fields correctly.",
      },
      { status: 400 },
    );
  }

  try {
    const { data } = await backendRequestFirst<unknown>(
      [...backendEndpoints.supportTicket],
      {
        method: "POST",
        body: {
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
        },
      },
    );

    const asRecord =
      data && typeof data === "object" && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : null;

    return NextResponse.json<ContactTicketResponse>({
      success: true,
      ticketId:
        typeof asRecord?.id === "string"
          ? asRecord.id
          : typeof asRecord?.ticketId === "string"
            ? asRecord.ticketId
            : undefined,
      message: "Support ticket submitted successfully.",
    });
  } catch (error) {
    if (
      error instanceof BackendRequestError &&
      [401, 403, 404, 405].includes(error.status)
    ) {
      return NextResponse.json<ContactTicketResponse>(
        {
          success: false,
          message:
            "Public support endpoint is not available in backend yet. Required contract: POST /support/public to create ticket from website.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json<ContactTicketResponse>(
      {
        success: false,
        message: "Unable to submit support ticket now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
