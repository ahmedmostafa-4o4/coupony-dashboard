"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getStoreVerifications } from "../api/get-store-verifications";
import type { StoreVerification, StoreVerificationsListFilters } from "../types/store-verification.types";

export function useStoreVerificationsList(filters: StoreVerificationsListFilters) {
  return useAdminCollection<StoreVerification, StoreVerificationsListFilters>({
    filters,
    getItems: getStoreVerifications,
  });
}
