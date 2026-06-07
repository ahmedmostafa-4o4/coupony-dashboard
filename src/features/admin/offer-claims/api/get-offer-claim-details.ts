import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import type { OfferClaim } from "../types/offer-claim.types";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function getOfferClaimDetails(id: string) {
  const response = await apiClient.get<ApiSuccessResponse<OfferClaim>>(
    `/admin/offer-claims/${id}`
  );

  return mapItemResponse(response, (item) => item);
}
