import type { AdminLoginData } from "@/types/auth.types";

export const AUTH_ACCESS_TOKEN_COOKIE = "coupony_admin_access_token";

const AUTH_STORAGE_KEYS = [
  "access_token",
  "refresh_token",
  "token_type",
  "user",
  "session",
  "role",
  "remember_me",
] as const;

function setAuthCookie(value: string, maxAge?: number | null) {
  if (typeof document === "undefined") {
    return;
  }

  const cookieParts = [
    `${AUTH_ACCESS_TOKEN_COOKIE}=${encodeURIComponent(value)}`,
    "Path=/",
    "SameSite=Lax",
  ];

  if (window.location.protocol === "https:") {
    cookieParts.push("Secure");
  }

  if (typeof maxAge === "number" && Number.isFinite(maxAge) && maxAge > 0) {
    cookieParts.push(`Max-Age=${Math.floor(maxAge)}`);
  }

  document.cookie = cookieParts.join("; ");
}

function clearAuthCookie() {
  if (typeof document === "undefined") {
    return;
  }

  const cookieParts = [
    `${AUTH_ACCESS_TOKEN_COOKIE}=`,
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
  ];

  if (window.location.protocol === "https:") {
    cookieParts.push("Secure");
  }

  document.cookie = cookieParts.join("; ");
}

function getBrowserStorages() {
  if (typeof window === "undefined") {
    return null;
  }

  return {
    durableStorage: window.localStorage,
    transientStorage: window.sessionStorage,
  };
}

export function getAccessToken() {
  const storages = getBrowserStorages();

  if (!storages) {
    return null;
  }

  return (
    storages.durableStorage.getItem("access_token") ??
    storages.transientStorage.getItem("access_token") ??
    document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${AUTH_ACCESS_TOKEN_COOKIE}=`))
      ?.split("=")[1]
      ?.trim() ??
    null
  );
}

export function persistAuthSession(data: AdminLoginData, rememberMe: boolean) {
  const storages = getBrowserStorages();

  if (!storages) {
    return;
  }

  const { durableStorage, transientStorage } = storages;
  const activeStorage = rememberMe ? durableStorage : transientStorage;
  const staleStorage = rememberMe ? transientStorage : durableStorage;

  for (const key of AUTH_STORAGE_KEYS) {
    staleStorage.removeItem(key);
  }

  activeStorage.setItem("access_token", data.access_token);
  activeStorage.setItem("refresh_token", data.refresh_token);
  activeStorage.setItem("token_type", String(data.token_type ?? "Bearer"));
  activeStorage.setItem("user", JSON.stringify(data.user));
  activeStorage.setItem("session", JSON.stringify(data.session ?? null));
  activeStorage.setItem("role", data.role);
  activeStorage.setItem("remember_me", String(rememberMe));
  setAuthCookie(
    data.access_token,
    rememberMe ? (data.expires_in ?? undefined) : null
  );
}

export function clearAuthSession() {
  const storages = getBrowserStorages();

  if (!storages) {
    return;
  }

  for (const key of AUTH_STORAGE_KEYS) {
    storages.durableStorage.removeItem(key);
    storages.transientStorage.removeItem(key);
  }

  clearAuthCookie();
}

export function getLocalizedLoginHref() {
  if (typeof window === "undefined") {
    return "/en/login";
  }

  const [lang = "en"] = window.location.pathname.split("/").filter(Boolean);

  return `/${lang}/login`;
}

export function getLocalizedAdminHref() {
  if (typeof window === "undefined") {
    return "/en/admin";
  }

  const [lang = "en"] = window.location.pathname.split("/").filter(Boolean);

  return `/${lang}/admin`;
}

export function logoutAndRedirect() {
  if (typeof window === "undefined") {
    return;
  }

  clearAuthSession();

  const nextHref = getLocalizedLoginHref();

  if (window.location.pathname !== nextHref) {
    window.location.assign(nextHref);
  }
}
