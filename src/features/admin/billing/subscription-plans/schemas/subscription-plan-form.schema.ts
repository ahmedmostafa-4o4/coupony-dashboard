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
  billingCycle: string;
  code: string;
  currency: string;
  description: string;
  isActive: boolean;
  maxActiveOffers: string;
  maxBranchesPerStore: string;
  maxStaffPerStore: string;
  maxStores: string;
  name: string;
  price: string;
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
      billingCycle: "monthly",
      code: "",
      currency: "USD",
      description: "",
      isActive: true,
      maxActiveOffers: "",
      maxBranchesPerStore: "",
      maxStaffPerStore: "",
      maxStores: "",
      name: "",
      price: "",
    },
    transform(values) {
      const base = {
        billing_cycle: values.billingCycle,
        currency: trimOptional(values.currency),
        description: trimOptional(values.description),
        is_active: values.isActive,
        max_active_offers: toOptionalNumber(values.maxActiveOffers),
        max_branches_per_store: toOptionalNumber(values.maxBranchesPerStore),
        max_staff_per_store: toOptionalNumber(values.maxStaffPerStore),
        max_stores: toOptionalNumber(values.maxStores),
        name: trimOptional(values.name),
        price: toRequiredNumber(values.price),
      };

      if (mode === "create") {
        return {
          ...base,
          code: values.code.trim(),
          name: values.name.trim(),
          price: toRequiredNumber(values.price) ?? 0,
        };
      }

      return base;
    },
    validate(values) {
      return {
        code:
          mode === "create" && !values.code.trim()
            ? "Plan code is required."
            : undefined,
        name: values.name.trim() ? undefined : "Plan name is required.",
        price:
          toRequiredNumber(values.price) === undefined
            ? "Price must be a number."
            : undefined,
      };
    },
  };
}

export function toSubscriptionPlanFormValues(
  plan?: SubscriptionPlan | null
): SubscriptionPlanFormValues {
  return {
    billingCycle: String(plan?.billingCycle ?? "monthly"),
    code: String(plan?.code ?? ""),
    currency: String(plan?.currency ?? "USD"),
    description: String(plan?.description ?? ""),
    isActive: Boolean(plan?.isActive ?? true),
    maxActiveOffers:
      plan?.maxActiveOffers !== undefined && plan?.maxActiveOffers !== null
        ? String(plan.maxActiveOffers)
        : "",
    maxBranchesPerStore:
      plan?.maxBranchesPerStore !== undefined &&
      plan?.maxBranchesPerStore !== null
        ? String(plan.maxBranchesPerStore)
        : "",
    maxStaffPerStore:
      plan?.maxStaffPerStore !== undefined && plan?.maxStaffPerStore !== null
        ? String(plan.maxStaffPerStore)
        : "",
    maxStores:
      plan?.maxStores !== undefined && plan?.maxStores !== null
        ? String(plan.maxStores)
        : "",
    name: String(plan?.name ?? ""),
    price:
      plan?.price !== undefined && plan?.price !== null ? String(plan.price) : "",
  };
}
