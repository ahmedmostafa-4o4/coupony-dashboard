import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapRedemptionTimelineEntry } from "../utils/redemption.mappers";
import type { AdminRedemptionTimelineResponseDto } from "../types/redemptions.dto";

export async function getRedemptionTimeline(redemptionId: string) {
  const response = await apiClient.get<AdminRedemptionTimelineResponseDto>(
    apiEndpoints.admin.redemptions.timeline(redemptionId)
  );

  return mapPaginatedResponse({
    ...response,
    data: {
      items: response.data.items,
      pagination: {
        page: 1,
        per_page: response.data.items.length,
        total: response.data.items.length,
        total_pages: 1,
      },
    },
  }, mapRedemptionTimelineEntry);
}
