import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateSubscriptionPlanResponseDto } from "../types/subscription-plans.dto";
import type { UpdateSubscriptionPlanRequest } from "../types/subscription-plan.types";

export async function updateSubscriptionPlan(
  planId: string,
  payload: UpdateSubscriptionPlanRequest
) {
  return apiClient.patch<
    AdminUpdateSubscriptionPlanResponseDto,
    UpdateSubscriptionPlanRequest
  >(apiEndpoints.admin.billing.subscriptionPlans.detail(planId), payload);
}
