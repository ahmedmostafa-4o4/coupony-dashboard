import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapUser } from "../utils/user.mappers";
import type { AdminUsersListResponseDto } from "../types/users.dto";
import type { UsersListFilters } from "../types/user.types";

export async function getUsers(filters: UsersListFilters = {}) {
  const response = await apiClient.get<AdminUsersListResponseDto>(
    apiEndpoints.admin.users.list,
    {
      query: buildAdminQuery(filters, "q"),
    }
  );

  return mapPaginatedResponse(response, mapUser);
}
