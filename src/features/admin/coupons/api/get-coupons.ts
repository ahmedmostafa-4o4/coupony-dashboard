import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapCoupon } from "../utils/coupon.mappers";
import type { AdminCouponsListResponseDto } from "../types/coupons.dto";
import type { CouponsListFilters } from "../types/coupon.types";

export async function getCoupons(filters: CouponsListFilters = {}) {
  const response = await apiClient.get<AdminCouponsListResponseDto>(
    apiEndpoints.admin.coupons.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response, mapCoupon);
}
