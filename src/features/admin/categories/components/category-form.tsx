"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createCategoryFormSchema,
  toCategoryFormValues,
  type CategoryFormValues,
} from "../schemas/category-form.schema";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

const fields: AdminFormField<CategoryFormValues>[] = [
  {
    key: "name",
    label: "Name",
    placeholder: "Groceries",
  },
  {
    key: "icon",
    label: "Icon",
    description: "Upload a category icon image.",
    placeholder: "Choose category icon",
    type: "file",
    accept: "image/*",
  },
  {
    key: "slug",
    label: "Slug",
    placeholder: "groceries",
  },
  {
    key: "parentId",
    label: "Parent category ID",
    placeholder: "Optional parent category UUID",
  },
  {
    key: "sortOrder",
    label: "Sort order",
    placeholder: "10",
    type: "number",
  },
  {
    key: "description",
    label: "Description",
    placeholder: "Explain what belongs in this category.",
    type: "textarea",
  },
  {
    key: "isActive",
    label: "Active",
    placeholder: "Category is active",
    type: "checkbox",
  },
];

export function CategoryForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Category | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: Category | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={fields}
        initialValues={toCategoryFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createCategoryFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toCategoryFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createCategoryFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
