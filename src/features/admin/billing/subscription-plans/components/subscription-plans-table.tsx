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
    id: "priceMonthly",
    header: "Monthly Price",
    cell: (item) => formatAdminCurrency(
      typeof item.prices?.monthly === "number" ? item.prices.monthly : Number(item.prices?.monthly),
    ),
  },
  {
    id: "priceYearly",
    header: "Yearly Price",
    cell: (item) => formatAdminCurrency(
      typeof item.prices?.yearly === "number" ? item.prices.yearly : Number(item.prices?.yearly),
    ),
  },
  {
    id: "maxProducts",
    header: "Max Products",
    cell: (item) => item.entitlements?.maxProducts ?? "Unlimited",
  },
  {
    id: "maxBranches",
    header: "Max Branches",
    cell: (item) => item.entitlements?.maxBranches ?? "Unlimited",
  },
  {
    id: "maxEmployees",
    header: "Max Employees",
    cell: (item) => item.entitlements?.maxEmployees ?? "Unlimited",
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
