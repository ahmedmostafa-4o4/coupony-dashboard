import { getCoupons } from "./get-coupons";

import { adaptCouponDetailsFallback } from "../utils/coupon-details.adapter";

export async function getCouponById(couponId: string) {
  const response = await getCoupons();

  return adaptCouponDetailsFallback(couponId, response);
}
