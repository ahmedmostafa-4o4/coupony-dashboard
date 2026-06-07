"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminConfirmDialog,
  AdminPageHeader,
  AdminSection,
  formatAdminDate,
  type AdminFormField,
} from "@/features/admin/shared";
import { BannerStatusBadge } from "../components/banner-status-badge";
import { BannerUpdateForm } from "../components/banner-update-form";
import { useBannerActions } from "../hooks/use-banner-actions";
import { bannerRejectAdminSchema } from "../schemas/banner-action.schema";
import { useBannerDetails } from "../hooks/use-banner-details";
import { getBannersDictionary } from "../utils/get-dictionary";
import { Store, Tag, MapPin } from "lucide-react";

export function BannerDetailsPage({
  bannerId,
  lang,
}: {
  bannerId: string;
  lang: string;
}) {
  const dict = getBannersDictionary(lang);
  const detailState = useBannerDetails(bannerId);
  const actions = useBannerActions(async () => {
    await detailState.reload();
  });

  const rejectFields: AdminFormField<any>[] = [
    {
      key: "rejectionReason",
      label: dict.actions.reject.fields.rejectionReason.label,
      placeholder: dict.actions.reject.fields.rejectionReason.placeholder,
      type: "textarea",
    },
  ];

  if (detailState.isLoading) {
    return <PageLoading label="Loading banner details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.details.notFound}>
        <p className="text-sm text-slate-500">{dict.details.notFoundDesc}</p>
      </AdminSection>
    );
  }

  const { item } = detailState;
  const isPending = item.status === "pending";

  const isUpdatingAction =
    actions.approveAction.isSubmitting ||
    actions.rejectAction.isSubmitting ||
    actions.updateAction.isSubmitting;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <BannerStatusBadge value={item.status} dict={dict} />
            {isPending && (
              <>
                <AdminConfirmDialog
                  confirmLabel={dict.actions.approve.title}
                  description={dict.actions.approve.description}
                  isPending={isUpdatingAction}
                  onConfirm={async () => {
                    await actions.approveAction.submit(bannerId);
                  }}
                  title={dict.actions.approve.title}
                  triggerLabel={dict.details.approveBtn}
                  variant="primary"
                />
                <AdminActionDialog
                  confirmLabel={dict.details.rejectBtn}
                  description={dict.actions.reject.description}
                  fields={rejectFields}
                  isPending={isUpdatingAction}
                  onSubmit={(payload) =>
                    actions.rejectAction.submit({
                      id: bannerId,
                      payload: payload as { reason: string },
                    })
                  }
                  schema={bannerRejectAdminSchema}
                  title={dict.actions.reject.title}
                  triggerLabel={dict.details.rejectBtn}
                  variant="danger"
                />
              </>
            )}
          </div>
        }
        description={dict.details.description}
        eyebrow={dict.details.eyebrow}
        title={item.discountLabel || item.ctaLabel || "Banner"}
      />

      {detailState.error ? (
        <AdminSection title="Error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Pane: Image Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sticky top-6">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-semibold text-slate-900">{dict.details.bannerPreview}</h3>
          </div>
          <div className="p-4 bg-slate-100 min-h-[400px] flex items-center justify-center relative">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt="Banner Preview"
                className="max-w-full max-h-[600px] object-contain rounded-md shadow-sm border border-slate-200 bg-white"
              />
            ) : (
              <p className="text-slate-500 italic">No image URL provided</p>
            )}
          </div>
        </div>

        {/* Right Pane: Context & Actions */}
        <div className="space-y-6">
          {/* Quick Update */}
          <AdminSection title={dict.details.quickUpdate}>
            <BannerUpdateForm
              banner={item}
              dict={dict}
              isPending={actions.updateAction.isSubmitting}
              onUpdate={async (payload) => {
                await actions.updateAction.submit({ id: bannerId, payload });
              }}
            />
          </AdminSection>

          {/* Banner Details */}
          <AdminSection title={dict.details.bannerDetails}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.discountLabel}</p>
                <p className="text-sm font-medium text-slate-900">{item.discountLabel || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.ctaLabel}</p>
                <p className="text-sm font-medium text-slate-900">{item.ctaLabel || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.dateRange}</p>
                <p className="text-sm text-slate-900">{item.dateRange || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.endTime}</p>
                <p className="text-sm text-slate-900">{item.endTime ? formatAdminDate(item.endTime) : "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.termsOfUse}</p>
                <p className="text-sm text-slate-900">{item.termsOfUse || "N/A"}</p>
              </div>
              {item.rejectionReason && (
                <div className="col-span-2 mt-2 p-4 rounded-xl bg-rose-50 border border-rose-100">
                  <p className="text-sm font-medium text-rose-800 mb-1">{dict.details.rejectionReason}</p>
                  <p className="text-sm text-rose-700 whitespace-pre-wrap">{item.rejectionReason}</p>
                </div>
              )}
            </div>
          </AdminSection>

          {/* Store Context */}
          {item.store && (
            <AdminSection title={dict.details.storeContext}>
              <div className="flex items-center gap-4">
                {item.store.logoUrl ? (
                  <img
                    src={item.store.logoUrl}
                    alt="Store Logo"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                    <Store className="w-6 h-6 text-slate-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-slate-900">{item.store.name}</p>
                  <p className="text-xs font-mono text-slate-500">{item.storeId}</p>
                </div>
              </div>
            </AdminSection>
          )}

          {/* Relationships */}
          <AdminSection title={dict.details.relationships}>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">{dict.details.offers} ({(item.offers || []).length})</p>
                <div className="flex flex-wrap gap-2">
                  {(item.offers || []).length > 0 ? (
                    item.offers!.map((offer) => (
                      <div key={offer.id || Math.random()} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {offer.title || "Offer"}
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">None</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2">{dict.details.branches} ({(item.branches || []).length})</p>
                <div className="flex flex-wrap gap-2">
                  {(item.branches || []).length > 0 ? (
                    item.branches!.map((branch) => (
                      <div key={branch.id || Math.random()} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                        <MapPin className="w-3 h-3" />
                        {branch.name || "Branch"}
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">None</span>
                  )}
                </div>
              </div>
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
