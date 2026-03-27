import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminRolesListResponseDto } from "../types/roles.dto";
import type { RolesListFilters } from "../types/role.types";

export async function getRoles(filters: RolesListFilters = {}) {
  const response = await apiClient.get<AdminRolesListResponseDto>(
    apiEndpoints.admin.roles.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
