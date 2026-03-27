"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  storeBillingProfileFormSchema,
  toStoreBillingProfileFormValues,
  type StoreBillingProfileFormValues,
} from "../schemas/store-form.schema";
import type { Store, UpdateStoreBillingProfileRequest } from "../types/store.types";

const fields: AdminFormField<StoreBillingProfileFormValues>[] = [
  {
    key: "billingModel",
    label: "Billing model",
    options: [
      { label: "Commission", value: "commission" },
      { label: "Subscription", value: "subscription" },
      { label: "Hybrid", value: "hybrid" },
    ],
    type: "select",
  },
  {
    key: "commissionRate",
    label: "Commission rate",
    placeholder: "12.5",
    type: "number",
  },
  {
    key: "planId",
    label: "Plan ID",
    placeholder: "Optional subscription plan UUID",
  },
  {
    key: "effectiveFrom",
    label: "Effective from",
    type: "datetime-local",
  },
  {
    key: "effectiveTo",
    label: "Effective to",
    type: "datetime-local",
  },
  {
    key: "notes",
    label: "Notes",
    placeholder: "Billing arrangement details.",
    type: "textarea",
  },
  {
    key: "manualInvoiceEnabled",
    label: "Manual invoices enabled",
    placeholder: "Allow manual invoices for this store",
    type: "checkbox",
  },
];

export function StoreBillingProfileForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Store | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateStoreBillingProfileRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toStoreBillingProfileFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={storeBillingProfileFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
