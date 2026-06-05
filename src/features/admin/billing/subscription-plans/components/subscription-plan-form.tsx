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
  { key: "description", label: "Description", placeholder: "What this plan unlocks.", type: "textarea" },
  { key: "priceMonthly", label: "Monthly Price", placeholder: "49.99", type: "number" },
  { key: "priceYearly", label: "Yearly Price", placeholder: "499.99", type: "number" },
  { key: "currency", label: "Currency", placeholder: "EGP" },
  { key: "maxProducts", label: "Max Products", placeholder: "100", type: "number" },
  { key: "maxEmployees", label: "Max Employees", placeholder: "5", type: "number" },
  { key: "maxBranches", label: "Max Branches", placeholder: "2", type: "number" },
  { key: "gracePeriodDays", label: "Grace Period (Days)", placeholder: "3", type: "number" },
  { key: "degradedPeriodDays", label: "Degraded Period (Days)", placeholder: "7", type: "number" },
  { key: "sortOrder", label: "Sort Order", placeholder: "0", type: "number" },
  { key: "isActive", label: "Active", placeholder: "Plan is active", type: "checkbox" },
];

const createFields: AdminFormField<SubscriptionPlanFormValues>[] = [
  { key: "slug", label: "Plan slug", placeholder: "growth" },
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
