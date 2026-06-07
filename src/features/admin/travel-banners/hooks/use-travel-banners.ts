import { useAdminCollection } from "@/features/admin/shared";
import { getTravelBanners } from "../api/get-travel-banners";
import type { TravelBanner, TravelBannersFilters } from "../types/travel-banner.types";

export function useTravelBanners(filters: TravelBannersFilters) {
  return useAdminCollection<TravelBanner, TravelBannersFilters>({
    filters,
    getItems: getTravelBanners,
  });
}
