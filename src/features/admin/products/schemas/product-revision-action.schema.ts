import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  ApproveProductRevisionRequest,
  RejectProductRevisionRequest,
} from "../types/product-revision.types";

export interface ProductRevisionApproveActionValues {
  notes: string;
}

export interface ProductRevisionRejectActionValues {
  reason: string;
  notes: string;
}

export const productRevisionApproveActionSchema: AdminFormSchema<
  ProductRevisionApproveActionValues,
  ApproveProductRevisionRequest
> = {
  defaultValues: {
    notes: "",
  },
  transform(values) {
    return {
      notes: trimOptional(values.notes),
    };
  },
  validate() {
    return {};
  },
};

export const productRevisionRejectActionSchema: AdminFormSchema<
  ProductRevisionRejectActionValues,
  RejectProductRevisionRequest
> = {
  defaultValues: {
    reason: "",
    notes: "",
  },
  transform(values) {
    return {
      reason: values.reason.trim(),
      notes: trimOptional(values.notes),
    };
  },
  validate(values) {
    return {
      reason: values.reason.trim() ? undefined : "Rejection reason is required.",
    };
  },
};
