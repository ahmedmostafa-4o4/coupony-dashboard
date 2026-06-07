import { useAdminCollection } from "@/features/admin/shared";
import { getOfferClaims } from "../api/get-offer-claims";
import type { OfferClaimsFilters, OfferClaim } from "../types/offer-claim.types";

export function useOfferClaims(filters?: OfferClaimsFilters) {
  return useAdminCollection<OfferClaim, OfferClaimsFilters>({
    getItems: getOfferClaims,
    filters,
  });
}
