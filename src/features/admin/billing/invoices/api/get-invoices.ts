import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapInvoice } from "../utils/invoice.mappers";
import type { AdminInvoicesListResponseDto } from "../types/invoices.dto";
import type { InvoicesListFilters } from "../types/invoice.types";

export async function getInvoices(filters: InvoicesListFilters = {}) {
  const response = await apiClient.get<AdminInvoicesListResponseDto>(
    apiEndpoints.admin.billing.invoices.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response, mapInvoice);
}
