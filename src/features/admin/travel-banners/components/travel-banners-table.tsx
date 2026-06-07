"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { AdminDataTable, type AdminColumn, AdminStatusBadge, formatAdminDate } from "@/features/admin/shared";
import type { TravelBanner } from "../types/travel-banner.types";
import type { TravelBannersDictionary } from "../utils/get-dictionary";

export function TravelBannersTable({
  items,
  renderActions,
  dict,
}: {
  items: TravelBanner[];
  renderActions?: (item: TravelBanner) => ReactNode;
  dict: TravelBannersDictionary;
}) {
  const columns: AdminColumn<TravelBanner>[] = [
    {
      id: "banner",
      header: dict.table.columns.banner,
      cell: (item) => (
        <div className="flex items-center gap-3">
          {item.imageUrl ? (
            <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
              <Image
                src={item.imageUrl.startsWith('http') ? item.imageUrl : `https://api.coupony.shop/storage/${item.imageUrl}`}
                alt={item.ctaText}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-20 rounded-md bg-slate-100 flex items-center justify-center text-xs text-slate-400">
              No Image
            </div>
          )}
          <div>
            <p className="font-medium text-slate-900">{item.ctaText}</p>
            <p className="text-xs text-slate-500">{item.savePercent}</p>
          </div>
        </div>
      ),
    },
    {
      id: "product",
      header: dict.table.columns.product,
      cell: (item) => (
        <div>
          {item.product ? (
            <>
              <p className="font-medium text-slate-900 max-w-[200px] truncate" title={item.product.title}>
                {item.product.title}
              </p>
              <p className="text-xs text-slate-500">SKU: {item.product.sku}</p>
            </>
          ) : (
            <span className="text-slate-400">Unknown Product</span>
          )}
        </div>
      ),
    },
    {
      id: "status",
      header: dict.table.columns.status,
      cell: (item) => (
        <AdminStatusBadge
          value={item.isActive ? "active" : "inactive"}
        />
      ),
    },
    {
      id: "dates",
      header: dict.table.columns.dates,
      cell: (item) => (
        <div className="text-xs text-slate-500 whitespace-nowrap">
          {item.startDate ? formatAdminDate(item.startDate) : "N/A"}
          <br />
          to
          <br />
          {item.endDate ? formatAdminDate(item.endDate) : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => item.id}
      renderRowActions={renderActions}
      emptyTitle={dict.list.emptyState}
      emptyDescription={dict.list.emptyStateDesc}
    />
  );
}
