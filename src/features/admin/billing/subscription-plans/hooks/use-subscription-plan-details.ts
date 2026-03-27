"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getSubscriptionPlanById } from "../api/get-subscription-plan-by-id";
import type { SubscriptionPlan } from "../types/subscription-plan.types";

export function useSubscriptionPlanDetails(planId: string) {
  return useAdminResource<SubscriptionPlan>({
    id: planId,
    getItem: getSubscriptionPlanById,
  });
}
