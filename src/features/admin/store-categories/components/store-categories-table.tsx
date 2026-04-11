import type { ReactNode } from "react";

import {
  AdminDataTable,
  AdminImagePreview,
  type AdminColumn,
  formatAdminDate,
} from "@/features/admin/shared";
import { StoreCategoryStatusBadge } from "./store-category-status-badge";

import type { StoreCategory } from "../types/store-category.types";

const columns: AdminColumn<StoreCategory>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "icon",
    header: "Icon",
    cell: (item) => (
      <AdminImagePreview
        alt={`${item.name} icon`}
        className="h-12 w-12"
        fallbackLabel="No icon"
        src={item.iconUrl}
      />
    ),
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => (
      <StoreCategoryStatusBadge value={item.isActive ? "active" : "inactive"} />
    ),
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function StoreCategoriesTable({
  items,
  renderActions,
}: {
  items: StoreCategory[];
  renderActions?: (item: StoreCategory) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any store categories yet."
      emptyTitle="No store categories found"
    />
  );
}
