"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLoading } from "@/components/shared/page-loading";
import { Loader2 } from "lucide-react";
import { AdminEmptyState, AdminPageHeader, AdminPagination, AdminConfirmDialog, AdminActionDialog, createAdminDetailHref } from "@/features/admin/shared";
import { getBannersDictionary } from "../utils/get-dictionary";
import { useBannersList } from "../hooks/use-banners-list";
import { useBannerActions } from "../hooks/use-banner-actions";
import { BannersFilters } from "../components/banners-filters";
import { BannersTable } from "../components/banners-table";
import { bannerRejectAdminSchema } from "../schemas/banner-action.schema";
import type { BannersListFilters } from "../types/banner.types";

const defaultFilters: BannersListFilters = {
  status: "all" as any,
  search: "",
  storeId: "",
  isActive: undefined,
  page: 1,
  perPage: 20,
};

export function BannersListPage({ lang }: { lang: string }) {
  const dict = getBannersDictionary(lang);

  const [filters, setFilters] = useState<BannersListFilters>(defaultFilters);

  const listState = useBannersList(filters);
  const actions = useBannerActions(async () => {
    await listState.reload();
  });

  const handleFilterChange = (newFilters: BannersListFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };



  const isLoadingAction =
    actions.approveAction.isSubmitting ||
    actions.rejectAction.isSubmitting ||
    actions.deleteAction.isSubmitting;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.title}
        description={dict.description}
      />

      <BannersFilters
        dict={dict}
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
            <BannersTable
              dict={dict}
              items={listState.items}
              renderActions={(item) => (
                <div className="flex flex-wrap justify-end gap-2">
                  <Link
                    className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    href={createAdminDetailHref(
                      lang,
                      "banners",
                      String(item.id ?? ""),
                    )}
                  >
                    {dict.details.viewBtn}
                  </Link>
                  {item.status === "pending" && (
                    <>
                      <AdminConfirmDialog
                        confirmLabel={dict.actions.approve.title}
                        description={dict.actions.approve.description}
                        isPending={isLoadingAction}
                        onConfirm={async () => {
                          await actions.approveAction.submit(String(item.id ?? ""));
                        }}
                        title={dict.actions.approve.title}
                        triggerLabel={dict.details.approveBtn}
                        variant="primary"
                      />
                      <AdminActionDialog
                        confirmLabel={dict.details.rejectBtn}
                        description={dict.actions.reject.description}
                        fields={[
                          {
                            key: "rejectionReason",
                            label: dict.actions.reject.fields.rejectionReason.label,
                            placeholder: dict.actions.reject.fields.rejectionReason.placeholder,
                            type: "textarea",
                          },
                        ]}
                        isPending={isLoadingAction}
                        onSubmit={async (payload) => {
                          await actions.rejectAction.submit({
                            id: String(item.id ?? ""),
                            payload: payload as { reason: string },
                          });
                        }}
                        schema={bannerRejectAdminSchema}
                        title={dict.actions.reject.title}
                        triggerLabel={dict.details.rejectBtn}
                        variant="danger"
                      />
                    </>
                  )}
                </div>
              )}
            />

            <AdminPagination
              currentPage={filters.page || 1}
              onPageChange={(p) => setFilters({ ...filters, page: p })}
              onPerPageChange={(p) => setFilters({ ...filters, perPage: p, page: 1 })}
              perPage={filters.perPage || 20}
              lastPage={
                ((listState.meta as Record<string, unknown>)?.last_page as number) ||
                Math.ceil(listState.total / (filters.perPage || 20)) ||
                1
              }
            />
          </div>

          {listState.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
