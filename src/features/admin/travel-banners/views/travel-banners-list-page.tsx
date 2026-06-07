"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  AdminEmptyState,
  AdminPageHeader,
  AdminPagination,
  AdminConfirmDialog,
  createAdminDetailHref,
} from "@/features/admin/shared";
import { getTravelBannersDictionary } from "../utils/get-dictionary";
import { useTravelBanners } from "../hooks/use-travel-banners";
import { useTravelBannerActions } from "../hooks/use-travel-banner-actions";
import { TravelBannersFilters as TravelBannersFiltersComp } from "../components/travel-banners-filters";
import { TravelBannersTable } from "../components/travel-banners-table";
import type { TravelBannersFilters } from "../types/travel-banner.types";
import { Button } from "@/components/ui/button";

const defaultFilters: TravelBannersFilters = {
  status: "all",
  search: "",
  page: 1,
  perPage: 20,
};

export function TravelBannersListPage({ lang }: { lang: string }) {
  const dict = getTravelBannersDictionary(lang);
  const [filters, setFilters] = useState<TravelBannersFilters>(defaultFilters);

  const listState = useTravelBanners(filters);
  const actions = useTravelBannerActions(async () => {
    await listState.reload();
  });

  const handleFilterChange = (newFilters: TravelBannersFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.list.title}
        description={dict.list.description}
        actions={
          <Button>
            <Link
              href={createAdminDetailHref(
                lang,
                "travelBanners" as any,
                "create",
              )}
            >
              {dict.list.create}
            </Link>
          </Button>
        }
      />

      <TravelBannersFiltersComp
        dict={dict as any}
        filters={filters}
        onChange={handleFilterChange}
      />

      {listState.error ? (
        <div className="rounded-lg bg-rose-50 p-4 text-sm text-rose-600">
          {dict.list.errorState}
        </div>
      ) : listState.items.length === 0 && listState.isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : listState.items.length === 0 ? (
        <AdminEmptyState
          title={dict.list.emptyState}
          description={dict.list.emptyStateDesc}
        />
      ) : (
        <div className="relative space-y-4">
          <div
            className={
              listState.isLoading
                ? "pointer-events-none opacity-50 transition-opacity"
                : "transition-opacity"
            }
          >
            <TravelBannersTable
              dict={dict as any}
              items={listState.items}
              renderActions={(item) => (
                <div className="flex flex-wrap justify-end gap-2">
                  <Link
                    className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    href={createAdminDetailHref(
                      lang,
                      "travelBanners" as any,
                      String(item.id ?? ""),
                    )}
                  >
                    {dict.table.actions.view}
                  </Link>
                  <AdminConfirmDialog
                    confirmLabel={dict.details.delete}
                    description="Are you sure you want to delete this travel banner? This action cannot be undone."
                    isPending={actions.deleteAction.isSubmitting}
                    onConfirm={async () => {
                      await actions.deleteAction.submit(String(item.id));
                    }}
                    title={dict.details.delete}
                    triggerLabel={dict.table.actions.delete}
                    variant="danger"
                  />
                </div>
              )}
            />

            <AdminPagination
              currentPage={(filters.page as number) || 1}
              onPageChange={(p) => setFilters({ ...filters, page: p })}
              onPerPageChange={(p) =>
                setFilters({ ...filters, perPage: p, page: 1 })
              }
              perPage={(filters.perPage as number) || 20}
              lastPage={
                ((listState.meta as Record<string, unknown>)
                  ?.last_page as any) ||
                Math.ceil(
                  listState.total / ((filters.perPage as number) || 20),
                ) ||
                1
              }
            />
          </div>

          {listState.isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
