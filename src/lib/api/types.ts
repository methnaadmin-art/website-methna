export interface PolicyContent {
  type: "terms" | "privacy";
  title: string;
  content: string;
  updatedAt?: string;
}

export interface ContactTicketPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  accountEmail?: string;
}

export interface ContactTicketResponse {
  success: boolean;
  ticketId?: string;
  message: string;
}
