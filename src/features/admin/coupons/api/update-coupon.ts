import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateCouponResponseDto } from "../types/coupons.dto";
import type { UpdateCouponRequest } from "../types/coupon.types";

export async function updateCoupon(
  couponId: string,
  payload: UpdateCouponRequest
) {
  return apiClient.patch<AdminUpdateCouponResponseDto, UpdateCouponRequest>(
    apiEndpoints.admin.coupons.detail(couponId),
    payload
  );
}
