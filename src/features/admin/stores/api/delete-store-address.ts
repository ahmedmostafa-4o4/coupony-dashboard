import { apiClient } from "@/lib/api/client";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function deleteStoreAddress(
  storeId: string | number,
  addressId: string | number
): Promise<{ success: boolean; message?: string }> {
  const data = await apiClient.delete<ApiSuccessResponse<unknown>>(
    `/admin/stores/${storeId}/addresses/${addressId}`
  );

  return { success: data.success, message: data.message };
}
