import { useAdminCollection } from "@/features/admin/shared";

import { getBanners } from "../api/get-banners";
import type { Banner, BannersListFilters } from "../types/banner.types";

export function useBannersList(filters: BannersListFilters) {
  return useAdminCollection<Banner, BannersListFilters>({
    filters,
    getItems: getBanners,
  });
}
