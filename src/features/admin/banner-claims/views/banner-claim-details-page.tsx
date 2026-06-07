"use client";

import { useRouter } from "next/navigation";
import { AdminPageHeader, AdminSection, AdminStatusBadge, formatAdminDate, createAdminHref, useAdminResource } from "@/features/admin/shared";
import { PageLoading } from "@/components/shared/page-loading";
import { getBannerClaimsDictionary } from "../utils/get-dictionary";
import { getBannerClaimDetails } from "../api/get-banner-claim-details";
import { useBannerClaimActions } from "../hooks/use-banner-claim-actions";
import { CancelBannerClaimDialog } from "../components/cancel-claim-dialog";
import type { BannerClaim } from "../types/banner-claim.types";

export function BannerClaimDetailsPage({
  lang,
  id,
}: {
  lang: string;
  id: string;
}) {
  const dict = getBannerClaimsDictionary(lang);
  const router = useRouter();

  const details = useAdminResource<BannerClaim>({
    id,
    getItem: getBannerClaimDetails,
  });

  const actions = useBannerClaimActions(() => {
    void details.reload();
  });

  if (details.isLoading) {
    return <PageLoading label="Loading details..." />;
  }

  if (details.error || !details.item) {
    return (
      <div className="rounded-lg bg-rose-50 p-4 text-sm text-rose-600">
        {details.error || "Claim not found"}
      </div>
    );
  }

  const claim = details.item;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.details.title}
        description={dict.details.description}
        actions={
          claim.status === 'active' ? (
            <CancelBannerClaimDialog
              title={dict.actions.cancel.title}
              description={dict.actions.cancel.description}
              confirmLabel={dict.details.cancelBtn}
              isPending={actions.cancelAction.isSubmitting}
              onConfirm={async (reason) => {
                await actions.cancelAction.submit({ id: String(claim.id), reason });
              }}
              triggerLabel={dict.details.cancelBtn}
              reasonLabel={dict.actions.cancel.fields.reason.label}
              reasonPlaceholder={dict.actions.cancel.fields.reason.placeholder}
              variant="danger"
            />
          ) : undefined
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side: Summary */}
        <div className="space-y-6 lg:col-span-1">
          <AdminSection title={dict.details.eyebrow}>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">{dict.list.columns.status}</dt>
                  <dd>
                    <AdminStatusBadge value={claim.status} />
                  </dd>
                </div>
                {claim.cancellationReason && (
                  <div className="flex flex-col gap-1 pt-2 border-t border-slate-200">
                    <dt className="text-slate-500">{dict.details.cancellationReason}</dt>
                    <dd className="font-medium text-rose-600 bg-rose-50 p-2 rounded-md">{claim.cancellationReason}</dd>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <dt className="text-slate-500">{dict.details.claimToken}</dt>
                  <dd className="font-mono text-slate-900">{claim.claimToken}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{dict.details.qrToken}</dt>
                  <dd className="font-mono text-slate-900">{claim.qrCodeToken}</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <dt className="text-slate-500">{dict.details.createdAt}</dt>
                  <dd className="font-medium text-slate-900">{claim.createdAt ? formatAdminDate(claim.createdAt) : "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{dict.details.expiresAt}</dt>
                  <dd className="font-medium text-slate-900">{claim.expiresAt ? formatAdminDate(claim.expiresAt) : "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{dict.details.redeemedAt}</dt>
                  <dd className="font-medium text-slate-900">{claim.redeemedAt ? formatAdminDate(claim.redeemedAt) : "N/A"}</dd>
                </div>
              </dl>
            </div>
          </AdminSection>
        </div>

        {/* Right Side: Related Entities */}
        <div className="space-y-6 lg:col-span-2">
          <AdminSection title={dict.details.userProfile}>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-medium text-slate-900">{claim.user?.name || "Unknown User"}</p>
              <p className="text-sm text-slate-500">{claim.user?.email || "No email provided"}</p>
              <p className="text-xs text-slate-400 mt-2 font-mono">ID: {claim.userId}</p>
            </div>
          </AdminSection>

          <AdminSection title={dict.details.storeInfo}>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-medium text-slate-900">{claim.store?.name || "Unknown Store"}</p>
              <p className="text-xs text-slate-400 mt-2 font-mono">ID: {claim.storeId}</p>
            </div>
          </AdminSection>

          <AdminSection title={dict.details.bannerInfo}>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-medium text-slate-900 truncate" title={claim.banner?.title}>
                {claim.banner?.title || "Unknown Banner"}
              </p>
              <p className="text-xs text-slate-400 mt-2 font-mono">ID: {claim.bannerId}</p>
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
