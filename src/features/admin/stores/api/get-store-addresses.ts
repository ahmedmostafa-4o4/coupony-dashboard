import { apiClient } from "@/lib/api/client";
import { mapPaginatedResponse, type AdminListResult } from "@/lib/api/admin-contract";
import type { StoreAddressDto } from "../types/stores.dto";
import type { StoreAddress } from "../types/store.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getStoreAddresses(storeId: string): Promise<AdminListResult<StoreAddress>> {
  const data = await apiClient.get<ApiSuccessResponse<StoreAddressDto[]>>(
    `/admin/stores/${storeId}/addresses`
  );

  return mapPaginatedResponse(data);
}
