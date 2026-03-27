import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminCommissionsListResponseDto } from "../types/commissions.dto";
import type { CommissionsListFilters } from "../types/commission.types";

export async function getCommissions(filters: CommissionsListFilters = {}) {
  const response = await apiClient.get<AdminCommissionsListResponseDto>(
    apiEndpoints.admin.billing.commissions.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
