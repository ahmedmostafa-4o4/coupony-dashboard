"use client";

import { useAdminAction } from "@/features/admin/shared";

import { markCommissionInvoiced } from "../api/mark-commission-invoiced";
import { markCommissionPaid } from "../api/mark-commission-paid";
import { waiveCommission } from "../api/waive-commission";
import type { CommissionActionRequest } from "../types/commission.types";

export function useCommissionActions(onSuccess?: () => Promise<void> | void) {
  return {
    markInvoicedAction: useAdminAction({
      action: ({
        commissionId,
        payload,
      }: {
        commissionId: string;
        payload?: CommissionActionRequest;
      }) => markCommissionInvoiced(commissionId, payload),
      onSuccess,
    }),
    markPaidAction: useAdminAction({
      action: ({
        commissionId,
        payload,
      }: {
        commissionId: string;
        payload?: CommissionActionRequest;
      }) => markCommissionPaid(commissionId, payload),
      onSuccess,
    }),
    waiveAction: useAdminAction({
      action: ({
        commissionId,
        payload,
      }: {
        commissionId: string;
        payload?: CommissionActionRequest;
      }) => waiveCommission(commissionId, payload),
      onSuccess,
    }),
  };
}
