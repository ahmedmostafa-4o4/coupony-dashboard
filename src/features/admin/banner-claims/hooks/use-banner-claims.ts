import { useAdminCollection } from "@/features/admin/shared";
import { getBannerClaims } from "../api/get-banner-claims";
import type { BannerClaimsFilters, BannerClaim } from "../types/banner-claim.types";

export function useBannerClaims(filters?: BannerClaimsFilters) {
  return useAdminCollection<BannerClaim, BannerClaimsFilters>({
    getItems: getBannerClaims,
    filters,
  });
}
