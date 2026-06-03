"use client";

import { useAdminAction } from "@/features/admin/shared";

import { approveProductRevision } from "../api/approve-product-revision";
import { rejectProductRevision } from "../api/reject-product-revision";
import type {
  ApproveProductRevisionRequest,
  RejectProductRevisionRequest,
} from "../types/product-revision.types";

export function useProductRevisionActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    approveAction: useAdminAction({
      action: ({
        revisionId,
        payload,
      }: {
        revisionId: string;
        payload?: ApproveProductRevisionRequest;
      }) => approveProductRevision(revisionId, payload),
      onSuccess,
    }),
    rejectAction: useAdminAction({
      action: ({
        revisionId,
        payload,
      }: {
        revisionId: string;
        payload: RejectProductRevisionRequest;
      }) => rejectProductRevision(revisionId, payload),
      onSuccess,
    }),
  };
}
