import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { BannerClaim } from "../types/banner-claim.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getBannerClaimDetails(id: string) {
  const response = await apiClient.get<ApiSuccessResponse<BannerClaim>>(
    `/admin/banner-claims/${id}`
  );

  return mapItemResponse(response, (item) => item);
}
