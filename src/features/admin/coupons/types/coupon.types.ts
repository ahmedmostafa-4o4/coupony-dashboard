import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminCouponsQueryDto, AdminUpdateCouponDto, CouponDto } from "./coupons.dto";

export type Coupon = Camelized<CouponDto> & {
  code?: string;
};
export type CouponsListFilters = Camelized<AdminCouponsQueryDto> & {
  search?: string;
};
export type CouponsListResult = AdminListResult<Coupon>;
export type CouponDetailsResult = AdminItemResult<Coupon>;
export type UpdateCouponRequest = AdminUpdateCouponDto;
