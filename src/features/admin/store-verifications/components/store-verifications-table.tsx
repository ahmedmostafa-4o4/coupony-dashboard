import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { StoreVerificationStatusBadge } from "./store-verification-status-badge";
import type { StoreVerification } from "../types/store-verification.types";
import type { StoreVerificationsDictionary } from "../utils/get-dictionary";

export function StoreVerificationsTable({
  items,
  dict,
  renderActions,
}: {
  items: StoreVerification[];
  dict: StoreVerificationsDictionary;
  renderActions?: (item: StoreVerification) => ReactNode;
}) {
  const columns: AdminColumn<StoreVerification>[] = [
    {
      id: "store",
      header: dict.list.columns.store,
      cell: (item) => (
        <div>
          <p className="font-medium">{item.store?.name || "Unknown Store"}</p>
          <p className="text-xs text-slate-500 font-mono">{item.storeId}</p>
        </div>
      ),
    },
    {
      id: "documentType",
      header: dict.list.columns.documentType,
      accessorKey: "documentType",
      cell: (item) => <span className="capitalize">{item.documentType?.replace(/_/g, ' ') || "N/A"}</span>
    },
    {
      id: "status",
      header: dict.list.columns.status,
      cell: (item) => <StoreVerificationStatusBadge value={item.status} dict={dict} />,
    },
    {
      id: "submittedAt",
      header: dict.list.columns.submittedAt,
      cell: (item) => formatAdminDate(item.createdAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.list.hint}
      emptyTitle={dict.list.emptyState}
    />
  );
}
