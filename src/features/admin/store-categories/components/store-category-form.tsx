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

import type { StoreCategoriesDictionary } from "../utils/get-dictionary";

export function getStoreCategoryFormFields(dict: StoreCategoriesDictionary["form"]): AdminFormField<StoreCategoryFormValues>[] {
  return [
    {
      key: "nameEn",
      label: dict.nameEn,
      placeholder: dict.nameEnPlaceholder,
    },
    {
      key: "nameAr",
      label: dict.nameAr,
      placeholder: dict.nameArPlaceholder,
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
      key: "imageCategory",
      label: dict.imageCategory,
      description: dict.imageCategoryHint,
      placeholder: dict.imageCategory,
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
      key: "isActive",
      label: dict.status,
      placeholder: dict.statusActive,
      type: "checkbox",
    },
  ];
}

export function StoreCategoryForm({
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
  initialValues?: StoreCategory | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateStoreCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: StoreCategoriesDictionary["form"];
} | {
  description: string;
  initialValues?: StoreCategory | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateStoreCategoryRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: StoreCategoriesDictionary["form"];
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={getStoreCategoryFormFields(dict)}
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
      fields={getStoreCategoryFormFields(dict)}
      initialValues={toStoreCategoryFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createStoreCategoryFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
