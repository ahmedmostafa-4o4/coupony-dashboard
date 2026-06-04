import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreVerificationRecordDto } from "../types/stores.dto";
import type { StoreVerificationRecord } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function uploadStoreVerification(
  storeId: string,
  documentType: string,
  file: File
): Promise<AdminItemResult<StoreVerificationRecord>> {
  const formData = new FormData();
  formData.append("document_type", documentType);
  formData.append("document", file);

  const data = await apiClient.post<ApiSuccessResponse<StoreVerificationRecordDto>>(
    `/admin/stores/${storeId}/verifications`,
    formData
  );

  return mapItemResponse<StoreVerificationRecordDto, StoreVerificationRecord>(
    data,
    (item) => item as unknown as StoreVerificationRecord
  );
}
