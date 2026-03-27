"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getRedemptions } from "../api/get-redemptions";
import type { Redemption, RedemptionsListFilters } from "../types/redemption.types";

export function useRedemptionsList(filters: RedemptionsListFilters) {
  return useAdminCollection<Redemption, RedemptionsListFilters>({
    filters,
    getItems: getRedemptions,
  });
}
