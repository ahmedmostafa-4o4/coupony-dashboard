import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { CommissionStatusBadge } from "./commission-status-badge";

import type { Commission } from "../types/commission.types";

const columns: AdminColumn<Commission>[] = [
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
    id: "status",
    header: "Status",
    cell: (item) => <CommissionStatusBadge value={item.status} />,
  },
  {
    id: "amount",
    header: "Amount",
    cell: (item) => formatAdminCurrency(
      typeof item.amount === "number" ? item.amount : Number(item.amount),
    ),
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function CommissionsTable({
  items,
  renderActions,
}: {
  items: Commission[];
  renderActions?: (item: Commission) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any commissions yet."
      emptyTitle="No commissions found"
    />
  );
}
