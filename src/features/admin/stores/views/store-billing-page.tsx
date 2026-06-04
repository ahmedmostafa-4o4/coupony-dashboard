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

import { getStoresDictionary } from "../utils/get-dictionary";

export function StoreBillingPage({
  lang,
  storeId,
}: {
  lang: string;
  storeId: string;
}) {
  const dict = getStoresDictionary(lang);
  const detailState = useStoreDetails(storeId);
  const actions = useStoreActions(async () => {
    await detailState.reload();
  });

  void lang;

  if (detailState.isLoading) {
    return <PageLoading label={dict.details.loading} />;
  }

  return (
    <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <AdminPageHeader
        description={dict.details.billing.desc}
        eyebrow={dict.details.eyebrow}
        title={dict.details.billing.manage}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <StoreBillingProfileForm
        description={dict.details.billing.desc}
        initialValues={detailState.item}
        isSubmitting={actions.updateBillingProfileAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updateBillingProfileAction.submit({
            payload,
            storeId,
          });
        }}
        submitLabel={dict.details.billing.updateBtn}
        title={dict.details.billing.title}
      />
      <AdminSection
        description="Raw JSON data."
        title="Store details"
      >
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
    </div>
  );
}
