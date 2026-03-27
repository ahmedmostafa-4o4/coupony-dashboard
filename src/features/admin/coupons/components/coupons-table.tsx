import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { CouponStatusBadge } from "./coupon-status-badge";

import type { Coupon } from "../types/coupon.types";

const columns: AdminColumn<Coupon>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "code",
    header: "Code",
    accessorKey: "code",
  },
  {
    id: "offerId",
    header: "Offer ID",
    accessorKey: "offerId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <CouponStatusBadge value={item.status} />,
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function CouponsTable({
  items,
  renderActions,
}: {
  items: Coupon[];
  renderActions?: (item: Coupon) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any coupons yet."
      emptyTitle="No coupons found"
    />
  );
}
