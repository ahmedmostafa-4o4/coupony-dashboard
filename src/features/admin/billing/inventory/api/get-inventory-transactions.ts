import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminInventoryTransactionsListResponseDto } from "../types/inventory.dto";
import type { InventoryTransactionsListFilters } from "../types/inventory-transaction.types";

export async function getInventoryTransactions(filters: InventoryTransactionsListFilters = {}) {
  const response = await apiClient.get<AdminInventoryTransactionsListResponseDto>(
    apiEndpoints.admin.billing.inventory.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
