"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  storeFormSchema,
  toStoreFormValues,
  type StoreFormValues,
} from "../schemas/store-form.schema";
import type { Store, UpdateStoreRequest } from "../types/store.types";

const fields: AdminFormField<StoreFormValues>[] = [
  { key: "name", label: "Store name", placeholder: "Fresh Mart" },
  { key: "status", label: "Status", placeholder: "active" },
  {
    key: "email",
    label: "Email",
    placeholder: "merchant@example.com",
    type: "email",
  },
  { key: "phone", label: "Phone", placeholder: "+1 555 0199" },
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
    label: "Description",
    placeholder: "Operational notes about this merchant.",
    type: "textarea",
  },
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Moderation or billing notes.",
    type: "textarea",
  },
  {
    key: "isVerified",
    label: "Verified",
    placeholder: "Store is verified",
    type: "checkbox",
  },
];

export function StoreForm({
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
  onSubmit: (payload: UpdateStoreRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
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
