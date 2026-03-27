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
  isActive: boolean;
  name: string;
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
      isActive: true,
      name: "",
      parentId: "",
      slug: "",
      sortOrder: "",
    },
    transform(values) {
      return {
        description: trimOptional(values.description),
        is_active: values.isActive,
        name: values.name.trim(),
        parent_id: trimOptional(values.parentId),
        slug: trimOptional(values.slug),
        sort_order: toOptionalNumber(values.sortOrder),
      };
    },
    validate(values) {
      return {
        name: values.name.trim() ? undefined : "Category name is required.",
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
    isActive: Boolean(category?.isActive ?? true),
    name: String(category?.name ?? ""),
    parentId: String(category?.parentId ?? ""),
    slug: String(category?.slug ?? ""),
    sortOrder:
      category?.sortOrder !== undefined && category?.sortOrder !== null
        ? String(category.sortOrder)
        : "",
  };
}
