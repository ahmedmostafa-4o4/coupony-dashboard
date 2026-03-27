"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getCategoryById } from "../api/get-category-by-id";
import type { Category } from "../types/category.types";

export function useCategoryDetails(categoryId: string) {
  return useAdminResource<Category>({
    id: categoryId,
    getItem: getCategoryById,
  });
}
