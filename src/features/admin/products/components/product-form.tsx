"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createProductFormSchema,
  toProductFormValues,
  type ProductFormValues,
} from "../schemas/product-form.schema";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../types/product.types";

const baseFields: AdminFormField<ProductFormValues>[] = [
  {
    key: "title",
    label: "Title",
    placeholder: "Everyday Essentials Bundle",
  },
  {
    key: "slug",
    label: "Slug",
    placeholder: "everyday-essentials-bundle",
  },
  {
    key: "shortDescription",
    label: "Short description",
    placeholder: "Short catalog summary",
    type: "textarea",
  },
  {
    key: "description",
    label: "Description",
    placeholder: "Detailed product description",
    type: "textarea",
  },
  {
    key: "currency",
    label: "Currency",
    placeholder: "USD",
  },
  {
    key: "sku",
    label: "SKU",
    placeholder: "SKU-1001",
  },
  {
    key: "isFeatured",
    label: "Featured",
    placeholder: "Mark this product as featured",
    type: "checkbox",
  },
  {
    key: "categoryIds",
    label: "Category IDs",
    description: "Provide a JSON array or comma/newline separated category IDs.",
    placeholder: "[\"cat-1\", \"cat-2\"]",
    type: "textarea",
  },
  {
    key: "images",
    label: "Images",
    description: "Provide the backend-compatible images payload as a JSON array.",
    placeholder: "[{\"url\":\"https://...\"}]",
    type: "textarea",
  },
  {
    key: "variants",
    label: "Variants",
    description: "Provide the backend-compatible variants payload as a JSON array.",
    placeholder: "[{\"sku\":\"SKU-RED\",\"price\":10}]",
    type: "textarea",
  },
  {
    key: "offer",
    label: "Offer",
    description: "Provide the backend-compatible offer payload as a JSON object.",
    placeholder: "{\"price\":10,\"discount\":2}",
    type: "textarea",
  },
];

const createFields: AdminFormField<ProductFormValues>[] = [
  {
    key: "storeId",
    label: "Store ID",
    placeholder: "Required on create",
  },
  ...baseFields,
];

export function ProductForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Product | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateProductRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: Product | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateProductRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={createFields}
        initialValues={toProductFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createProductFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={baseFields}
      initialValues={toProductFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createProductFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
