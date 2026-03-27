"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getCouponById } from "../api/get-coupon-by-id";
import type { Coupon } from "../types/coupon.types";

export function useCouponDetails(couponId: string) {
  return useAdminResource<Coupon>({
    id: couponId,
    getItem: getCouponById,
  });
}
