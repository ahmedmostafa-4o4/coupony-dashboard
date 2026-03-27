import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminApproveOfferResponseDto } from "../types/offers.dto";
import type { ApproveOfferRequest } from "../types/offer.types";

export async function approveOffer(
  offerId: string,
  payload: ApproveOfferRequest = {}
) {
  return apiClient.post<AdminApproveOfferResponseDto, ApproveOfferRequest>(
    apiEndpoints.admin.offers.approve(offerId),
    payload
  );
}
