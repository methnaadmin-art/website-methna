export type PlanInterval = "day" | "week" | "month" | "year" | string;

export interface PremiumPlan {
  id?: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: PlanInterval;
  features: string[];
  limits?: Record<string, string | number | boolean | null>;
  badge?: string;
  recommended?: boolean;
  ctaLabel?: string;
}

export interface PlansPayload {
  plans: PremiumPlan[];
  source: "backend" | "fallback";
  updatedAt?: string;
  message?: string;
}

export interface CheckEmailPayload {
  email: string;
}

export interface CheckEmailResponse {
  exists: boolean;
  message?: string;
}

export interface CreateCheckoutPayload {
  email: string;
  planCode: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  url?: string;
  sessionId?: string;
  publishableKey?: string;
  message?: string;
}

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

export interface SubscriptionStatus {
  exists: boolean;
  planName?: string;
  planCode?: string;
  status?: string;
  renewalDate?: string;
  features?: string[];
  message?: string;
}

export interface SubscriptionManageResponse {
  url: string;
  message?: string;
}
