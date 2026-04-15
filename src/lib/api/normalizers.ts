import type {
  CheckEmailResponse,
  CheckoutResponse,
  PolicyContent,
  PremiumPlan,
  SubscriptionStatus,
} from "@/lib/api/types";

type UnknownRecord = Record<string, unknown>;

const asRecord = (value: unknown): UnknownRecord | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as UnknownRecord;
};

const unwrapData = (payload: unknown): unknown => {
  const record = asRecord(payload);
  if (record && "data" in record) {
    return record.data;
  }

  return payload;
};

const toString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return undefined;
};

const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
};

const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => toString(entry))
      .filter((entry): entry is string => Boolean(entry));
  }

  const record = asRecord(value);
  if (!record) {
    return [];
  }

  return Object.entries(record)
    .filter(([, entryValue]) => {
      if (typeof entryValue === "boolean") {
        return entryValue;
      }

      if (typeof entryValue === "number") {
        return entryValue > 0 || entryValue === -1;
      }

      return false;
    })
    .map(([key]) => key);
};

const extractPlansArray = (payload: unknown): unknown[] => {
  const unwrapped = unwrapData(payload);

  if (Array.isArray(unwrapped)) {
    return unwrapped;
  }

  const record = asRecord(unwrapped);
  if (!record) {
    return [];
  }

  if (Array.isArray(record.plans)) {
    return record.plans;
  }

  if (Array.isArray(record.items)) {
    return record.items;
  }

  return [];
};

const normalizeInterval = (value: unknown): string => {
  const interval = toString(value)?.toLowerCase();

  if (!interval) {
    return "month";
  }

  if (interval === "monthly") {
    return "month";
  }

  if (interval === "yearly" || interval === "annual") {
    return "year";
  }

  return interval;
};

export const normalizePlans = (payload: unknown): PremiumPlan[] => {
  const normalized: PremiumPlan[] = [];

  extractPlansArray(payload).forEach((entry, index) => {
    const record = asRecord(entry);
    if (!record) {
      return;
    }

    const code =
      toString(record.code) ??
      toString(record.planCode) ??
      toString(record.slug) ??
      `plan-${index + 1}`;

    const name =
      toString(record.name) ?? toString(record.title) ?? code.replace(/[-_]/g, " ");

    normalized.push({
      id: toString(record.id),
      code,
      name,
      description: toString(record.description),
      price: toNumber(record.price ?? record.amount) ?? 0,
      currency: toString(record.currency)?.toUpperCase() ?? "USD",
      interval: normalizeInterval(record.interval ?? record.billingCycle),
      badge:
        toString(record.badge) ??
        toString(record.ribbon) ??
        (record.recommended === true ? "Recommended" : undefined),
      recommended: Boolean(record.recommended ?? record.isRecommended),
      ctaLabel: toString(record.ctaLabel),
      features: toStringList(
        record.features ?? record.entitlements ?? record.featureFlags,
      ),
      limits:
        (asRecord(record.limits ?? record.entitlements) as
          | Record<string, string | number | boolean | null>
          | undefined) ?? undefined,
    });
  });

  return normalized;
};

export const normalizeCheckEmailResponse = (payload: unknown): CheckEmailResponse => {
  const data = unwrapData(payload);
  const record = asRecord(data);

  if (!record) {
    return {
      exists: false,
      message: "Could not verify account email. Please try again.",
    };
  }

  const existsCandidate =
    record.exists ?? record.userExists ?? record.hasAccount ?? record.found;
  const message = toString(record.message);

  if (typeof existsCandidate === "boolean") {
    return { exists: existsCandidate, message };
  }

  return {
    exists: Boolean(record.userId ?? record.id),
    message,
  };
};

export const normalizeCheckoutResponse = (payload: unknown): CheckoutResponse => {
  const data = unwrapData(payload);
  const record = asRecord(data);

  if (!record) {
    return {};
  }

  return {
    url: toString(record.url ?? record.checkoutUrl ?? record.sessionUrl),
    sessionId: toString(record.sessionId ?? record.id),
    publishableKey: toString(record.publishableKey ?? record.stripePublicKey),
    message: toString(record.message),
  };
};

export const normalizePolicyContent = (
  payload: unknown,
  type: "terms" | "privacy",
): PolicyContent => {
  const data = unwrapData(payload);
  const record = asRecord(data);

  const defaultTitle = type === "terms" ? "Terms of Service" : "Privacy Policy";

  if (!record) {
    return {
      type,
      title: defaultTitle,
      content: "",
    };
  }

  return {
    type,
    title: toString(record.title) ?? defaultTitle,
    content: toString(record.content ?? record.body ?? record.text) ?? "",
    updatedAt: toString(record.updatedAt ?? record.updated_at),
  };
};

export const normalizeSubscriptionStatus = (
  payload: unknown,
): SubscriptionStatus => {
  const data = unwrapData(payload);
  const record = asRecord(data);

  if (!record) {
    return { exists: false, message: "No subscription details available." };
  }

  const plan = asRecord(record.plan ?? record.subscription);
  const planName =
    toString(record.planName) ??
    toString(record.plan) ??
    toString(plan?.name) ??
    toString(plan?.planName);

  const planCode =
    toString(record.planCode) ?? toString(plan?.code) ?? toString(plan?.planCode);

  return {
    exists: Boolean(planName || planCode),
    planName,
    planCode,
    status: toString(record.status ?? plan?.status),
    renewalDate: toString(
      record.renewalDate ??
        record.currentPeriodEnd ??
        record.endDate ??
        plan?.renewalDate,
    ),
    features: toStringList(record.features ?? plan?.features),
    message: toString(record.message),
  };
};
