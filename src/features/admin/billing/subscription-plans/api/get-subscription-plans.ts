import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminSubscriptionPlansListResponseDto } from "../types/subscription-plans.dto";
import type { SubscriptionPlansListFilters } from "../types/subscription-plan.types";

export async function getSubscriptionPlans(filters: SubscriptionPlansListFilters = {}) {
  const response = await apiClient.get<AdminSubscriptionPlansListResponseDto>(
    apiEndpoints.admin.billing.subscriptionPlans.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
