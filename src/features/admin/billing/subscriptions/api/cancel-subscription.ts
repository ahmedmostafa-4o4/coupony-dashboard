import {  } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { SubscriptionDto } from "../types/subscriptions.dto";

export async function cancelSubscription(
  subscriptionId: string,
  reason?: string
) {
  const response = await apiClient.post<ApiSuccessResponse<SubscriptionDto>>(
    apiEndpoints.admin.billing.subscriptions.detail(subscriptionId) + "/cancel",
    { reason }
  );

  return response.data;
}
