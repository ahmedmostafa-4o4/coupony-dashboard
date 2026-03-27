"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getCommissions } from "../api/get-commissions";
import type { Commission, CommissionsListFilters } from "../types/commission.types";

export function useCommissionsList(filters: CommissionsListFilters) {
  return useAdminCollection<Commission, CommissionsListFilters>({
    filters,
    getItems: getCommissions,
  });
}
