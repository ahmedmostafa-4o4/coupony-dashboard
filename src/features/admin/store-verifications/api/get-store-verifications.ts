import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapStoreVerification } from "../utils/store-verification.mappers";
import type { AdminStoreVerificationsListResponseDto } from "../types/store-verifications.dto";
import type { StoreVerificationsListFilters } from "../types/store-verification.types";

export async function getStoreVerifications(filters: StoreVerificationsListFilters = {}) {
  const response = await apiClient.get<AdminStoreVerificationsListResponseDto>(
    apiEndpoints.admin.storeVerifications.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response, mapStoreVerification);
}
