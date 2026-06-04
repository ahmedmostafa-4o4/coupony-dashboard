import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreSubscriptionDto } from "../types/stores.dto";
import type { StoreSubscription } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getStoreBilling(storeId: string): Promise<AdminItemResult<StoreSubscription | null>> {
  const response = await apiClient.get<ApiSuccessResponse<StoreSubscriptionDto | null>>(
    `/admin/stores/${storeId}/billing`
  );

  return mapItemResponse(response, (data) => data as StoreSubscription | null);
}
