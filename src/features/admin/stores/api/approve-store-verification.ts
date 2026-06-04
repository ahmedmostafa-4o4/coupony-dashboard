import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreVerificationRecordDto } from "../types/stores.dto";
import type { StoreVerificationRecord } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function approveStoreVerification(
  storeId: string,
  verificationId: string | number
): Promise<AdminItemResult<StoreVerificationRecord>> {
  const data = await apiClient.post<ApiSuccessResponse<StoreVerificationRecordDto>>(
    `/admin/stores/${storeId}/verifications/${verificationId}/approve`
  );

  return mapItemResponse<StoreVerificationRecordDto, StoreVerificationRecord>(
    data,
    (item) => item as unknown as StoreVerificationRecord
  );
}
