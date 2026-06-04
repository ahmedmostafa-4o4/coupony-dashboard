import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { StoreAddressDto } from "../types/stores.dto";
import type { StoreAddress } from "../types/store.types";
import { decamelizeKeys } from "@/lib/utils/case";
import type { StoreAddressPayload } from "../schemas/store-address-form.schema";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function updateStoreAddress(
  storeId: string | number,
  addressId: string | number,
  payload: StoreAddressPayload
): Promise<AdminItemResult<StoreAddress>> {
  const data = await apiClient.patch<ApiSuccessResponse<StoreAddressDto>>(
    `/admin/stores/${storeId}/addresses/${addressId}`,
    decamelizeKeys(payload)
  );

  return mapItemResponse<StoreAddressDto, StoreAddress>(data, (item) => item as unknown as StoreAddress);
}
