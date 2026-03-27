import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateStoreBillingProfileResponseDto } from "../types/stores.dto";
import type { UpdateStoreBillingProfileRequest } from "../types/store.types";

export async function updateStoreBillingProfile(
  storeId: string,
  payload: UpdateStoreBillingProfileRequest
) {
  return apiClient.put<
    AdminUpdateStoreBillingProfileResponseDto,
    UpdateStoreBillingProfileRequest
  >(apiEndpoints.admin.stores.billingProfile(storeId), payload);
}
