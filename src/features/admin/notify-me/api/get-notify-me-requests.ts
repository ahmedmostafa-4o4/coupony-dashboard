import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminNotifyMeListResponseDto } from "../types/notify-me.dto";
import type { NotifyMeRequestsListFilters } from "../types/notify-me-request.types";

export async function getNotifyMeRequests(filters: NotifyMeRequestsListFilters = {}) {
  const response = await apiClient.get<AdminNotifyMeListResponseDto>(
    apiEndpoints.admin.notifyMe.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
