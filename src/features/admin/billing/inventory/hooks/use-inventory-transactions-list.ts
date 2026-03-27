"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getInventoryTransactions } from "../api/get-inventory-transactions";
import type { InventoryTransaction, InventoryTransactionsListFilters } from "../types/inventory-transaction.types";

export function useInventoryTransactionsList(filters: InventoryTransactionsListFilters) {
  return useAdminCollection<InventoryTransaction, InventoryTransactionsListFilters>({
    filters,
    getItems: getInventoryTransactions,
  });
}
