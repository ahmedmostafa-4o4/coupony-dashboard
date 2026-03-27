import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminRejectOfferResponseDto } from "../types/offers.dto";
import type { RejectOfferRequest } from "../types/offer.types";

export async function rejectOffer(
  offerId: string,
  payload: RejectOfferRequest
) {
  return apiClient.post<AdminRejectOfferResponseDto, RejectOfferRequest>(
    apiEndpoints.admin.offers.reject(offerId),
    payload
  );
}
