"use client";

import { useAdminAction } from "@/features/admin/shared";

import { fraudBlockRedemption } from "../api/fraud-block-redemption";
import type { FraudBlockRedemptionRequest } from "../types/redemption.types";

export function useRedemptionActions(onSuccess?: () => Promise<void> | void) {
  return {
    fraudBlockAction: useAdminAction({
      action: ({
        redemptionId,
        payload,
      }: {
        redemptionId: string;
        payload: FraudBlockRedemptionRequest;
      }) => fraudBlockRedemption(redemptionId, payload),
      onSuccess,
    }),
  };
}
