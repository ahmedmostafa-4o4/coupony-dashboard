"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getRedemptionTimeline } from "../api/get-redemption-timeline";
import type {
  RedemptionTimelineEntry,
  RedemptionsListFilters,
} from "../types/redemption.types";

export function useRedemptionTimeline(redemptionId: string) {
  return useAdminCollection<RedemptionTimelineEntry, RedemptionsListFilters>({
    filters: {},
    getItems: async () => getRedemptionTimeline(redemptionId),
  });
}
