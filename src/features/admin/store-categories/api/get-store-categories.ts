import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminStoreCategoriesListResponseDto } from "../types/store-categories.dto";
import type { StoreCategoriesListFilters } from "../types/store-category.types";

export async function getStoreCategories(filters: StoreCategoriesListFilters = {}) {
  const { status, ...rest } = filters;
  const mappedFilters = {
    ...rest,
    ...(status === "active" ? { active: 1 } : status === "inactive" ? { active: 0 } : {}),
  };

  const response = await apiClient.get<AdminStoreCategoriesListResponseDto>(
    apiEndpoints.admin.storeCategories.list,
    {
      query: buildAdminQuery(mappedFilters, "search"),
    }
  );

  return mapPaginatedResponse(response, (item) => ({
    ...item,
    name: item.name ?? item.nameEn ?? item.nameAr ?? "",
  }));
}
