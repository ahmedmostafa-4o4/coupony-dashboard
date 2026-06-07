import { useAdminResource } from "@/features/admin/shared";
import { getTravelBannerDetails } from "../api/get-travel-banner-details";
import type { TravelBanner } from "../types/travel-banner.types";

export function useTravelBannerDetails(id: string) {
  return useAdminResource<TravelBanner>({
    id,
    getItem: getTravelBannerDetails,
  });
}
