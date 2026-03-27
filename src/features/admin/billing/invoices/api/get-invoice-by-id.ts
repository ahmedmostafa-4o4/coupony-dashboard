import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapInvoiceDetails } from "../utils/invoice.mappers";
import type { AdminInvoiceDetailsResponseDto } from "../types/invoices.dto";

export async function getInvoiceById(invoiceId: string) {
  const response = await apiClient.get<AdminInvoiceDetailsResponseDto>(
    apiEndpoints.admin.billing.invoices.detail(invoiceId)
  );

  return mapItemResponse(response, mapInvoiceDetails);
}
