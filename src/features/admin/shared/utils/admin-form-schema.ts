import type {
  AdminFormErrors,
  AdminFormValues,
} from "@/features/admin/shared/types/admin-form.types";

export function trimOptional(value: string) {
  const normalized = value.trim();

  return normalized.length > 0 ? normalized : undefined;
}

export function toOptionalNumber(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export function toRequiredNumber(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export function splitList(value: string) {
  return value
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function validateEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function parseJsonObject(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  const parsed = JSON.parse(normalized) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Enter a valid JSON object.");
  }

  return parsed as Record<string, unknown>;
}

export function hasErrors<TValues extends AdminFormValues>(
  errors: AdminFormErrors<TValues>
) {
  return Object.values(errors).some(Boolean);
}
