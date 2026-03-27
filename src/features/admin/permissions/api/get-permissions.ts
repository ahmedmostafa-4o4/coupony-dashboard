import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminPermissionsListResponseDto } from "../types/permissions.dto";
import type { PermissionsListFilters } from "../types/permission.types";

export async function getPermissions(filters: PermissionsListFilters = {}) {
  const response = await apiClient.get<AdminPermissionsListResponseDto>(
    apiEndpoints.admin.permissions.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
