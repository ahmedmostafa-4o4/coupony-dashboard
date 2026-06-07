import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { buildAdminQuery } from "@/features/admin/shared";
import type { SelectableProductsFilters, SelectableProduct } from "../types/travel-banner.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";

export async function getSelectableProducts(filters?: SelectableProductsFilters) {
  const query = buildAdminQuery(filters || {}, "search");
  
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<SelectableProduct>>>("/admin/travel-banners/selectable-products", {
    query,
  });

  return mapPaginatedResponse(response);
}
