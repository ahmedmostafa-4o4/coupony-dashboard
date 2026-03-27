import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { StoreStatusBadge } from "./store-status-badge";

import type { Store } from "../types/store.types";

const columns: AdminColumn<Store>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "name",
    header: "Store",
    accessorKey: "name",
  },
  {
    id: "ownerName",
    header: "Owner",
    cell: (item) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">
          {item.ownerName ?? "Unknown owner"}
        </p>
        <p className="truncate text-xs text-slate-500">
          {item.owner?.email ?? item.email ?? "No email"}
        </p>
      </div>
    ),
  },
  {
    id: "categories",
    header: "Categories",
    cell: (item) =>
      item.categoryNames?.length ? item.categoryNames.join(", ") : "Unassigned",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <StoreStatusBadge value={item.status} />,
  },
  {
    id: "rating",
    header: "Rating",
    cell: (item) => item.ratingLabel ?? "No ratings",
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function StoresTable({
  items,
  renderActions,
}: {
  items: Store[];
  renderActions?: (item: Store) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any stores yet."
      emptyTitle="No stores found"
    />
  );
}
