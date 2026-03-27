"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  AdminRecordGrid,
  AdminSection,
} from "@/features/admin/shared";

import { StoreBillingProfileForm } from "../components/store-billing-profile-form";
import { useStoreActions } from "../hooks/use-store-actions";
import { useStoreDetails } from "../hooks/use-store-details";

export function StoreBillingPage({
  lang,
  storeId,
}: {
  lang: string;
  storeId: string;
}) {
  const detailState = useStoreDetails(storeId);
  const actions = useStoreActions(async () => {
    await detailState.reload();
  });

  void lang;

  if (detailState.isLoading) {
    return <PageLoading label="Loading store billing profile..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Update the billing profile payload currently attached to this store."
        eyebrow="Billing"
        title={`Store Billing ${storeId}`}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <StoreBillingProfileForm
        description="Update the typed store billing profile DTO for this merchant."
        initialValues={detailState.item}
        isSubmitting={actions.updateBillingProfileAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updateBillingProfileAction.submit({
            payload,
            storeId,
          });
        }}
        submitLabel="Update billing profile"
        title="Billing profile payload"
      />
      <AdminSection
        description="Current store payload returned by the details endpoint."
        title="Store details"
      >
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
    </div>
  );
}
