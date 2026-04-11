import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { appendFormDataValue } from "@/features/admin/shared";

import type { AdminUpdateStoreCategoryResponseDto } from "../types/store-categories.dto";
import type { UpdateStoreCategoryRequest } from "../types/store-category.types";

export async function updateStoreCategory(
  storeCategoryId: string,
  payload: UpdateStoreCategoryRequest
) {
  const formData = new FormData();

  appendFormDataValue(formData, "name_en", payload.name_en);
  appendFormDataValue(formData, "name_ar", payload.name_ar);
  appendFormDataValue(formData, "slug", payload.slug);
  appendFormDataValue(formData, "sort_order", payload.sort_order);
  appendFormDataValue(formData, "is_active", payload.is_active);
  appendFormDataValue(formData, "icon", payload.icon);
  appendFormDataValue(formData, "_method", "PUT");

  return apiClient.post<
    AdminUpdateStoreCategoryResponseDto,
    FormData
  >(apiEndpoints.admin.storeCategories.detail(storeCategoryId), formData);
}
