import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminCustomerTicketsListResponseDto } from "../types/customer-tickets.dto";
import type { CustomerTicketsListFilters } from "../types/customer-ticket.types";

export async function getCustomerTickets(filters: CustomerTicketsListFilters = {}) {
  const response = await apiClient.get<AdminCustomerTicketsListResponseDto>(
    apiEndpoints.admin.contact.customer.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
