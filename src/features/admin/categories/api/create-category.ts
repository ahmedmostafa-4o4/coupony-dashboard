import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateCategoryResponseDto } from "../types/categories.dto";
import type { CreateCategoryRequest } from "../types/category.types";

export async function createCategory(payload: CreateCategoryRequest) {
  return apiClient.post<AdminCreateCategoryResponseDto, CreateCategoryRequest>(
    apiEndpoints.admin.categories.list,
    payload
  );
}
