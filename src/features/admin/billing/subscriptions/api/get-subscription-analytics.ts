import { mapSuccessData } from "@/lib/api/admin-contract";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export interface SubscriptionAnalytics {
  activeSubscribers: number;
  totalRevenue: number;
  mrr: number;
  churnLast30Days: number;
}

export async function getSubscriptionAnalytics(): Promise<SubscriptionAnalytics> {
  const response = await apiClient.get<ApiSuccessResponse<SubscriptionAnalytics>>(
    apiEndpoints.admin.billing.subscriptions.analytics
  );

  return mapSuccessData(response);
}
