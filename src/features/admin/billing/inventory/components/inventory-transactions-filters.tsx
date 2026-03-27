"use client";

import { AdminFilterBar, createSearchFilterField } from "@/features/admin/shared";

import type { InventoryTransactionsListFilters } from "../types/inventory-transaction.types";

const filterFields = [
  createSearchFilterField("Search", "Search inventory by store or transaction type"),

];

export function InventoryTransactionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: InventoryTransactionsListFilters) => void;
  onReset: () => void;
  values: InventoryTransactionsListFilters;
}) {
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
