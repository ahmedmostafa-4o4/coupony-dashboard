"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getOfferById } from "../api/get-offer-by-id";
import type { Offer } from "../types/offer.types";

export function useOfferDetails(offerId: string) {
  return useAdminResource<Offer>({
    id: offerId,
    getItem: getOfferById,
  });
}
