import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { buildAdminQuery } from "@/features/admin/shared";
import type { BannerClaimsFilters, BannerClaim } from "../types/banner-claim.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";

export async function getBannerClaims(filters?: BannerClaimsFilters) {
  const query = buildAdminQuery(filters || {}, "search");
  
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<BannerClaim>>>("/admin/banner-claims", {
    query,
  });

  return mapPaginatedResponse(response);
}
