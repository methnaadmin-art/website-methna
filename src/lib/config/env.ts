const stripTrailingSlashes = (value: string) => value.replace(/\/+$/, "");
const trim = (value: string) => value.trim();

const fallbackBackendBaseUrl = "http://localhost:3000/api/v1";
const fallbackSiteUrl = "http://localhost:3000";

const backendBaseUrl = stripTrailingSlashes(
  trim(process.env.BACKEND_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ??
    fallbackBackendBaseUrl),
);

const siteUrl = stripTrailingSlashes(
  trim(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
);

export const serverEnv = {
  backendBaseUrl,
  siteUrl,
  stripeManagementUrl:
    trim(process.env.STRIPE_MANAGEMENT_URL ?? "https://billing.stripe.com/p/login"),
  stripeSuccessUrl: trim(process.env.STRIPE_SUCCESS_URL ?? `${siteUrl}/success`),
  stripeCancelUrl: trim(process.env.STRIPE_CANCEL_URL ?? `${siteUrl}/cancel`),
  stripePublishableKey:
    trim(process.env.STRIPE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
    ""),
};

export const clientEnv = {
  appDownloadUrl:
    trim(process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
    "https://play.google.com/store/apps/details?id=com.methnapp.app"),
  supportEmail: trim(process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@methna.app"),
  stripePublishableKey: trim(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""),
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
