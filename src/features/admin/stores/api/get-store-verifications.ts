import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreVerificationRecordDto } from "../types/stores.dto";
import type { StoreVerificationRecord } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getStoreVerifications(
  storeId: string
): Promise<AdminItemResult<StoreVerificationRecord[]>> {
  const data = await apiClient.get<ApiSuccessResponse<StoreVerificationRecordDto[]>>(
    `/admin/stores/${storeId}/verifications`
  );

  return mapItemResponse<StoreVerificationRecordDto[], StoreVerificationRecord[]>(
    data,
    (items) => items as unknown as StoreVerificationRecord[]
  );
}
