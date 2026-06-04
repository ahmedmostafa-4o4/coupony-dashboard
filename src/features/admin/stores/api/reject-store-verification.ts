import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreVerificationRecordDto } from "../types/stores.dto";
import type { StoreVerificationRecord } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function rejectStoreVerification(
  storeId: string,
  verificationId: string | number,
  rejectionReason?: string
): Promise<AdminItemResult<StoreVerificationRecord>> {
  const data = await apiClient.post<ApiSuccessResponse<StoreVerificationRecordDto>>(
    `/admin/stores/${storeId}/verifications/${verificationId}/reject`,
    {
      reason: rejectionReason,
    }
  );

  return mapItemResponse<StoreVerificationRecordDto, StoreVerificationRecord>(
    data,
    (item) => item as unknown as StoreVerificationRecord
  );
}
