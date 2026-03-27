import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type { Coupon, UpdateCouponRequest } from "../types/coupon.types";

export interface CouponFormValues {
  description: string;
  endAt: string;
  startAt: string;
  status: string;
  title: string;
}

export const couponFormSchema: AdminFormSchema<
  CouponFormValues,
  UpdateCouponRequest
> = {
  defaultValues: {
    description: "",
    endAt: "",
    startAt: "",
    status: "",
    title: "",
  },
  transform(values) {
    return {
      description: trimOptional(values.description),
      end_at: trimOptional(values.endAt),
      start_at: trimOptional(values.startAt),
      status: trimOptional(values.status),
      title: trimOptional(values.title),
    };
  },
  validate() {
    return {};
  },
};

export function toCouponFormValues(coupon?: Coupon | null): CouponFormValues {
  return {
    description: String(coupon?.description ?? ""),
    endAt: String(coupon?.endAt ?? ""),
    startAt: String(coupon?.startAt ?? ""),
    status: String(coupon?.status ?? ""),
    title: String(coupon?.title ?? ""),
  };
}
