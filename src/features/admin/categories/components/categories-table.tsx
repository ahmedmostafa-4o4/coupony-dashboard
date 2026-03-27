import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { CategoryStatusBadge } from "./category-status-badge";

import type { Category } from "../types/category.types";

const columns: AdminColumn<Category>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
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
      <CategoryStatusBadge value={item.isActive ? "active" : "inactive"} />
    ),
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function CategoriesTable({
  items,
  renderActions,
}: {
  items: Category[];
  renderActions?: (item: Category) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any categories yet."
      emptyTitle="No categories found"
    />
  );
}
