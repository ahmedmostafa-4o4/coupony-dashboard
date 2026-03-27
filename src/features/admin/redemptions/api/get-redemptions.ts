import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapRedemption } from "../utils/redemption.mappers";
import type { AdminRedemptionsListResponseDto } from "../types/redemptions.dto";
import type { RedemptionsListFilters } from "../types/redemption.types";

export async function getRedemptions(filters: RedemptionsListFilters = {}) {
  const response = await apiClient.get<AdminRedemptionsListResponseDto>(
    apiEndpoints.admin.redemptions.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response, mapRedemption);
}
