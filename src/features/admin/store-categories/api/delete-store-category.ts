import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteStoreCategoryResponseDto } from "../types/store-categories.dto";

export async function deleteStoreCategory(storeCategoryId: string) {
  return apiClient.delete<AdminDeleteStoreCategoryResponseDto>(
    apiEndpoints.admin.storeCategories.detail(storeCategoryId)
  );
}
