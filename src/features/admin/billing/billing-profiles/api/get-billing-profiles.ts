import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminBillingProfilesListResponseDto } from "../types/billing-profiles.dto";
import type { BillingProfilesListFilters } from "../types/billing-profile.types";

export async function getBillingProfiles(filters: BillingProfilesListFilters = {}) {
  const response = await apiClient.get<AdminBillingProfilesListResponseDto>(
    apiEndpoints.admin.billing.profiles.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
