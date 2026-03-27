import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminVoidInvoiceResponseDto } from "../types/invoices.dto";
import type { VoidInvoiceRequest } from "../types/invoice.types";

export async function voidInvoice(
  invoiceId: string,
  payload: VoidInvoiceRequest = {}
) {
  return apiClient.post<AdminVoidInvoiceResponseDto, VoidInvoiceRequest>(
    apiEndpoints.admin.billing.invoices.void(invoiceId),
    payload
  );
}
