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
    accessorKey: "ownerName",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <StoreStatusBadge value={item.status} />,
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
