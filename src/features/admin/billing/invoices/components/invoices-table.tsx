import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { InvoiceStatusBadge } from "./invoice-status-badge";

import type { Invoice } from "../types/invoice.types";

const columns: AdminColumn<Invoice>[] = [
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
    cell: (item) => <InvoiceStatusBadge value={item.status} />,
  },
  {
    id: "subscriptionId",
    header: "Subscription ID",
    accessorKey: "subscriptionId",
  },
  {
    id: "dueAt",
    header: "Due",
    cell: (item) => formatAdminDate(item.dueAt),
  },
];

export function InvoicesTable({
  items,
  renderActions,
}: {
  items: Invoice[];
  renderActions?: (item: Invoice) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any invoices yet."
      emptyTitle="No invoices found"
    />
  );
}
