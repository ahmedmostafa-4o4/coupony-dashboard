import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminPublishOfferResponseDto } from "../types/offers.dto";

export async function publishOffer(offerId: string) {
  return apiClient.post<AdminPublishOfferResponseDto>(
    apiEndpoints.admin.offers.publish(offerId)
  );
}
