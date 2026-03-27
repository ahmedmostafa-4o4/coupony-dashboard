"use client";

import { useAdminAction } from "@/features/admin/shared";

import { updateCoupon } from "../api/update-coupon";
import type { UpdateCouponRequest } from "../types/coupon.types";

export function useCouponActions(onSuccess?: () => Promise<void> | void) {
  return {
    updateAction: useAdminAction({
      action: ({
        couponId,
        payload,
      }: {
        couponId: string;
        payload: UpdateCouponRequest;
      }) => updateCoupon(couponId, payload),
      onSuccess,
    }),
  };
}
