import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateSubscriptionPlanResponseDto } from "../types/subscription-plans.dto";
import type { CreateSubscriptionPlanRequest } from "../types/subscription-plan.types";

export async function createSubscriptionPlan(
  payload: CreateSubscriptionPlanRequest
) {
  return apiClient.post<
    AdminCreateSubscriptionPlanResponseDto,
    CreateSubscriptionPlanRequest
  >(apiEndpoints.admin.billing.subscriptionPlans.list, payload);
}
