import type { ReactNode } from "react";

import {
  AdminDataTable,
  AdminImagePreview,
  type AdminColumn,
  formatAdminDate,
} from "@/features/admin/shared";
import { StoreCategoryStatusBadge } from "./store-category-status-badge";

import type { StoreCategory } from "../types/store-category.types";

import type { StoreCategoriesDictionary } from "../utils/get-dictionary";

export function StoreCategoriesTable({
  items,
  dict,
  statusDict,
  renderActions,
}: {
  items: StoreCategory[];
  dict: StoreCategoriesDictionary["table"];
  statusDict?: StoreCategoriesDictionary["status"];
  renderActions?: (item: StoreCategory) => ReactNode;
}) {
  const columns: AdminColumn<StoreCategory>[] = [
    { id: "id", header: dict.id, accessorKey: "id" },
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
    { id: "nameEn", header: dict.nameEn, accessorKey: "nameEn" },
    { id: "nameAr", header: dict.nameAr, accessorKey: "nameAr" },
    { id: "slug", header: dict.slug, accessorKey: "slug" },
    {
      id: "status",
      header: dict.status,
      cell: (item) => (
        <StoreCategoryStatusBadge
          value={item.isActive ? "active" : "inactive"}
          dict={statusDict}
        />
      ),
    },
    { id: "sortOrder", header: dict.sortOrder, accessorKey: "sortOrder" },
    {
      id: "createdAt",
      header: dict.created,
      cell: (item) => formatAdminDate(item.createdAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.emptyDesc}
      emptyTitle={dict.emptyTitle}
    />
  );
}
