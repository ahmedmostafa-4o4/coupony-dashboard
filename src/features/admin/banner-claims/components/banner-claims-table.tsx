"use client";

import { AdminDataTable, createAdminDetailHref, AdminStatusBadge, formatAdminDate } from "@/features/admin/shared";
import { useBannerClaims } from "../hooks/use-banner-claims";
import type { BannerClaim, BannerClaimsFilters } from "../types/banner-claim.types";
import type { BannerClaimsDictionary } from "../utils/get-dictionary";
import { getBannerClaims } from "../api/get-banner-claims";
import { useBannerClaimActions } from "../hooks/use-banner-claim-actions";
import { CancelBannerClaimDialog } from "./cancel-claim-dialog";

export function BannerClaimsTable({
  lang,
  dict,
  filters,
}: {
  lang: string;
  dict: BannerClaimsDictionary;
  filters?: BannerClaimsFilters;
}) {
  const { items, isLoading, reload } = useBannerClaims(filters);

  const actions = useBannerClaimActions(() => {
    void reload();
  });

  return (
    <>
      <AdminDataTable
        data={items}
        rowKey={(item) => String(item.id)}
        columns={[
          {
            id: "id",
            header: dict.list.columns.id,
            cell: (item) => (
              <div className="flex flex-col">
                <span className="font-mono text-xs text-slate-500" title={item.id}>
                  ...{item.id.slice(-6)}
                </span>
                {item.claimToken && (
                  <span className="font-medium text-slate-900 mt-1">
                    Token: {item.claimToken}
                  </span>
                )}
              </div>
            ),
          },
          {
            id: "user",
            header: dict.list.columns.user,
            cell: (item) => (
              <div>
                <p className="font-medium text-slate-900 truncate max-w-[150px]">
                  {item.user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">
                  {item.user?.email}
                </p>
              </div>
            ),
          },
          {
            id: "store",
            header: dict.list.columns.store,
            cell: (item) => (
              <div>
                <p className="font-medium text-slate-900 truncate max-w-[150px]">
                  {item.store?.name || "Unknown Store"}
                </p>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">
                  Banner: {item.banner?.title || "Unknown Banner"}
                </p>
              </div>
            ),
          },
          {
            id: "status",
            header: dict.list.columns.status,
            cell: (item) => <AdminStatusBadge value={item.status} />,
          },
          {
            id: "dates",
            header: dict.list.columns.dates,
            cell: (item) => (
              <div className="text-xs text-slate-500 whitespace-nowrap">
                Created: {item.createdAt ? formatAdminDate(item.createdAt) : "N/A"}
                <br />
                Expires: {item.expiresAt ? formatAdminDate(item.expiresAt) : "N/A"}
              </div>
            ),
          },
        ]}
        renderRowActions={(item) => (
          <div className="flex items-center justify-end gap-2">
            <a
              href={createAdminDetailHref(lang, "bannerClaims", String(item.id))}
              className="text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              {dict.details.title}
            </a>
            {item.status === "active" ? (
              <CancelBannerClaimDialog
                key={`cancel-${item.id}`}
                title={dict.actions.cancel.title}
                description={dict.actions.cancel.description}
                confirmLabel={dict.details.cancelBtn}
                isPending={actions.cancelAction.isSubmitting}
                onConfirm={async (reason) => {
                  await actions.cancelAction.submit({ id: String(item.id), reason });
                }}
                triggerLabel={dict.details.cancelBtn}
                reasonLabel={dict.actions.cancel.fields.reason.label}
                reasonPlaceholder={dict.actions.cancel.fields.reason.placeholder}
                variant="ghost"
              />
            ) : null}
          </div>
        )}
        emptyTitle={dict.list.emptyState}
        emptyDescription={dict.list.emptyStateDesc}
      />
    </>
  );
}
