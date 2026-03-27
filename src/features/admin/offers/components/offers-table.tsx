import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { OfferStatusBadge } from "./offer-status-badge";

import type { Offer } from "../types/offer.types";

const columns: AdminColumn<Offer>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
  },
  {
    id: "storeId",
    header: "Store ID",
    accessorKey: "storeId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <OfferStatusBadge value={item.status} />,
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function OffersTable({
  items,
  renderActions,
}: {
  items: Offer[];
  renderActions?: (item: Offer) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any offers yet."
      emptyTitle="No offers found"
    />
  );
}
