import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { buildAdminQuery } from "@/features/admin/shared";
import type { TravelBannersFilters, TravelBanner } from "../types/travel-banner.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";

export async function getTravelBanners(filters?: TravelBannersFilters) {
  const query = buildAdminQuery(filters || {}, "search");
  
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<TravelBanner>>>("/admin/travel-banners", {
    query,
  });

  return mapPaginatedResponse(response);
}
