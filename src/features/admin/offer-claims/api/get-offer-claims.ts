import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { buildAdminQuery } from "@/features/admin/shared";
import type { OfferClaimsFilters, OfferClaim } from "../types/offer-claim.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";

export async function getOfferClaims(filters?: OfferClaimsFilters) {
  const query = buildAdminQuery(filters || {}, "search");
  
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<OfferClaim>>>("/admin/offer-claims", {
    query,
  });

  return mapPaginatedResponse(response);
}
