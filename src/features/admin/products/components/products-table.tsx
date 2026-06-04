import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";

import { ProductApprovalStatusBadge } from "./product-approval-status-badge";
import { ProductStatusBadge } from "./product-status-badge";

import type { Product } from "../types/product.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

export function ProductsTable({
  items,
  dict,
  statusDict,
  approvalDict,
  renderActions,
}: {
  items: Product[];
  dict: ProductsDictionary["productsTable"];
  statusDict?: Record<string, string>;
  approvalDict?: Record<string, string>;
  renderActions?: (item: Product) => ReactNode;
}) {
  const columns: AdminColumn<Product>[] = [
    {
      id: "title",
      header: dict.product,
      cell: (item) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">
            {item.title ?? dict.untitledProduct}
          </p>
          <p className="truncate text-xs text-slate-500">
            {item.slug ?? item.id ?? dict.noIdentifier}
          </p>
        </div>
      ),
    },
    {
      id: "store",
      header: dict.store,
      cell: (item) => item.storeName ?? item.storeId ?? dict.unknownStore,
    },
    {
      id: "status",
      header: dict.status,
      cell: (item) => <ProductStatusBadge value={item.status} dict={statusDict} />,
    },
    {
      id: "approvalStatus",
      header: dict.approval,
      cell: (item) => (
        <ProductApprovalStatusBadge
          value={item.approvalStatusLabel ?? item.approvalStatus}
          dict={approvalDict}
        />
      ),
    },
    {
      id: "featured",
      header: dict.featured,
      cell: (item) => item.featuredLabel ?? dict.featuredVal.standard,
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.emptyDesc}
      emptyTitle={dict.emptyTitle}
    />
  );
}

