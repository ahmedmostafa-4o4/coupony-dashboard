"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getSubscriptionPlans } from "../api/get-subscription-plans";
import type { SubscriptionPlan, SubscriptionPlansListFilters } from "../types/subscription-plan.types";

export function useSubscriptionPlansList(filters: SubscriptionPlansListFilters) {
  return useAdminCollection<SubscriptionPlan, SubscriptionPlansListFilters>({
    filters,
    getItems: getSubscriptionPlans,
  });
}
