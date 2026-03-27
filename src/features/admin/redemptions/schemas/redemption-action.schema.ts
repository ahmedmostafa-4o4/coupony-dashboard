import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

import type { FraudBlockRedemptionRequest } from "../types/redemption.types";

export interface RedemptionFraudBlockActionValues {
  fraudReason: string;
}

export const redemptionFraudBlockActionSchema: AdminFormSchema<
  RedemptionFraudBlockActionValues,
  FraudBlockRedemptionRequest
> = {
  defaultValues: {
    fraudReason: "",
  },
  transform(values) {
    return {
      fraud_reason: values.fraudReason.trim(),
    };
  },
  validate(values) {
    return {
      fraudReason: values.fraudReason.trim()
        ? undefined
        : "Fraud reason is required.",
    };
  },
};
