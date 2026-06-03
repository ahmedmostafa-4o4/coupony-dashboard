import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";

import { ProductApprovalStatusBadge } from "./product-approval-status-badge";
import { ProductStatusBadge } from "./product-status-badge";

import type { Product } from "../types/product.types";

const columns: AdminColumn<Product>[] = [
  {
    id: "title",
    header: "Product",
    cell: (item) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">
          {item.title ?? "Untitled product"}
        </p>
        <p className="truncate text-xs text-slate-500">
          {item.sku ?? item.slug ?? item.id ?? "No identifier"}
        </p>
      </div>
    ),
  },
  {
    id: "store",
    header: "Store",
    cell: (item) => item.storeName ?? item.storeId ?? "Unknown store",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <ProductStatusBadge value={item.status} />,
  },
  {
    id: "approvalStatus",
    header: "Approval",
    cell: (item) => (
      <ProductApprovalStatusBadge
        value={item.approvalStatusLabel ?? item.approvalStatus}
      />
    ),
  },
  {
    id: "sku",
    header: "SKU",
    cell: (item) => item.sku ?? "—",
  },
  {
    id: "featured",
    header: "Featured",
    cell: (item) => item.featuredLabel ?? "Standard",
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt ?? item.createdAt),
  },
];

export function ProductsTable({
  items,
  renderActions,
}: {
  items: Product[];
  renderActions?: (item: Product) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any products yet."
      emptyTitle="No products found"
    />
  );
}
