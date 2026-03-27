import type { ApiErrorPayload } from "@/types";
import { getAccessToken, logoutAndRedirect } from "@/lib/auth/session";

type QueryValue = string | number | boolean | null | undefined;

export interface ApiRequestOptions extends RequestInit {
  query?: Record<string, QueryValue>;
  auth?: "include" | "omit";
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status ?? 500;
    this.details = payload.details;
  }
}

function resolveBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL ??
    ""
  ).replace(/\/$/, "");
}

function resolveUrl(path: string, query?: Record<string, QueryValue>) {
  const baseUrl = resolveBaseUrl();
  const url = new URL(
    path.startsWith("http") ? path : `${baseUrl}${path}`,
    baseUrl ? undefined : "http://localhost"
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return baseUrl || path.startsWith("http")
    ? url.toString()
    : `${url.pathname}${url.search}`;
}

async function parseApiResponse<T>(response: Response) {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

async function request<T>(path: string, options: ApiRequestOptions = {}) {
  const { auth = "include", query, headers, body, ...rest } = options;
  const accessToken = auth === "include" ? getAccessToken() : null;
  const resolvedHeaders = {
    Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  const response = await fetch(resolveUrl(path, query), {
    ...rest,
    headers: resolvedHeaders,
    body,
  });

  if (!response.ok) {
    if (response.status === 401 && auth === "include") {
      logoutAndRedirect();
    }

    const errorPayload = (await parseApiResponse<ApiErrorPayload | string>(
      response
    ).catch(() => null)) as ApiErrorPayload | string | null;

    throw new ApiError({
      message:
        typeof errorPayload === "string"
          ? errorPayload
          : errorPayload?.message ?? response.statusText ?? "API request failed",
      status: response.status,
      details:
        typeof errorPayload === "string" ? undefined : errorPayload?.details,
    });
  }

  return parseApiResponse<T>(response);
}

export const apiClient = {
  get<T>(path: string, options?: ApiRequestOptions) {
    return request<T>(path, {
      ...options,
      method: "GET",
    });
  },
  post<T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions
  ) {
    return request<T>(path, {
      ...options,
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  patch<T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions
  ) {
    return request<T>(path, {
      ...options,
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  put<T, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions
  ) {
    return request<T>(path, {
      ...options,
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  delete<T>(path: string, options?: ApiRequestOptions) {
    return request<T>(path, {
      ...options,
      method: "DELETE",
    });
  },
};
