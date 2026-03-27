"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getInvoiceById } from "../api/get-invoice-by-id";
import type { Invoice } from "../types/invoice.types";

export function useInvoiceDetails(invoiceId: string) {
  return useAdminResource<Invoice>({
    id: invoiceId,
    getItem: getInvoiceById,
  });
}
