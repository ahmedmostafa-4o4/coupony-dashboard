import { apiClient } from "@/lib/api/client";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function cancelBannerClaim(id: string, reason: string) {
  const response = await apiClient.post<ApiSuccessResponse<{ id: string; status: string; cancellation_reason: string; updated_at: string }>>(
    `/admin/banner-claims/${id}/cancel`,
    { reason }
  );

  return response.data;
}
