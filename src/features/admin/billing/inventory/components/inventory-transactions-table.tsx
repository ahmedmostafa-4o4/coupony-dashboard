import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";

import type { InventoryTransaction } from "../types/inventory-transaction.types";

const columns: AdminColumn<InventoryTransaction>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "storeId",
    header: "Store ID",
    accessorKey: "storeId",
  },
  {
    id: "type",
    header: "Type",
    accessorKey: "type",
  },
  {
    id: "quantity",
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function InventoryTransactionsTable({
  items,
  renderActions,
}: {
  items: InventoryTransaction[];
  renderActions?: (item: InventoryTransaction) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any inventory transactions yet."
      emptyTitle="No inventory transactions found"
    />
  );
}
