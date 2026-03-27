import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { SubscriptionPlanStatusBadge } from "./subscription-plan-status-badge";

import type { SubscriptionPlan } from "../types/subscription-plan.types";

const columns: AdminColumn<SubscriptionPlan>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "name",
    header: "Plan",
    accessorKey: "name",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => (
      <SubscriptionPlanStatusBadge
        value={item.isActive ? "active" : "inactive"}
      />
    ),
  },
  {
    id: "price",
    header: "Price",
    cell: (item) => formatAdminCurrency(
      typeof item.price === "number" ? item.price : Number(item.price),
    ),
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function SubscriptionPlansTable({
  items,
  renderActions,
}: {
  items: SubscriptionPlan[];
  renderActions?: (item: SubscriptionPlan) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any subscription plans yet."
      emptyTitle="No subscription plans found"
    />
  );
}
