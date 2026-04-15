export const backendEndpoints = {
  plans: ["/plans/public", "/monetization/plans", "/plans"],
  checkEmail: [
    "/subscriptions/check-email",
    "/auth/check-email",
    "/users/check-email",
  ],
  createCheckoutSession: [
    "/payments/create-checkout-session",
    "/billing/create-checkout-session",
    "/subscriptions/create-checkout-session",
  ],
  terms: ["/content/terms", "/app-content/terms"],
  privacy: ["/content/privacy", "/app-content/privacy"],
  supportTicket: ["/support/tickets", "/support", "/support/feedback"],
  subscriptionStatus: [
    "/subscription/status",
    "/subscriptions/status",
    "/monetization/status",
  ],
  manageSubscription: [
    "/subscription/manage",
    "/subscriptions/manage",
    "/payments/manage-url",
  ],
} as const;
