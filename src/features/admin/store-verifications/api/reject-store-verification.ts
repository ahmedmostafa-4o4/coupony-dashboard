import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminRejectStoreVerificationResponseDto } from "../types/store-verifications.dto";
import type { RejectStoreVerificationRequest } from "../types/store-verification.types";

export async function rejectStoreVerification(
  verificationId: string,
  payload: RejectStoreVerificationRequest
) {
  return apiClient.post<
    AdminRejectStoreVerificationResponseDto,
    RejectStoreVerificationRequest
  >(apiEndpoints.admin.storeVerifications.reject(verificationId), payload);
}
