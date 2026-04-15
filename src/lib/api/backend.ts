import { serverEnv } from "@/lib/config/env";

export class BackendRequestError extends Error {
  status: number;

  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "BackendRequestError";
    this.status = status;
    this.data = data;
  }
}

interface BackendRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  allowStatuses?: number[];
}

const RETRYABLE_STATUSES = new Set([401, 403, 404, 405]);

const ensureLeadingSlash = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const parseBody = (raw: string) => {
  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
};

export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {},
): Promise<T> {
  const url = `${serverEnv.backendBaseUrl}${ensureLeadingSlash(path)}`;
  const response = await fetch(url, {
    method: options.method ?? "GET",
    cache: options.cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const raw = await response.text();
  const data = parseBody(raw);
  const allowedStatuses = options.allowStatuses ?? [200, 201, 202, 204];

  if (!allowedStatuses.includes(response.status)) {
    throw new BackendRequestError(
      `Backend request failed at ${path} with status ${response.status}`,
      response.status,
      data,
    );
  }

  return data as T;
}

export async function backendRequestFirst<T>(
  paths: string[],
  options: BackendRequestOptions = {},
): Promise<{ data: T; endpoint: string }> {
  let latestError: unknown;

  for (const path of paths) {
    try {
      const data = await backendRequest<T>(path, options);
      return { data, endpoint: path };
    } catch (error) {
      latestError = error;
      if (
        error instanceof BackendRequestError &&
        RETRYABLE_STATUSES.has(error.status)
      ) {
        continue;
      }
    }
  }

  throw latestError;
}
