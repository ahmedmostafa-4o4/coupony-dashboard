import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { RedemptionStatusBadge } from "./redemption-status-badge";

import type { Redemption } from "../types/redemption.types";

const columns: AdminColumn<Redemption>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "couponId",
    header: "Coupon ID",
    accessorKey: "couponId",
  },
  {
    id: "userId",
    header: "User ID",
    accessorKey: "userId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <RedemptionStatusBadge value={item.status} />,
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function RedemptionsTable({
  items,
  renderActions,
}: {
  items: Redemption[];
  renderActions?: (item: Redemption) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any redemptions yet."
      emptyTitle="No redemptions found"
    />
  );
}
