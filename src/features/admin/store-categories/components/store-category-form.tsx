"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createStoreCategoryFormSchema,
  toStoreCategoryFormValues,
  type StoreCategoryFormValues,
} from "../schemas/store-category-form.schema";
import type {
  CreateStoreCategoryRequest,
  StoreCategory,
  UpdateStoreCategoryRequest,
} from "../types/store-category.types";

const fields: AdminFormField<StoreCategoryFormValues>[] = [
  {
    key: "name",
    label: "Name",
    placeholder: "Supermarkets",
  },
  {
    key: "slug",
    label: "Slug",
    placeholder: "supermarkets",
  },
  {
    key: "sortOrder",
    label: "Sort order",
    placeholder: "10",
    type: "number",
  },
  {
    key: "isActive",
    label: "Active",
    placeholder: "Store category is active",
    type: "checkbox",
  },
];

export function StoreCategoryForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: StoreCategory | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateStoreCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: StoreCategory | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateStoreCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={fields}
        initialValues={toStoreCategoryFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createStoreCategoryFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toStoreCategoryFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createStoreCategoryFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
