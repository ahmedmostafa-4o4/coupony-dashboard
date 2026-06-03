import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminCategoriesListResponseDto } from "../types/categories.dto";
import type { CategoriesListFilters } from "../types/category.types";

export async function getCategories(filters: CategoriesListFilters = {}) {
  const { status, ...rest } = filters;
  const mappedFilters = {
    ...rest,
    ...(status === "active" ? { active: 1 } : status === "inactive" ? { active: 0 } : {}),
  };

  const response = await apiClient.get<AdminCategoriesListResponseDto>(
    apiEndpoints.admin.categories.list,
    {
      query: buildAdminQuery(mappedFilters, "search"),
    }
  );

  return mapPaginatedResponse(response);
}
