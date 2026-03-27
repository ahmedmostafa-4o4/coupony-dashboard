"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createSubscriptionPlan } from "../api/create-subscription-plan";
import { deleteSubscriptionPlan } from "../api/delete-subscription-plan";
import { updateSubscriptionPlan } from "../api/update-subscription-plan";
import type { UpdateSubscriptionPlanRequest } from "../types/subscription-plan.types";

export function useSubscriptionPlanActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    createAction: useAdminAction({
      action: createSubscriptionPlan,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        planId,
        payload,
      }: {
        planId: string;
        payload: UpdateSubscriptionPlanRequest;
      }) => updateSubscriptionPlan(planId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: deleteSubscriptionPlan,
      onSuccess,
    }),
  };
}
