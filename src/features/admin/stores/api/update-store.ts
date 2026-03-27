import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateStoreResponseDto } from "../types/stores.dto";
import type { UpdateStoreRequest } from "../types/store.types";

export async function updateStore(storeId: string, payload: UpdateStoreRequest) {
  return apiClient.patch<AdminUpdateStoreResponseDto, UpdateStoreRequest>(
    apiEndpoints.admin.stores.detail(storeId),
    payload
  );
}
