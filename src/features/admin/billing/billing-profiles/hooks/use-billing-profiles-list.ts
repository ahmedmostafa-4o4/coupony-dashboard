"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getBillingProfiles } from "../api/get-billing-profiles";
import type { BillingProfile, BillingProfilesListFilters } from "../types/billing-profile.types";

export function useBillingProfilesList(filters: BillingProfilesListFilters) {
  return useAdminCollection<BillingProfile, BillingProfilesListFilters>({
    filters,
    getItems: getBillingProfiles,
  });
}
