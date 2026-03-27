import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapStoreDetails } from "../utils/store.mappers";
import type { AdminStoreDetailsResponseDto } from "../types/stores.dto";

export async function getStoreById(storeId: string) {
  const response = await apiClient.get<AdminStoreDetailsResponseDto>(
    apiEndpoints.admin.stores.detail(storeId)
  );

  return mapItemResponse(response, mapStoreDetails);
}
