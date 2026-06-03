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

import type { AdminFormOption } from "@/features/admin/shared/types/admin-form.types";
import type { CategoriesDictionary } from "../utils/get-dictionary";

export function getCategoryFormFields(
  dict: CategoriesDictionary["form"],
  categoriesList?: Category[],
  currentCategoryId?: string
): AdminFormField<CategoryFormValues>[] {
  const parentOptions: AdminFormOption[] = [
    { label: dict.parentCategoryPlaceholder, value: "none" },
    ...(categoriesList
      ?.filter((c) => String(c.id) !== currentCategoryId)
      ?.map((c) => ({
        label: c.nameEn ? `${c.nameEn} / ${c.nameAr}` : c.name,
        value: String(c.id),
      })) ?? []),
  ];

  return [
    {
      key: "nameEn",
      label: dict.nameEn,
      type: "text",
      placeholder: dict.nameEnPlaceholder,
    },
    {
      key: "nameAr",
      label: dict.nameAr,
      type: "text",
      placeholder: dict.nameArPlaceholder,
    },
    {
      key: "parentId",
      label: dict.parentCategory,
      placeholder: dict.parentCategoryPlaceholder,
      type: "select",
      options: parentOptions,
    },
    {
      key: "icon",
      label: dict.icon,
      description: dict.iconHint,
      placeholder: dict.icon,
      type: "file",
      accept: "image/*",
    },
    {
      key: "slug",
      label: dict.slug,
      placeholder: dict.slugPlaceholder,
    },
    {
      key: "sortOrder",
      label: dict.sortOrder,
      placeholder: "10",
      type: "number",
    },
    {
      key: "description",
      label: dict.description,
      placeholder: dict.descriptionPlaceholder,
      type: "textarea",
    },
    {
      key: "isActive",
      label: dict.status,
      placeholder: dict.statusActive,
      type: "checkbox",
    },
  ];
}

export function CategoryForm({
  description,
  initialValues,
  isSubmitting,
  categoriesList,
  mode,
  onSubmit,
  submitLabel,
  title,
  dict,
}: {
  description: string;
  initialValues?: Category | null;
  isSubmitting?: boolean;
  categoriesList?: Category[];
  mode: "create";
  onSubmit: (payload: CreateCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: CategoriesDictionary["form"];
} | {
  description: string;
  initialValues?: Category | null;
  isSubmitting?: boolean;
  categoriesList?: Category[];
  mode: "update";
  onSubmit: (payload: UpdateCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: CategoriesDictionary["form"];
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={getCategoryFormFields(dict, categoriesList)}
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
      fields={getCategoryFormFields(dict, categoriesList, initialValues?.id)}
      initialValues={toCategoryFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createCategoryFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
