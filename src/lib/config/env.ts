const stripTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

const fallbackBackendBaseUrl = "http://localhost:3000/api/v1";
const fallbackSiteUrl = "http://localhost:3000";

const backendBaseUrl = stripTrailingSlashes(
  process.env.BACKEND_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ??
    fallbackBackendBaseUrl,
);

const siteUrl = stripTrailingSlashes(
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
);

export const serverEnv = {
  backendBaseUrl,
  siteUrl,
  stripeManagementUrl:
    process.env.STRIPE_MANAGEMENT_URL ?? "https://billing.stripe.com/p/login",
  stripeSuccessUrl: process.env.STRIPE_SUCCESS_URL ?? `${siteUrl}/success`,
  stripeCancelUrl: process.env.STRIPE_CANCEL_URL ?? `${siteUrl}/cancel`,
  stripePublishableKey:
    process.env.STRIPE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
    "",
};

export const clientEnv = {
  appDownloadUrl:
    process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
    "https://play.google.com/store/apps/details?id=com.methnapp.app",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@methna.app",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
};

export const appRoutes = {
  premium: "/premium",
  manageSubscription: "/manage-subscription",
  about: "/about",
  terms: "/terms",
  privacy: "/privacy",
  contact: "/contact",
  faq: "/faq",
  success: "/success",
  cancel: "/cancel",
} as const;
