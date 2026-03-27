import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminApproveStoreVerificationResponseDto } from "../types/store-verifications.dto";

export async function approveStoreVerification(verificationId: string) {
  return apiClient.post<AdminApproveStoreVerificationResponseDto>(
    apiEndpoints.admin.storeVerifications.approve(verificationId)
  );
}
