"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  storeFormSchema,
  toStoreFormValues,
  type StoreFormValues,
} from "../schemas/store-form.schema";
import type { Store, UpdateStoreRequest } from "../types/store.types";

import type { StoresDictionary } from "../utils/get-dictionary";

export function StoreForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
  dict,
}: {
  description: string;
  initialValues?: Store | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateStoreRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: StoresDictionary["form"];
}) {
  const fields: AdminFormField<StoreFormValues>[] = [
    { key: "name", label: dict.fields.name, placeholder: "Fresh Mart" },
    {
      key: "email",
      label: dict.fields.email,
      placeholder: "merchant@example.com",
      type: "email",
    },
    { key: "phone", label: dict.fields.phone, placeholder: "+1 555 0199" },
    { key: "taxId", label: "Tax ID", placeholder: "TX-1001" },
    {
      key: "commissionRate",
      label: "Commission rate",
      placeholder: "12.5",
      type: "number",
    },
    {
      key: "subscriptionTier",
      label: "Subscription tier",
      placeholder: "growth",
    },
    {
      key: "description",
      label: dict.fields.description,
      placeholder: "Operational notes about this merchant.",
      type: "textarea",
    },
  ];
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toStoreFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={storeFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
