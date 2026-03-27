import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapRedemptionDetails } from "../utils/redemption.mappers";
import type { AdminRedemptionDetailsResponseDto } from "../types/redemptions.dto";

export async function getRedemptionById(redemptionId: string) {
  const response = await apiClient.get<AdminRedemptionDetailsResponseDto>(
    apiEndpoints.admin.redemptions.detail(redemptionId)
  );

  return mapItemResponse(response, mapRedemptionDetails);
}
