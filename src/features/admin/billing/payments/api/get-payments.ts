import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminPaymentsListResponseDto } from "../types/payments.dto";
import type { PaymentsListFilters } from "../types/payment.types";

export async function getPayments(filters: PaymentsListFilters = {}) {
  const response = await apiClient.get<AdminPaymentsListResponseDto>(
    apiEndpoints.admin.billing.payments.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
