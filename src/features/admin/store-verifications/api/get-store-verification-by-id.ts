import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapStoreVerificationDetails } from "../utils/store-verification.mappers";
import type { AdminStoreVerificationDetailsResponseDto } from "../types/store-verifications.dto";

export async function getStoreVerificationById(verificationId: string) {
  const response = await apiClient.get<AdminStoreVerificationDetailsResponseDto>(
    apiEndpoints.admin.storeVerifications.detail(verificationId)
  );

  return mapItemResponse(response, mapStoreVerificationDetails);
}
