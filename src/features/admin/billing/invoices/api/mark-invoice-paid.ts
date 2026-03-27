import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminMarkInvoicePaidResponseDto } from "../types/invoices.dto";
import type { MarkInvoicePaidRequest } from "../types/invoice.types";

export async function markInvoicePaid(
  invoiceId: string,
  payload: MarkInvoicePaidRequest = {}
) {
  return apiClient.post<
    AdminMarkInvoicePaidResponseDto,
    MarkInvoicePaidRequest
  >(apiEndpoints.admin.billing.invoices.markPaid(invoiceId), payload);
}
