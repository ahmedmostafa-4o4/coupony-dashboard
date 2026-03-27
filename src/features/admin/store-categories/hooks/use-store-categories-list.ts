"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getStoreCategories } from "../api/get-store-categories";
import type { StoreCategory, StoreCategoriesListFilters } from "../types/store-category.types";

export function useStoreCategoriesList(filters: StoreCategoriesListFilters) {
  return useAdminCollection<StoreCategory, StoreCategoriesListFilters>({
    filters,
    getItems: getStoreCategories,
  });
}
