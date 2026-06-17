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
import type { GlobalDictionary } from "@/messages/get-dictionary";



export function SubscriptionPlanForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
  dict,
}: {
  description: string;
  initialValues?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateSubscriptionPlanRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: GlobalDictionary;
} | {
  description: string;
  initialValues?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateSubscriptionPlanRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: GlobalDictionary;
}) {
  const baseFields: AdminFormField<SubscriptionPlanFormValues>[] = [
    { key: "name", label: dict.adminSubscriptionPlans.form.nameLabel, placeholder: dict.adminSubscriptionPlans.form.namePlaceholder },
    { key: "description", label: dict.adminSubscriptionPlans.form.descLabel, placeholder: dict.adminSubscriptionPlans.form.descPlaceholder, type: "textarea" },
    { key: "priceMonthly", label: "Monthly Price", placeholder: "49.99", type: "number" },
    { key: "priceYearly", label: "Yearly Price", placeholder: "499.99", type: "number" },
    { key: "currency", label: "Currency", placeholder: "EGP" },
    { key: "maxProducts", label: dict.adminSubscriptionPlans.form.maxProductsLabel, placeholder: "100", type: "number" },
    { key: "maxEmployees", label: dict.adminSubscriptionPlans.form.maxEmployeesLabel, placeholder: "5", type: "number" },
    { key: "maxBranches", label: dict.adminSubscriptionPlans.form.maxBranchesLabel, placeholder: "2", type: "number" },
    { key: "gracePeriodDays", label: "Grace Period (Days)", placeholder: "3", type: "number" },
    { key: "degradedPeriodDays", label: "Degraded Period (Days)", placeholder: "7", type: "number" },
    { key: "sortOrder", label: "Sort Order", placeholder: "0", type: "number" },
    { key: "isActive", label: dict.adminSubscriptionPlans.form.statusLabel, placeholder: "Plan is active", type: "checkbox" },
  ];

  const createFields: AdminFormField<SubscriptionPlanFormValues>[] = [
    { key: "slug", label: "Plan slug", placeholder: "growth" },
    ...baseFields,
  ];
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
