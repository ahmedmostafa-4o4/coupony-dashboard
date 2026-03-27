"use client";

import { useAdminAction } from "@/features/admin/shared";

import { approveStoreVerification } from "../api/approve-store-verification";
import { rejectStoreVerification } from "../api/reject-store-verification";
import type { RejectStoreVerificationRequest } from "../types/store-verification.types";

export function useStoreVerificationActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    approveAction: useAdminAction({
      action: approveStoreVerification,
      onSuccess,
    }),
    rejectAction: useAdminAction({
      action: ({
        verificationId,
        payload,
      }: {
        verificationId: string;
        payload: RejectStoreVerificationRequest;
      }) => rejectStoreVerification(verificationId, payload),
      onSuccess,
    }),
  };
}
