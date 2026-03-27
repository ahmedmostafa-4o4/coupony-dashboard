"use client";

import { useAdminAction } from "@/features/admin/shared";

import { approveOffer } from "../api/approve-offer";
import { archiveOffer } from "../api/archive-offer";
import { publishOffer } from "../api/publish-offer";
import { rejectOffer } from "../api/reject-offer";
import type {
  ApproveOfferRequest,
  ArchiveOfferRequest,
  RejectOfferRequest,
} from "../types/offer.types";

export function useOfferActions(onSuccess?: () => Promise<void> | void) {
  return {
    approveAction: useAdminAction({
      action: ({
        offerId,
        payload,
      }: {
        offerId: string;
        payload?: ApproveOfferRequest;
      }) => approveOffer(offerId, payload),
      onSuccess,
    }),
    rejectAction: useAdminAction({
      action: ({
        offerId,
        payload,
      }: {
        offerId: string;
        payload: RejectOfferRequest;
      }) => rejectOffer(offerId, payload),
      onSuccess,
    }),
    publishAction: useAdminAction({
      action: publishOffer,
      onSuccess,
    }),
    archiveAction: useAdminAction({
      action: ({
        offerId,
        payload,
      }: {
        offerId: string;
        payload?: ArchiveOfferRequest;
      }) => archiveOffer(offerId, payload),
      onSuccess,
    }),
  };
}
