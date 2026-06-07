import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { BannerDetailsResult } from "../types/banner.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";
import type { BannerDto } from "../types/banner.dto";

export async function getBannerDetails(id: string): Promise<BannerDetailsResult> {
  const response = await apiClient.get<ApiSuccessResponse<BannerDto>>(
    `/admin/banners/${id}`
  );

  return mapItemResponse(response, (item) => item);
}
