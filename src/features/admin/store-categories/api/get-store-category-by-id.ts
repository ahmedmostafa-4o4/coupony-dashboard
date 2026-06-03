import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { mapItemResponse } from "@/lib/api/admin-contract";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import type { StoreCategoryDto } from "../types/store-categories.dto";
import type { StoreCategoryDetailsResult } from "../types/store-category.types";

export async function getStoreCategoryById(storeCategoryId: string): Promise<StoreCategoryDetailsResult> {
  const response = await apiClient.get<ApiSuccessResponse<StoreCategoryDto>>(
    apiEndpoints.admin.storeCategories.detail(storeCategoryId),
  );

  return mapItemResponse(response, (item) => ({
    ...item,
    name: item.name ?? item.nameEn ?? item.nameAr ?? "",
  }));
}
