"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createSubscriptionPlanFormSchema,
  toSubscriptionPlanFormValues,
  type SubscriptionPlanFormValues,
} from "../schemas/subscription-plan-form.schema";
import type {
  CreateSubscriptionPlanRequest,
  SubscriptionPlan,
  UpdateSubscriptionPlanRequest,
} from "../types/subscription-plan.types";

const baseFields: AdminFormField<SubscriptionPlanFormValues>[] = [
  { key: "name", label: "Plan name", placeholder: "Growth" },
  {
    key: "billingCycle",
    label: "Billing cycle",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Quarterly", value: "quarterly" },
      { label: "Yearly", value: "yearly" },
    ],
    type: "select",
  },
  { key: "price", label: "Price", placeholder: "49.99", type: "number" },
  { key: "currency", label: "Currency", placeholder: "USD" },
  { key: "maxStores", label: "Max stores", placeholder: "10", type: "number" },
  {
    key: "maxBranchesPerStore",
    label: "Max branches / store",
    placeholder: "20",
    type: "number",
  },
  {
    key: "maxStaffPerStore",
    label: "Max staff / store",
    placeholder: "50",
    type: "number",
  },
  {
    key: "maxActiveOffers",
    label: "Max active offers",
    placeholder: "200",
    type: "number",
  },
  {
    key: "description",
    label: "Description",
    placeholder: "What this plan unlocks.",
    type: "textarea",
  },
  {
    key: "isActive",
    label: "Active",
    placeholder: "Plan is active",
    type: "checkbox",
  },
];

const createFields: AdminFormField<SubscriptionPlanFormValues>[] = [
  { key: "code", label: "Plan code", placeholder: "growth" },
  ...baseFields,
];

export function SubscriptionPlanForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateSubscriptionPlanRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateSubscriptionPlanRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={createFields}
        initialValues={toSubscriptionPlanFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createSubscriptionPlanFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={baseFields}
      initialValues={toSubscriptionPlanFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createSubscriptionPlanFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
