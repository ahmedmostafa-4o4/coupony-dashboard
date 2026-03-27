"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getRedemptionById } from "../api/get-redemption-by-id";
import type { Redemption } from "../types/redemption.types";

export function useRedemptionDetails(redemptionId: string) {
  return useAdminResource<Redemption>({
    id: redemptionId,
    getItem: getRedemptionById,
  });
}
