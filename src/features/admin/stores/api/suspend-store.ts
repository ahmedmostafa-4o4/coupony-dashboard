import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminSuspendStoreResponseDto } from "../types/stores.dto";
import type { SuspendStoreRequest } from "../types/store.types";

export async function suspendStore(
  storeId: string,
  payload: SuspendStoreRequest
) {
  return apiClient.post<AdminSuspendStoreResponseDto, SuspendStoreRequest>(
    apiEndpoints.admin.stores.suspend(storeId),
    payload
  );
}
