"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection } from "@/features/admin/shared";
import { CouponForm } from "../components/coupon-form";
import { CouponStatusBadge } from "../components/coupon-status-badge";
import { useCouponActions } from "../hooks/use-coupon-actions";
import { useCouponDetails } from "../hooks/use-coupon-details";

export function CouponDetailsPage({
  couponId,
  lang,
}: {
  couponId: string;
  lang: string;
}) {
  const detailState = useCouponDetails(couponId);
  void lang;
  const actions = useCouponActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading coupon details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Coupon not found">
        <p className="text-sm text-slate-500">
          The backend did not return a coupon for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <CouponStatusBadge value={detailState.item.status} />
            
            
          </div>
        }
        description="Fallback coupon details view until the backend exposes a dedicated coupon endpoint."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, couponId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <CouponForm
        description="Update coupon lifecycle fields using the coupon update DTO."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            couponId,
            payload,
          });
        }}
        submitLabel="Update coupon"
        title="Update coupon"
      />
      <AdminSection description="Structured fields returned for this record." title="Coupon details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
