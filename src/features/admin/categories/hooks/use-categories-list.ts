"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getCategories } from "../api/get-categories";
import type { Category, CategoriesListFilters } from "../types/category.types";

export function useCategoriesList(filters: CategoriesListFilters) {
  return useAdminCollection<Category, CategoriesListFilters>({
    filters,
    getItems: getCategories,
  });
}
