import { apiClient } from "@/lib/api/client";
import { mapItemResponse, type AdminItemResult } from "@/lib/api/admin-contract";
import type { Store } from "../types/store.types";
import type { ApiSuccessResponse, StoreDto } from "@/types/admin-api.dto";

export async function attachStoreCategory(
  storeId: string,
  categoryId: string | number
): Promise<AdminItemResult<Store>> {
  const data = await apiClient.post<ApiSuccessResponse<StoreDto>>(
    `/admin/stores/${storeId}/categories`,
    { category_id: categoryId }
  );

  return mapItemResponse<StoreDto, Store>(data, (item) => item as unknown as Store);
}
