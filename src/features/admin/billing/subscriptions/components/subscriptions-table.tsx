import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { SubscriptionStatusBadge } from "./subscription-status-badge";

import type { Subscription } from "../types/subscription.types";
import type { GlobalDictionary } from "@/messages/get-dictionary";

export function SubscriptionsTable({
  items,
  renderActions,
  dict,
}: {
  items: Subscription[];
  renderActions?: (item: Subscription) => ReactNode;
  dict: GlobalDictionary;
}) {
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
      header: dict.adminSubscriptions.details.status || "Status",
      cell: (item) => <SubscriptionStatusBadge value={item.status} />,
    },
    {
      id: "updatedAt",
      header: dict.adminSubscriptions.details.updatedAt || "Updated",
      cell: (item) => formatAdminDate(item.updatedAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.adminSubscriptions.list.emptyDesc}
      emptyTitle={dict.adminSubscriptions.list.noSubscriptions}
    />
  );
}
