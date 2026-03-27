import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteSubscriptionPlanResponseDto } from "../types/subscription-plans.dto";

export async function deleteSubscriptionPlan(planId: string) {
  return apiClient.delete<AdminDeleteSubscriptionPlanResponseDto>(
    apiEndpoints.admin.billing.subscriptionPlans.detail(planId)
  );
}
