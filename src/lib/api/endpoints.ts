export const backendEndpoints = {
  plans: ["/web/plans", "/plans/public", "/plans"],
  checkEmail: [
    "/web/subscriptions/check-email",
    "/subscriptions/check-email",
    "/auth/check-email",
  ],
  createCheckoutSession: [
    "/web/payments/public-checkout",
    "/web/payments/create-checkout-session",
    "/payments/create-checkout-session",
  ],
  terms: ["/content/terms", "/app-content/terms"],
  privacy: ["/content/privacy", "/app-content/privacy"],
  faqs: ["/content/faqs/list", "/content/faqs"],
  supportTicket: ["/support/public", "/support", "/support/tickets"],
  subscriptionStatus: [
    "/web/subscription/status",
    "/subscription/status",
    "/subscriptions/status",
  ],
  manageSubscription: [
    "/web/payments/manage-url",
    "/payments/manage-url",
    "/subscription/manage",
  ],
} as const;
