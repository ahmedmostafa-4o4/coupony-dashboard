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
  icon: File | null;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
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
      icon: null,
      isActive: true,
      nameAr: "",
      nameEn: "",
      slug: "",
      sortOrder: "",
    },
    transform(values) {
      return {
        icon: values.icon ?? undefined,
        is_active: values.isActive,
        name_ar: values.nameAr.trim(),
        name_en: values.nameEn.trim(),
        slug: trimOptional(values.slug),
        sort_order: toOptionalNumber(values.sortOrder),
      };
    },
    validate(values) {
      return {
        nameAr: values.nameAr.trim()
          ? undefined
          : "Store category Arabic name is required.",
        nameEn: values.nameEn.trim()
          ? undefined
          : "Store category English name is required.",
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
    icon: null,
    isActive: Boolean(storeCategory?.isActive ?? true),
    nameAr: String(storeCategory?.nameAr ?? ""),
    nameEn: String(storeCategory?.nameEn ?? storeCategory?.name ?? ""),
    slug: String(storeCategory?.slug ?? ""),
    sortOrder:
      storeCategory?.sortOrder !== undefined &&
      storeCategory?.sortOrder !== null
        ? String(storeCategory.sortOrder)
        : "",
  };
}
