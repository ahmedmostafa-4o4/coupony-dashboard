import { AdminFilterBar } from "@/features/admin/shared";

import type { ProductsListFilters } from "../types/product.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

export function ProductsFilters({
  onChange,
  onReset,
  values,
  dict,
  statusDict,
}: {
  onChange: (nextValues: ProductsListFilters) => void;
  onReset: () => void;
  values: ProductsListFilters;
  dict: ProductsDictionary["filters"];
  statusDict?: Record<string, string>;
}) {
  const fields = [
    {
      key: "search",
      label: dict.search,
      placeholder: dict.searchPlaceholder,
      type: "search" as const,
    },
    {
      key: "status",
      label: dict.status,
      type: "select" as const,
      options: [
        { label: dict.statusPlaceholder, value: "all" },
        { label: statusDict?.active || "active", value: "active" },
        { label: statusDict?.inactive || "inactive", value: "inactive" },
        { label: statusDict?.draft || "draft", value: "draft" },
        { label: statusDict?.archived || "archived", value: "archived" },
      ],
    },
    {
      key: "approvalStatus",
      label: dict.approvalStatus,
      type: "select" as const,
      options: [
        { label: dict.approvalStatusPlaceholder, value: "all" },
        { label: statusDict?.pending || "pending", value: "pending" },
        { label: statusDict?.approved || "approved", value: "approved" },
        { label: statusDict?.rejected || "rejected", value: "rejected" },
      ],
    },
    {
      key: "storeId",
      label: dict.storeId,
      placeholder: dict.storeIdPlaceholder,
      type: "text" as const,
    },
  ];

  return (
    <AdminFilterBar
      fields={fields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}

