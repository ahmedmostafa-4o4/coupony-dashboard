import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { PaymentStatusBadge } from "./payment-status-badge";

import type { Payment } from "../types/payment.types";

const columns: AdminColumn<Payment>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "invoiceId",
    header: "Invoice ID",
    accessorKey: "invoiceId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <PaymentStatusBadge value={item.status} />,
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

export function PaymentsTable({
  items,
  renderActions,
}: {
  items: Payment[];
  renderActions?: (item: Payment) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any payments yet."
      emptyTitle="No payments found"
    />
  );
}
