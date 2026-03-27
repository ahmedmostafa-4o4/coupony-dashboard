"use client";

import { useAdminAction } from "@/features/admin/shared";

import { updateSubscription } from "../api/update-subscription";
import type { UpdateSubscriptionRequest } from "../types/subscription.types";

export function useSubscriptionActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    updateAction: useAdminAction({
      action: ({
        subscriptionId,
        payload,
      }: {
        subscriptionId: string;
        payload: UpdateSubscriptionRequest;
      }) => updateSubscription(subscriptionId, payload),
      onSuccess,
    }),
  };
}
