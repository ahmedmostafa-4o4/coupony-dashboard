"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getStoreCategoryById } from "../api/get-store-category-by-id";
import type { StoreCategory } from "../types/store-category.types";

export function useStoreCategoryDetails(storeCategoryId: string) {
  return useAdminResource<StoreCategory>({
    id: storeCategoryId,
    getItem: getStoreCategoryById,
  });
}
