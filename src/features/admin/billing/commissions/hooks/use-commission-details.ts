"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getCommissionById } from "../api/get-commission-by-id";
import type { Commission } from "../types/commission.types";

export function useCommissionDetails(commissionId: string) {
  return useAdminResource<Commission>({
    id: commissionId,
    getItem: getCommissionById,
  });
}
