import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminRejectStoreResponseDto } from "../types/stores.dto";
import type { RejectStoreRequest } from "../types/store.types";

export async function rejectStore(
  storeId: string,
  payload: RejectStoreRequest
) {
  return apiClient.post<AdminRejectStoreResponseDto, RejectStoreRequest>(
    apiEndpoints.admin.stores.reject(storeId),
    payload
  );
}
