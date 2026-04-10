import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  ApproveStoreRequest,
  CloseStoreRequest,
  RejectStoreRequest,
  SuspendStoreRequest,
} from "../types/store.types";

export interface StoreApproveActionValues {
  adminNotes: string;
}

export interface StoreRejectActionValues {
  adminNotes: string;
  rejectionReason: string;
}

export interface StoreSuspendActionValues {
  reason: string;
}

export interface StoreCloseActionValues {
  reason: string;
}

export const storeApproveActionSchema: AdminFormSchema<
  StoreApproveActionValues,
  ApproveStoreRequest
> = {
  defaultValues: {
    adminNotes: "",
  },
  transform(values) {
    return {
      admin_notes: trimOptional(values.adminNotes),
    };
  },
  validate() {
    return {};
  },
};

export const storeRejectActionSchema: AdminFormSchema<
  StoreRejectActionValues,
  RejectStoreRequest
> = {
  defaultValues: {
    adminNotes: "",
    rejectionReason: "",
  },
  transform(values) {
    return {
      admin_notes: trimOptional(values.adminNotes),
      reason: values.rejectionReason.trim(),
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

export const storeSuspendActionSchema: AdminFormSchema<
  StoreSuspendActionValues,
  SuspendStoreRequest
> = {
  defaultValues: {
    reason: "",
  },
  transform(values) {
    return {
      reason: values.reason.trim(),
    };
  },
  validate(values) {
    return {
      reason: values.reason.trim() ? undefined : "Suspend reason is required.",
    };
  },
};

export const storeCloseActionSchema: AdminFormSchema<
  StoreCloseActionValues,
  CloseStoreRequest
> = {
  defaultValues: {
    reason: "",
  },
  transform(values) {
    return {
      reason: trimOptional(values.reason),
    };
  },
  validate() {
    return {};
  },
};
