import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateStoreCategoryResponseDto } from "../types/store-categories.dto";
import type { UpdateStoreCategoryRequest } from "../types/store-category.types";

export async function updateStoreCategory(
  storeCategoryId: string,
  payload: UpdateStoreCategoryRequest
) {
  return apiClient.patch<
    AdminUpdateStoreCategoryResponseDto,
    UpdateStoreCategoryRequest
  >(apiEndpoints.admin.storeCategories.detail(storeCategoryId), payload);
}
