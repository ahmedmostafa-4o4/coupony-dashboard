import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminFraudBlockRedemptionResponseDto } from "../types/redemptions.dto";
import type { FraudBlockRedemptionRequest } from "../types/redemption.types";

export async function fraudBlockRedemption(
  redemptionId: string,
  payload: FraudBlockRedemptionRequest
) {
  return apiClient.post<
    AdminFraudBlockRedemptionResponseDto,
    FraudBlockRedemptionRequest
  >(apiEndpoints.admin.redemptions.fraudBlock(redemptionId), payload);
}
