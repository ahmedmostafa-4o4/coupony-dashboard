import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapOfferDetails } from "../utils/offer.mappers";
import type { AdminOfferDetailsResponseDto } from "../types/offers.dto";

export async function getOfferById(offerId: string) {
  const response = await apiClient.get<AdminOfferDetailsResponseDto>(
    apiEndpoints.admin.offers.detail(offerId)
  );

  return mapItemResponse(response, mapOfferDetails);
}
