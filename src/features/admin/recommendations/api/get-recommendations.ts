import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminRecommendationsListResponseDto } from "../types/recommendations.dto";
import type { RecommendationsListFilters } from "../types/recommendation.types";

export async function getRecommendations(filters: RecommendationsListFilters = {}) {
  const response = await apiClient.get<AdminRecommendationsListResponseDto>(
    apiEndpoints.admin.recommendations.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
