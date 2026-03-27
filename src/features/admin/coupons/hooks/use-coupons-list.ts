"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getCoupons } from "../api/get-coupons";
import type { Coupon, CouponsListFilters } from "../types/coupon.types";

export function useCouponsList(filters: CouponsListFilters) {
  return useAdminCollection<Coupon, CouponsListFilters>({
    filters,
    getItems: getCoupons,
  });
}
