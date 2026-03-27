"use client";

import { useAdminAction } from "@/features/admin/shared";

import { issueInvoice } from "../api/issue-invoice";
import { markInvoicePaid } from "../api/mark-invoice-paid";
import { voidInvoice } from "../api/void-invoice";
import type {
  IssueInvoiceRequest,
  MarkInvoicePaidRequest,
  VoidInvoiceRequest,
} from "../types/invoice.types";

export function useInvoiceActions(onSuccess?: () => Promise<void> | void) {
  return {
    issueAction: useAdminAction({
      action: ({
        invoiceId,
        payload,
      }: {
        invoiceId: string;
        payload?: IssueInvoiceRequest;
      }) => issueInvoice(invoiceId, payload),
      onSuccess,
    }),
    markPaidAction: useAdminAction({
      action: ({
        invoiceId,
        payload,
      }: {
        invoiceId: string;
        payload?: MarkInvoicePaidRequest;
      }) => markInvoicePaid(invoiceId, payload),
      onSuccess,
    }),
    voidAction: useAdminAction({
      action: ({
        invoiceId,
        payload,
      }: {
        invoiceId: string;
        payload?: VoidInvoiceRequest;
      }) => voidInvoice(invoiceId, payload),
      onSuccess,
    }),
  };
}
