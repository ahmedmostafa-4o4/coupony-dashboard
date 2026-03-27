import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { CustomerTicketStatusBadge } from "./customer-ticket-status-badge";

import type { CustomerTicket } from "../types/customer-ticket.types";

const columns: AdminColumn<CustomerTicket>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "subject",
    header: "Subject",
    accessorKey: "subject",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <CustomerTicketStatusBadge value={item.status} />,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function CustomerTicketsTable({
  items,
  renderActions,
}: {
  items: CustomerTicket[];
  renderActions?: (item: CustomerTicket) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any customer tickets yet."
      emptyTitle="No customer tickets found"
    />
  );
}
