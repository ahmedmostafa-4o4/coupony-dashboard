import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminSellerLeadsListResponseDto } from "../types/seller-tickets.dto";
import type { SellerTicketsListFilters } from "../types/seller-ticket.types";

export async function getSellerTickets(filters: SellerTicketsListFilters = {}) {
  const response = await apiClient.get<AdminSellerLeadsListResponseDto>(
    apiEndpoints.admin.contact.seller.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
