import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { Store } from "../types/store.types";
import type { ApiSuccessResponse, StoreDto } from "@/types/admin-api.dto";

export async function detachStoreCategory(
  storeId: string,
  categoryId: string | number
): Promise<AdminItemResult<Store>> {
  const data = await apiClient.delete<ApiSuccessResponse<StoreDto>>(
    `/admin/stores/${storeId}/categories/${categoryId}`
  );

  return mapItemResponse<StoreDto, Store>(data, (item) => item as unknown as Store);
}
