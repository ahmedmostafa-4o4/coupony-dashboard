"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getSubscriptionById } from "../api/get-subscription-by-id";
import type { Subscription } from "../types/subscription.types";

export function useSubscriptionDetails(subscriptionId: string) {
  return useAdminResource<Subscription>({
    id: subscriptionId,
    getItem: getSubscriptionById,
  });
}
