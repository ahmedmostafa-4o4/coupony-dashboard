"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getInvoices } from "../api/get-invoices";
import type { Invoice, InvoicesListFilters } from "../types/invoice.types";

export function useInvoicesList(filters: InvoicesListFilters) {
  return useAdminCollection<Invoice, InvoicesListFilters>({
    filters,
    getItems: getInvoices,
  });
}
