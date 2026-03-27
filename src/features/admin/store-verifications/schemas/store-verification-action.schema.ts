import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

import type { RejectStoreVerificationRequest } from "../types/store-verification.types";

export interface StoreVerificationRejectActionValues {
  rejectionReason: string;
}

export const storeVerificationRejectActionSchema: AdminFormSchema<
  StoreVerificationRejectActionValues,
  RejectStoreVerificationRequest
> = {
  defaultValues: {
    rejectionReason: "",
  },
  transform(values) {
    return {
      rejection_reason: values.rejectionReason.trim(),
    };
  },
  validate(values) {
    return {
      rejectionReason: values.rejectionReason.trim()
        ? undefined
        : "Rejection reason is required.",
    };
  },
};
