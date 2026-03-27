import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminSubscriptionsListResponseDto } from "../types/subscriptions.dto";
import type { SubscriptionsListFilters } from "../types/subscription.types";

export async function getSubscriptions(filters: SubscriptionsListFilters = {}) {
  const response = await apiClient.get<AdminSubscriptionsListResponseDto>(
    apiEndpoints.admin.billing.subscriptions.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
