import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { SubscriptionStatusBadge } from "./subscription-status-badge";

import type { Subscription } from "../types/subscription.types";

const columns: AdminColumn<Subscription>[] = [
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
    id: "planId",
    header: "Plan ID",
    accessorKey: "planId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <SubscriptionStatusBadge value={item.status} />,
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function SubscriptionsTable({
  items,
  renderActions,
}: {
  items: Subscription[];
  renderActions?: (item: Subscription) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any subscriptions yet."
      emptyTitle="No subscriptions found"
    />
  );
}
