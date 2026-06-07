import { useAdminResource } from "@/features/admin/shared";

import { getBannerDetails } from "../api/get-banner-details";
import type { Banner } from "../types/banner.types";

export function useBannerDetails(id: string) {
  return useAdminResource<Banner>({
    id,
    getItem: getBannerDetails,
  });
}
