import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminCategoriesListResponseDto } from "../types/categories.dto";
import type { CategoriesListFilters } from "../types/category.types";

export async function getCategories(filters: CategoriesListFilters = {}) {
  const response = await apiClient.get<AdminCategoriesListResponseDto>(
    apiEndpoints.admin.categories.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
