import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { appendFormDataValue } from "@/features/admin/shared";

import type { AdminCreateCategoryResponseDto } from "../types/categories.dto";
import type { CreateCategoryRequest } from "../types/category.types";

export async function createCategory(payload: CreateCategoryRequest) {
  const formData = new FormData();

  appendFormDataValue(formData, "name", payload.name);
  appendFormDataValue(formData, "slug", payload.slug);
  appendFormDataValue(formData, "description", payload.description);
  appendFormDataValue(formData, "parent_id", payload.parent_id);
  appendFormDataValue(formData, "sort_order", payload.sort_order);
  appendFormDataValue(formData, "is_active", payload.is_active);
  appendFormDataValue(formData, "icon", payload.icon);

  return apiClient.post<AdminCreateCategoryResponseDto, FormData>(
    apiEndpoints.admin.categories.list,
    formData
  );
}
