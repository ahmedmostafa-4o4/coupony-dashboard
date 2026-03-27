import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminIssueInvoiceResponseDto } from "../types/invoices.dto";
import type { IssueInvoiceRequest } from "../types/invoice.types";

export async function issueInvoice(
  invoiceId: string,
  payload: IssueInvoiceRequest = {}
) {
  return apiClient.post<AdminIssueInvoiceResponseDto, IssueInvoiceRequest>(
    apiEndpoints.admin.billing.invoices.issue(invoiceId),
    payload
  );
}
