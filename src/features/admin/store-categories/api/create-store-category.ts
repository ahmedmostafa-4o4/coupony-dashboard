import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateStoreCategoryResponseDto } from "../types/store-categories.dto";
import type { CreateStoreCategoryRequest } from "../types/store-category.types";

export async function createStoreCategory(
  payload: CreateStoreCategoryRequest
) {
  return apiClient.post<
    AdminCreateStoreCategoryResponseDto,
    CreateStoreCategoryRequest
  >(apiEndpoints.admin.storeCategories.list, payload);
}
