import type { ReactNode } from "react";

import {
  AdminDataTable,
  type AdminColumn,
  formatAdminDate,
} from "@/features/admin/shared";

import { ProductRevisionStatusBadge } from "./product-revision-status-badge";

import type { ProductRevision } from "../types/product-revision.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

export function ProductRevisionsTable({
  items,
  dict,
  statusDict,
  renderActions,
}: {
  items: ProductRevision[];
  dict: ProductsDictionary["revisionsTable"];
  statusDict?: Record<string, string>;
  renderActions?: (item: ProductRevision) => ReactNode;
}) {
  const columns: AdminColumn<ProductRevision>[] = [
    {
      id: "revisionId",
      header: dict.revisionId,
      accessorKey: "revisionId",
    },
    {
      id: "productTitle",
      header: dict.product,
      cell: (item) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">
            {item.productTitle ?? item.productId ?? "—"}
          </p>
          <p className="truncate text-xs text-slate-500">
            {item.storeName ?? dict.unknownStore}
          </p>
        </div>
      ),
    },
    {
      id: "action",
      header: dict.action,
      cell: (item) => item.actionLabel ?? "—",
    },
    {
      id: "status",
      header: dict.status,
      cell: (item) => (
        <ProductRevisionStatusBadge
          value={item.statusLabel ?? item.status}
          dict={statusDict}
        />
      ),
    },
    {
      id: "submittedAt",
      header: dict.submitted,
      cell: (item) =>
        item.submittedAtLabel ?? formatAdminDate(item.submittedAt ?? item.createdAt),
    },
    {
      id: "submittedBy",
      header: dict.submittedBy,
      cell: (item) => item.submittedBy ?? "—",
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.revisionId || item.id || JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.emptyDesc}
      emptyTitle={dict.emptyTitle}
    />
  );
}

