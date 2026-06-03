import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Category,
} from "../types/category.types";
import {
  trimOptional,
  toOptionalNumber,
} from "@/features/admin/shared/utils/admin-form-schema";
import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

export interface CategoryFormValues {
  description: string;
  icon: File | null;
  isActive: boolean;
  nameEn: string;
  nameAr: string;
  parentId: string;
  slug: string;
  sortOrder: string;
}

export function createCategoryFormSchema(
  mode: "create"
): AdminFormSchema<CategoryFormValues, CreateCategoryRequest>;
export function createCategoryFormSchema(
  mode: "update"
): AdminFormSchema<CategoryFormValues, UpdateCategoryRequest>;
export function createCategoryFormSchema(
  mode: "create" | "update"
): AdminFormSchema<
  CategoryFormValues,
  CreateCategoryRequest | UpdateCategoryRequest
> {
  void mode;

  return {
    defaultValues: {
      description: "",
      icon: null,
      isActive: true,
      nameEn: "",
      nameAr: "",
      parentId: "none",
      slug: "",
      sortOrder: "",
    },
    transform(values) {
      return {
        description: trimOptional(values.description),
        icon: values.icon ?? undefined,
        is_active: values.isActive,
        name_en: values.nameEn.trim(),
        name_ar: values.nameAr.trim(),
        parent_id: values.parentId === "none" ? undefined : trimOptional(values.parentId),
        slug: trimOptional(values.slug),
        sort_order: toOptionalNumber(values.sortOrder),
      };
    },
    validate(values) {
      return {
        nameEn: values.nameEn.trim() ? undefined : "English category name is required.",
        nameAr: values.nameAr.trim() ? undefined : "Arabic category name is required.",
        sortOrder:
          values.sortOrder.trim() && toOptionalNumber(values.sortOrder) === undefined
            ? "Sort order must be a number."
            : undefined,
      };
    },
  };
}

export function toCategoryFormValues(category?: Category | null): CategoryFormValues {
  return {
    description: String(category?.description ?? ""),
    icon: null,
    isActive: Boolean(category?.isActive ?? true),
    nameEn: String(category?.nameEn ?? ""),
    nameAr: String(category?.nameAr ?? ""),
    parentId: category?.parentId ? String(category.parentId) : "none",
    slug: String(category?.slug ?? ""),
    sortOrder:
      category?.sortOrder !== undefined && category?.sortOrder !== null
        ? String(category.sortOrder)
        : "",
  };
}
