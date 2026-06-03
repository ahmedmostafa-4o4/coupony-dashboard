import type { ReactNode } from "react";

import {
  AdminDataTable,
  type AdminColumn,
  formatAdminDate,
} from "@/features/admin/shared";

import { ProductRevisionStatusBadge } from "./product-revision-status-badge";

import type { ProductRevision } from "../types/product-revision.types";

const columns: AdminColumn<ProductRevision>[] = [
  {
    id: "revisionId",
    header: "Revision ID",
    accessorKey: "revisionId",
  },
  {
    id: "productTitle",
    header: "Product",
    cell: (item) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">
          {item.productTitle ?? item.productId ?? "—"}
        </p>
        <p className="truncate text-xs text-slate-500">
          {item.storeName ?? "Unknown store"}
        </p>
      </div>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: (item) => item.actionLabel ?? "—",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => (
      <ProductRevisionStatusBadge value={item.statusLabel ?? item.status} />
    ),
  },
  {
    id: "submittedAt",
    header: "Submitted",
    cell: (item) =>
      item.submittedAtLabel ?? formatAdminDate(item.submittedAt ?? item.createdAt),
  },
  {
    id: "submittedBy",
    header: "Submitted By",
    cell: (item) => item.submittedBy ?? "—",
  },
];

export function ProductRevisionsTable({
  items,
  renderActions,
}: {
  items: ProductRevision[];
  renderActions?: (item: ProductRevision) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.revisionId || item.id || JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="There are no pending product revisions returned by the admin endpoint right now."
      emptyTitle="No pending product revisions"
    />
  );
}
