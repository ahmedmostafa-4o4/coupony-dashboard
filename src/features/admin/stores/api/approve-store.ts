import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminApproveStoreResponseDto } from "../types/stores.dto";
import type { ApproveStoreRequest } from "../types/store.types";

export async function approveStore(
  storeId: string,
  payload: ApproveStoreRequest = {}
) {
  return apiClient.post<AdminApproveStoreResponseDto, ApproveStoreRequest>(
    apiEndpoints.admin.stores.approve(storeId),
    payload
  );
}
