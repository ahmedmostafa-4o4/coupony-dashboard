import type {
  CreateStoreCategoryRequest,
  StoreCategory,
  UpdateStoreCategoryRequest,
} from "../types/store-category.types";
import {
  trimOptional,
  toOptionalNumber,
} from "@/features/admin/shared/utils/admin-form-schema";
import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

export interface StoreCategoryFormValues {
  isActive: boolean;
  name: string;
  slug: string;
  sortOrder: string;
}

export function createStoreCategoryFormSchema(
  mode: "create"
): AdminFormSchema<StoreCategoryFormValues, CreateStoreCategoryRequest>;
export function createStoreCategoryFormSchema(
  mode: "update"
): AdminFormSchema<StoreCategoryFormValues, UpdateStoreCategoryRequest>;
export function createStoreCategoryFormSchema(
  mode: "create" | "update"
): AdminFormSchema<
  StoreCategoryFormValues,
  CreateStoreCategoryRequest | UpdateStoreCategoryRequest
> {
  void mode;

  return {
    defaultValues: {
      isActive: true,
      name: "",
      slug: "",
      sortOrder: "",
    },
    transform(values) {
      return {
        is_active: values.isActive,
        name: values.name.trim(),
        slug: trimOptional(values.slug),
        sort_order: toOptionalNumber(values.sortOrder),
      };
    },
    validate(values) {
      return {
        name: values.name.trim() ? undefined : "Store category name is required.",
        sortOrder:
          values.sortOrder.trim() && toOptionalNumber(values.sortOrder) === undefined
            ? "Sort order must be a number."
            : undefined,
      };
    },
  };
}

export function toStoreCategoryFormValues(
  storeCategory?: StoreCategory | null
): StoreCategoryFormValues {
  return {
    isActive: Boolean(storeCategory?.isActive ?? true),
    name: String(storeCategory?.name ?? ""),
    slug: String(storeCategory?.slug ?? ""),
    sortOrder:
      storeCategory?.sortOrder !== undefined &&
      storeCategory?.sortOrder !== null
        ? String(storeCategory.sortOrder)
        : "",
  };
}
