"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getOffers } from "../api/get-offers";
import type { Offer, OffersListFilters } from "../types/offer.types";

export function useOffersList(filters: OffersListFilters) {
  return useAdminCollection<Offer, OffersListFilters>({
    filters,
    getItems: getOffers,
  });
}
