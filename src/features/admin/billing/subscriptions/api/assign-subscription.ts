import {  } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { SubscriptionDto } from "../types/subscriptions.dto";

export async function assignSubscription(
  storeId: string,
  planId: string,
  billingCycle: "monthly" | "yearly"
) {
  const response = await apiClient.post<ApiSuccessResponse<SubscriptionDto>>(
    apiEndpoints.admin.billing.subscriptions.assign(storeId),
    { plan_id: planId, billing_cycle: billingCycle }
  );

  return response.data;
}
