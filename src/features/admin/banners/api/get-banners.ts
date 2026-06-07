import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { buildAdminQuery } from "@/features/admin/shared";
import type { BannersListFilters, BannersListResult } from "../types/banner.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";
import type { BannerDto } from "../types/banner.dto";

export async function getBanners(filters?: BannersListFilters): Promise<BannersListResult> {
  const query = buildAdminQuery(filters || {}, "search");
  
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<BannerDto>>>("/admin/banners", {
    query,
  });

  return mapPaginatedResponse(response);
}
