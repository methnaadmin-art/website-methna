import type { PolicyContent } from "@/lib/api/types";

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
