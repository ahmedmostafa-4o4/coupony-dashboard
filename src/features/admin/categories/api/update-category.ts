import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { appendFormDataValue } from "@/features/admin/shared";

import type { AdminUpdateCategoryResponseDto } from "../types/categories.dto";
import type { UpdateCategoryRequest } from "../types/category.types";

export async function updateCategory(
  categoryId: string,
  payload: UpdateCategoryRequest
) {
  const formData = new FormData();

  appendFormDataValue(formData, "name", payload.name);
  appendFormDataValue(formData, "slug", payload.slug);
  appendFormDataValue(formData, "description", payload.description);
  appendFormDataValue(formData, "parent_id", payload.parent_id);
  appendFormDataValue(formData, "sort_order", payload.sort_order);
  appendFormDataValue(formData, "is_active", payload.is_active);
  appendFormDataValue(formData, "icon", payload.icon);
  appendFormDataValue(formData, "_method", "PUT");

  return apiClient.post<AdminUpdateCategoryResponseDto, FormData>(
    apiEndpoints.admin.categories.detail(categoryId),
    formData
  );
}
