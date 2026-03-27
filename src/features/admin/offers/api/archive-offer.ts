import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminArchiveOfferResponseDto } from "../types/offers.dto";
import type { ArchiveOfferRequest } from "../types/offer.types";

export async function archiveOffer(
  offerId: string,
  payload: ArchiveOfferRequest = {}
) {
  return apiClient.post<AdminArchiveOfferResponseDto, ArchiveOfferRequest>(
    apiEndpoints.admin.offers.archive(offerId),
    payload
  );
}
