import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateSubscriptionResponseDto } from "../types/subscriptions.dto";
import type { UpdateSubscriptionRequest } from "../types/subscription.types";

export async function updateSubscription(
  subscriptionId: string,
  payload: UpdateSubscriptionRequest
) {
  return apiClient.patch<
    AdminUpdateSubscriptionResponseDto,
    UpdateSubscriptionRequest
  >(apiEndpoints.admin.billing.subscriptions.detail(subscriptionId), payload);
}
