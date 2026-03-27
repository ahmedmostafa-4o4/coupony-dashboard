import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteCategoryResponseDto } from "../types/categories.dto";

export async function deleteCategory(categoryId: string) {
  return apiClient.delete<AdminDeleteCategoryResponseDto>(
    apiEndpoints.admin.categories.detail(categoryId)
  );
}
