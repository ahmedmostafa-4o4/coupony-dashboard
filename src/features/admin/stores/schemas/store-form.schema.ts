import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  trimOptional,
  toOptionalNumber,
} from "@/features/admin/shared/utils/admin-form-schema";

import type {
  Store,
  UpdateStoreBillingProfileRequest,
  UpdateStoreRequest,
} from "../types/store.types";

export interface StoreFormValues {
  commissionRate: string;
  description: string;
  email: string;
  name: string;
  phone: string;
  subscriptionTier: string;
  taxId: string;
}

export interface StoreBillingProfileFormValues {
  billingModel: string;
  commissionRate: string;
  effectiveFrom: string;
  effectiveTo: string;
  manualInvoiceEnabled: boolean;
  notes: string;
  planId: string;
}

export const storeFormSchema: AdminFormSchema<StoreFormValues, UpdateStoreRequest> = {
  defaultValues: {
    commissionRate: "",
    description: "",
    email: "",
    name: "",
    phone: "",
    subscriptionTier: "",
    taxId: "",
  },
  transform(values) {
    return {
      commission_rate: toOptionalNumber(values.commissionRate),
      description: trimOptional(values.description) ?? null,
      email: trimOptional(values.email),
      name: trimOptional(values.name),
      phone: trimOptional(values.phone),
      subscription_tier: trimOptional(values.subscriptionTier),
      tax_id: trimOptional(values.taxId) ?? null,
    };
  },
  validate(values) {
    return {
      commissionRate:
        values.commissionRate.trim() &&
        toOptionalNumber(values.commissionRate) === undefined
          ? "Commission rate must be numeric."
          : undefined,
    };
  },
};

export const storeBillingProfileFormSchema: AdminFormSchema<
  StoreBillingProfileFormValues,
  UpdateStoreBillingProfileRequest
> = {
  defaultValues: {
    billingModel: "commission",
    commissionRate: "",
    effectiveFrom: "",
    effectiveTo: "",
    manualInvoiceEnabled: false,
    notes: "",
    planId: "",
  },
  transform(values) {
    return {
      billing_model:
        values.billingModel as UpdateStoreBillingProfileRequest["billing_model"],
      commission_rate: toOptionalNumber(values.commissionRate),
      effective_from: trimOptional(values.effectiveFrom),
      effective_to: trimOptional(values.effectiveTo),
      manual_invoice_enabled: values.manualInvoiceEnabled,
      notes: trimOptional(values.notes),
      plan_id: trimOptional(values.planId),
    };
  },
  validate(values) {
    return {
      billingModel: values.billingModel.trim()
        ? undefined
        : "Billing model is required.",
      commissionRate:
        values.commissionRate.trim() &&
        toOptionalNumber(values.commissionRate) === undefined
          ? "Commission rate must be numeric."
          : undefined,
    };
  },
};

export function toStoreFormValues(store?: Store | null): StoreFormValues {
  return {
    commissionRate:
      store?.commissionRate !== undefined && store?.commissionRate !== null
        ? String(store.commissionRate)
        : "",
    description: String(store?.description ?? ""),
    email: String(store?.email ?? ""),
    name: String(store?.name ?? ""),
    phone: String(store?.phone ?? ""),
    subscriptionTier: String(store?.subscriptionTier ?? ""),
    taxId: String(store?.taxId ?? ""),
  };
}

export function toStoreBillingProfileFormValues(
  store?: Store | null
): StoreBillingProfileFormValues {
  return {
    billingModel: String(store?.billingProfile?.billingModel ?? "commission"),
    commissionRate:
      store?.billingProfile?.commissionRate !== undefined &&
      store?.billingProfile?.commissionRate !== null
        ? String(store.billingProfile.commissionRate)
        : "",
    effectiveFrom: String(store?.billingProfile?.effectiveFrom ?? ""),
    effectiveTo: String(store?.billingProfile?.effectiveTo ?? ""),
    manualInvoiceEnabled: Boolean(
      store?.billingProfile?.manualInvoiceEnabled ?? false
    ),
    notes: String(store?.billingProfile?.notes ?? ""),
    planId: String(store?.billingProfile?.planId ?? ""),
  };
}
