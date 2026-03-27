"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getStoreVerificationById } from "../api/get-store-verification-by-id";
import type { StoreVerification } from "../types/store-verification.types";

export function useStoreVerificationDetails(verificationId: string) {
  return useAdminResource<StoreVerification>({
    id: verificationId,
    getItem: getStoreVerificationById,
  });
}
