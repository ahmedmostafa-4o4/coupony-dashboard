import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  trimOptional,
  toOptionalNumber,
  toRequiredNumber,
} from "@/features/admin/shared/utils/admin-form-schema";

import type {
  CreateSubscriptionPlanRequest,
  SubscriptionPlan,
  UpdateSubscriptionPlanRequest,
} from "../types/subscription-plan.types";

export interface SubscriptionPlanFormValues {
  name: string;
  slug: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  currency: string;
  maxProducts: string;
  maxEmployees: string;
  maxBranches: string;
  gracePeriodDays: string;
  degradedPeriodDays: string;
  isActive: boolean;
  sortOrder: string;
}

export function createSubscriptionPlanFormSchema(
  mode: "create"
): AdminFormSchema<SubscriptionPlanFormValues, CreateSubscriptionPlanRequest>;
export function createSubscriptionPlanFormSchema(
  mode: "update"
): AdminFormSchema<SubscriptionPlanFormValues, UpdateSubscriptionPlanRequest>;
export function createSubscriptionPlanFormSchema(
  mode: "create" | "update"
): AdminFormSchema<
  SubscriptionPlanFormValues,
  CreateSubscriptionPlanRequest | UpdateSubscriptionPlanRequest
> {
  return {
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceMonthly: "",
      priceYearly: "",
      currency: "EGP",
      maxProducts: "",
      maxEmployees: "",
      maxBranches: "",
      gracePeriodDays: "3",
      degradedPeriodDays: "7",
      isActive: true,
      sortOrder: "0",
    },
    transform(values) {
      const base = {
        name: values.name.trim(),
        description: trimOptional(values.description),
        priceMonthly: toRequiredNumber(values.priceMonthly),
        priceYearly: toRequiredNumber(values.priceYearly),
        currency: values.currency || "EGP",
        maxProducts: toOptionalNumber(values.maxProducts),
        maxEmployees: toOptionalNumber(values.maxEmployees),
        maxBranches: toOptionalNumber(values.maxBranches),
        gracePeriodDays: toRequiredNumber(values.gracePeriodDays),
        degradedPeriodDays: toRequiredNumber(values.degradedPeriodDays),
        isActive: values.isActive,
        sortOrder: toOptionalNumber(values.sortOrder),
      };

      if (mode === "create") {
        return {
          ...base,
          slug: values.slug.trim(),
        };
      }

      return base;
    },
    validate(values) {
      return {
        slug:
          mode === "create" && !values.slug.trim()
            ? "Slug is required."
            : undefined,
        name: values.name.trim() ? undefined : "Plan name is required.",
        priceMonthly:
          toRequiredNumber(values.priceMonthly) === undefined
            ? "Monthly price must be a number."
            : undefined,
        priceYearly:
          toRequiredNumber(values.priceYearly) === undefined
            ? "Yearly price must be a number."
            : undefined,
        gracePeriodDays:
          toRequiredNumber(values.gracePeriodDays) === undefined
            ? "Grace period days is required."
            : undefined,
        degradedPeriodDays:
          toRequiredNumber(values.degradedPeriodDays) === undefined
            ? "Degraded period days is required."
            : undefined,
      };
    },
  };
}

export function toSubscriptionPlanFormValues(
  plan?: SubscriptionPlan | null
): SubscriptionPlanFormValues {
  return {
    name: String(plan?.name ?? ""),
    slug: String(plan?.slug ?? ""),
    description: String(plan?.description ?? ""),
    priceMonthly: plan?.prices?.monthly !== undefined && plan?.prices?.monthly !== null ? String(plan.prices.monthly) : "",
    priceYearly: plan?.prices?.yearly !== undefined && plan?.prices?.yearly !== null ? String(plan.prices.yearly) : "",
    currency: String(plan?.prices?.currency ?? "EGP"),
    maxProducts:
      plan?.entitlements?.maxProducts !== undefined && plan?.entitlements?.maxProducts !== null
        ? String(plan.entitlements.maxProducts)
        : "",
    maxEmployees:
      plan?.entitlements?.maxEmployees !== undefined && plan?.entitlements?.maxEmployees !== null
        ? String(plan.entitlements.maxEmployees)
        : "",
    maxBranches:
      plan?.entitlements?.maxBranches !== undefined && plan?.entitlements?.maxBranches !== null
        ? String(plan.entitlements.maxBranches)
        : "",
    gracePeriodDays: "3", // Not present in the GET response
    degradedPeriodDays: "7", // Not present in the GET response
    isActive: Boolean(plan?.isActive ?? true),
    sortOrder: plan?.sortOrder !== undefined && plan?.sortOrder !== null ? String(plan.sortOrder) : "0",
  };
}
