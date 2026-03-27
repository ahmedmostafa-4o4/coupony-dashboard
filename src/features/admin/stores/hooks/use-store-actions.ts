"use client";

import { useAdminAction } from "@/features/admin/shared";

import { approveStore } from "../api/approve-store";
import { closeStore } from "../api/close-store";
import { rejectStore } from "../api/reject-store";
import { suspendStore } from "../api/suspend-store";
import { updateStoreBillingProfile } from "../api/update-store-billing-profile";
import { updateStore } from "../api/update-store";
import type {
  ApproveStoreRequest,
  CloseStoreRequest,
  RejectStoreRequest,
  SuspendStoreRequest,
  UpdateStoreBillingProfileRequest,
  UpdateStoreRequest,
} from "../types/store.types";

export function useStoreActions(onSuccess?: () => Promise<void> | void) {
  return {
    updateAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload: UpdateStoreRequest;
      }) => updateStore(storeId, payload),
      onSuccess,
    }),
    approveAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload?: ApproveStoreRequest;
      }) => approveStore(storeId, payload),
      onSuccess,
    }),
    rejectAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload: RejectStoreRequest;
      }) => rejectStore(storeId, payload),
      onSuccess,
    }),
    suspendAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload: SuspendStoreRequest;
      }) => suspendStore(storeId, payload),
      onSuccess,
    }),
    closeAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload?: CloseStoreRequest;
      }) => closeStore(storeId, payload),
      onSuccess,
    }),
    updateBillingProfileAction: useAdminAction({
      action: ({
        storeId,
        payload,
      }: {
        storeId: string;
        payload: UpdateStoreBillingProfileRequest;
      }) => updateStoreBillingProfile(storeId, payload),
      onSuccess,
    }),
  };
}
