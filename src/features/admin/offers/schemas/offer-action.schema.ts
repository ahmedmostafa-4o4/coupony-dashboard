import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  ApproveOfferRequest,
  ArchiveOfferRequest,
  RejectOfferRequest,
} from "../types/offer.types";

export interface OfferApproveActionValues {
  approvalNotes: string;
}

export interface OfferRejectActionValues {
  approvalNotes: string;
}

export interface OfferArchiveActionValues {
  reason: string;
}

export const offerApproveActionSchema: AdminFormSchema<
  OfferApproveActionValues,
  ApproveOfferRequest
> = {
  defaultValues: {
    approvalNotes: "",
  },
  transform(values) {
    return {
      approval_notes: trimOptional(values.approvalNotes),
    };
  },
  validate() {
    return {};
  },
};

export const offerRejectActionSchema: AdminFormSchema<
  OfferRejectActionValues,
  RejectOfferRequest
> = {
  defaultValues: {
    approvalNotes: "",
  },
  transform(values) {
    return {
      approval_notes: values.approvalNotes.trim(),
    };
  },
  validate(values) {
    return {
      approvalNotes: values.approvalNotes.trim()
        ? undefined
        : "Rejection notes are required.",
    };
  },
};

export const offerArchiveActionSchema: AdminFormSchema<
  OfferArchiveActionValues,
  ArchiveOfferRequest
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
