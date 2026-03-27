"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createRecommendation } from "../api/create-recommendation";

export function useRecommendationActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    createAction: useAdminAction({
      action: createRecommendation,
      onSuccess,
    }),
  };
}
