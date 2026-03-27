import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapStore } from "../utils/store.mappers";
import type { AdminStoresListResponseDto } from "../types/stores.dto";
import type { StoresListFilters } from "../types/store.types";

export async function getStores(filters: StoresListFilters = {}) {
  const response = await apiClient.get<AdminStoresListResponseDto>(
    apiEndpoints.admin.stores.list,
    {
      query: buildAdminQuery(filters, "q"),
    }
  );

  return mapPaginatedResponse(response, mapStore);
}
