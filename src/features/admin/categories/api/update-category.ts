import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateCategoryResponseDto } from "../types/categories.dto";
import type { UpdateCategoryRequest } from "../types/category.types";

export async function updateCategory(
  categoryId: string,
  payload: UpdateCategoryRequest
) {
  return apiClient.patch<AdminUpdateCategoryResponseDto, UpdateCategoryRequest>(
    apiEndpoints.admin.categories.detail(categoryId),
    payload
  );
}
