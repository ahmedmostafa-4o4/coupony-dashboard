"use client";

import {
  AdminDataTable,
  createAdminDetailHref,
  AdminStatusBadge,
  formatAdminDate,
} from "@/features/admin/shared";
import { useOfferClaims } from "../hooks/use-offer-claims";
import type {
  OfferClaim,
  OfferClaimsFilters,
} from "../types/offer-claim.types";
import type { OfferClaimsDictionary } from "../utils/get-dictionary";
import { getOfferClaims } from "../api/get-offer-claims";
import { useOfferClaimActions } from "../hooks/use-offer-claim-actions";
import { CancelOfferClaimDialog } from "./cancel-claim-dialog";
import { Button } from "@/components/ui/button";

export function OfferClaimsTable({
  lang,
  dict,
  filters,
}: {
  lang: string;
  dict: OfferClaimsDictionary;
  filters?: OfferClaimsFilters;
}) {
  const { items, isLoading, reload } = useOfferClaims(filters);

  const actions = useOfferClaimActions(() => {
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
                <span
                  className="font-mono text-xs text-slate-500"
                  title={item.id}
                >
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
                <p className="text-xs text-slate-500">
                  Offer: {item.offer?.label || "Unknown Offer"}
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
                Created:{" "}
                {item.createdAt ? formatAdminDate(item.createdAt) : "N/A"}
                <br />
                Expires:{" "}
                {item.expiresAt ? formatAdminDate(item.expiresAt) : "N/A"}
              </div>
            ),
          },
        ]}
        renderRowActions={(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button>
              <a
                href={createAdminDetailHref(
                  lang,
                  "offerClaims",
                  String(item.id),
                )}
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                {dict.details.title}
              </a>
            </Button>
            {item.status === "active" ? (
              <CancelOfferClaimDialog
                key={`cancel-${item.id}`}
                title={dict.actions.cancel.title}
                description={dict.actions.cancel.description}
                confirmLabel={dict.details.cancelBtn}
                isPending={actions.cancelAction.isSubmitting}
                onConfirm={async (reason) => {
                  await actions.cancelAction.submit({
                    id: String(item.id),
                    reason,
                  });
                }}
                triggerLabel={dict.details.cancelBtn}
                reasonLabel={dict.actions.cancel.fields.reason.label}
                reasonPlaceholder={
                  dict.actions.cancel.fields.reason.placeholder
                }
                variant="danger"
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
