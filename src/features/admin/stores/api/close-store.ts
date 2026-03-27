import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCloseStoreResponseDto } from "../types/stores.dto";
import type { CloseStoreRequest } from "../types/store.types";

export async function closeStore(
  storeId: string,
  payload: CloseStoreRequest = {}
) {
  return apiClient.post<AdminCloseStoreResponseDto, CloseStoreRequest>(
    apiEndpoints.admin.stores.close(storeId),
    payload
  );
}
