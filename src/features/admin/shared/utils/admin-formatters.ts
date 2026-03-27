import type { AdminStatusTone } from "@/features/admin/shared/types/admin-common.types";

export function formatAdminDate(value: unknown) {
  if (!value) {
    return "—";
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatAdminCurrency(value: unknown, currency = "USD") {
  if (typeof value !== "number") {
    return "—";
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatStatusLabel(value: unknown) {
  if (!value) {
    return "Unknown";
  }

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function humanizeKey(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatAdminValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("en").format(value);
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

export function getAdminEntityTitle(item: unknown, fallback: string) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return fallback;
  }

  const record = item as Record<string, unknown>;
  const candidates = [
    record.name,
    record.title,
    record.code,
    record.subject,
    record.email,
    record.storeName,
    record.id,
  ];

  const value = candidates.find(
    (candidate) => candidate !== undefined && candidate !== null && candidate !== ""
  );

  return String(value ?? fallback);
}

export function getStatusTone(value: unknown): AdminStatusTone {
  const normalized = String(value ?? "").toLowerCase();

  if (
    normalized.includes("active") ||
    normalized.includes("approved") ||
    normalized.includes("paid") ||
    normalized.includes("published") ||
    normalized.includes("success")
  ) {
    return "success";
  }

  if (
    normalized.includes("pending") ||
    normalized.includes("review") ||
    normalized.includes("draft") ||
    normalized.includes("queued")
  ) {
    return "warning";
  }

  if (
    normalized.includes("suspend") ||
    normalized.includes("reject") ||
    normalized.includes("blocked") ||
    normalized.includes("closed") ||
    normalized.includes("void") ||
    normalized.includes("archive") ||
    normalized.includes("delete")
  ) {
    return "danger";
  }

  if (normalized.includes("processing") || normalized.includes("invoiced")) {
    return "info";
  }

  return "neutral";
}
