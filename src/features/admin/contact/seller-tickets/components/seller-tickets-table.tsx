import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { SellerTicketStatusBadge } from "./seller-ticket-status-badge";

import type { SellerTicket } from "../types/seller-ticket.types";

const columns: AdminColumn<SellerTicket>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "storeName",
    header: "Store",
    accessorKey: "storeName",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <SellerTicketStatusBadge value={item.status} />,
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

export function SellerTicketsTable({
  items,
  renderActions,
}: {
  items: SellerTicket[];
  renderActions?: (item: SellerTicket) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any seller tickets yet."
      emptyTitle="No seller tickets found"
    />
  );
}
