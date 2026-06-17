import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { PaymentStatusBadge } from "./payment-status-badge";
import type { GlobalDictionary } from "@/messages/get-dictionary";

import type { Payment } from "../types/payment.types";

export function PaymentsTable({
  items,
  renderActions,
  dict,
}: {
  items: Payment[];
  renderActions?: (item: Payment) => ReactNode;
  dict: GlobalDictionary;
}) {
  const columns: AdminColumn<Payment>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "invoiceId",
      header: dict.adminPayments.details.invoiceId,
      accessorKey: "invoiceId",
    },
    {
      id: "status",
      header: dict.adminPayments.details.status,
      cell: (item) => <PaymentStatusBadge value={item.status} />,
    },
    {
      id: "amount",
      header: dict.adminPayments.details.amount,
      cell: (item) => formatAdminCurrency(
        typeof item.amount === "number" ? item.amount : Number(item.amount),
      ),
    },
    {
      id: "createdAt",
      header: dict.adminPayments.details.createdAt,
      cell: (item) => formatAdminDate(item.createdAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.adminPayments.list.emptyDesc}
      emptyTitle={dict.adminPayments.list.noPayments}
    />
  );
}
