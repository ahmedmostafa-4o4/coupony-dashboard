import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { TravelBanner } from "../types/travel-banner.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getTravelBannerDetails(id: string) {
  const response = await apiClient.get<ApiSuccessResponse<TravelBanner>>(
    `/admin/travel-banners/${id}`
  );

  return mapItemResponse(response, (item) => item);
}
