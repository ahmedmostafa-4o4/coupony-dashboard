import type { Camelized } from "@/types";

import type { CouponDto } from "../types/coupons.dto";
import type { Coupon } from "../types/coupon.types";

export function mapCoupon(item: Camelized<CouponDto>): Coupon {
  return {
    ...item,
    code: item.title ?? undefined,
  };
}
