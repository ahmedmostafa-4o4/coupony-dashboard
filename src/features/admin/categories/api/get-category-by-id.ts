import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { mapItemResponse } from "@/lib/api/admin-contract";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import type { CategoryDto } from "../types/categories.dto";
import type { CategoryDetailsResult } from "../types/category.types";

export async function getCategoryById(categoryId: string): Promise<CategoryDetailsResult> {
  const response = await apiClient.get<ApiSuccessResponse<CategoryDto>>(
    apiEndpoints.admin.categories.detail(categoryId),
  );

  return mapItemResponse(response, (data) => data);
}
