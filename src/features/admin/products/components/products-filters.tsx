"use client";

import { AdminFilterBar } from "@/features/admin/shared";

import type { ProductsListFilters } from "../types/product.types";

const fields = [
  {
    key: "search",
    label: "Search",
    placeholder: "Search products by title or SKU",
    type: "search" as const,
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "All statuses", value: "all" },
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" },
      { label: "draft", value: "draft" },
      { label: "archived", value: "archived" },
    ],
  },
  {
    key: "approvalStatus",
    label: "Approval Status",
    type: "select" as const,
    options: [
      { label: "All approval states", value: "all" },
      { label: "pending", value: "pending" },
      { label: "approved", value: "approved" },
      { label: "rejected", value: "rejected" },
    ],
  },
  {
    key: "storeId",
    label: "Store ID",
    placeholder: "Filter by store ID",
    type: "text" as const,
  },
];

export function ProductsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: ProductsListFilters) => void;
  onReset: () => void;
  values: ProductsListFilters;
}) {
  return (
    <AdminFilterBar
      fields={fields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
