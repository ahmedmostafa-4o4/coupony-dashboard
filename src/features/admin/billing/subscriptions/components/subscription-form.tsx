"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  subscriptionFormSchema,
  toSubscriptionFormValues,
  type SubscriptionFormValues,
} from "../schemas/subscription-form.schema";
import type {
  Subscription,
  UpdateSubscriptionRequest,
} from "../types/subscription.types";

const fields: AdminFormField<SubscriptionFormValues>[] = [
  { key: "status", label: "Status", placeholder: "active" },
  { key: "billingCycle", label: "Billing cycle", placeholder: "monthly" },
  {
    key: "collectionMethod",
    label: "Collection method",
    placeholder: "manual_invoice",
  },
  {
    key: "currentPeriodStart",
    label: "Current period start",
    type: "datetime-local",
  },
  {
    key: "currentPeriodEnd",
    label: "Current period end",
    type: "datetime-local",
  },
  { key: "trialStart", label: "Trial start", type: "datetime-local" },
  { key: "trialEnd", label: "Trial end", type: "datetime-local" },
  { key: "cancelledAt", label: "Cancelled at", type: "datetime-local" },
  {
    key: "cancelAtPeriodEnd",
    label: "Cancel at period end",
    placeholder: "Cancel at the current period end",
    type: "checkbox",
  },
];

export function SubscriptionForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Subscription | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateSubscriptionRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toSubscriptionFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={subscriptionFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
