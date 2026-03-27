"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getSubscriptions } from "../api/get-subscriptions";
import type { Subscription, SubscriptionsListFilters } from "../types/subscription.types";

export function useSubscriptionsList(filters: SubscriptionsListFilters) {
  return useAdminCollection<Subscription, SubscriptionsListFilters>({
    filters,
    getItems: getSubscriptions,
  });
}
