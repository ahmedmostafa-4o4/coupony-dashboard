"use client";
import Link from "next/link";
import { PageLoading } from "@/components/shared/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdminActionDialog,
  AdminPageHeader,
  getAdminEntityTitle, AdminRecordGrid,
  AdminSection,
  createAdminDetailHref,
  type AdminFormField,
} from "@/features/admin/shared";
import { StoreForm } from "../components/store-form";
import { StoreStatusBadge } from "../components/store-status-badge";
import { useStoreActions } from "../hooks/use-store-actions";
import {
  storeApproveActionSchema,
  storeCloseActionSchema,
  storeRejectActionSchema,
  storeSuspendActionSchema,
  type StoreApproveActionValues,
  type StoreCloseActionValues,
  type StoreRejectActionValues,
  type StoreSuspendActionValues,
} from "../schemas/store-action.schema";
import { useStoreDetails } from "../hooks/use-store-details";
import { StoreReviewsTable } from "../components/store-reviews-table";
import { StoreBillingInfo } from "../components/store-billing-info";
import { StoreAddressesTab } from "../components/store-addresses-tab";
import { StoreCategoriesTab } from "../components/store-categories-tab";
import { StoreVerificationsTab } from "../components/store-verifications-tab";
import { StoreHoursTab } from "../components/store-hours-tab";
import { StoreOwnerCard } from "../components/store-owner-card";
import { StorePointsCard } from "../components/store-points-card";

import { getStoresDictionary } from "../utils/get-dictionary";

const approveFields = (dict: any): AdminFormField<StoreApproveActionValues>[] => [
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Optional approval note.",
    type: "textarea",
  },
];

const rejectFields = (dict: any): AdminFormField<StoreRejectActionValues>[] => [
  {
    key: "rejectionReason",
    label: "Rejection reason",
    placeholder: "Why was this store rejected?",
    type: "textarea",
  },
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Optional internal note.",
    type: "textarea",
  },
];

const suspendFields = (dict: any): AdminFormField<StoreSuspendActionValues>[] => [
  {
    key: "reason",
    label: "Suspend reason",
    placeholder: "Explain why this store is being suspended.",
    type: "textarea",
  },
];

const closeFields = (dict: any): AdminFormField<StoreCloseActionValues>[] => [
  {
    key: "reason",
    label: "Close reason",
    placeholder: "Optional reason for closing the store.",
    type: "textarea",
  },
];

export function StoreDetailsPage({
  storeId,
  lang,
}: {
  storeId: string;
  lang: string;
}) {
  const dict = getStoresDictionary(lang);
  const detailState = useStoreDetails(storeId);
  
  const actions = useStoreActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label={dict.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.details.notFound}>
        <p className="text-sm text-slate-500">
          {dict.details.notFoundDesc}
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StoreStatusBadge value={detailState.item.status} />
            <AdminActionDialog
              confirmLabel="Approve"
              description="Optionally record moderator notes when approving this store."
              fields={approveFields(dict)}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeApproveActionSchema}
              title="Approve Store"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Provide the rejection reason required by the moderation endpoint."
              fields={rejectFields(dict)}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeRejectActionSchema}
              title="Reject Store"
              triggerLabel="Reject"
              variant="danger"
            />
            <AdminActionDialog
              confirmLabel="Suspend"
              description="Provide the suspend reason required by the store moderation contract."
              fields={suspendFields(dict)}
              isPending={actions.suspendAction.isSubmitting}
              onSubmit={(payload) =>
                actions.suspendAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeSuspendActionSchema}
              title="Suspend Store"
              triggerLabel="Suspend"
              variant="danger"
            />
            <AdminActionDialog
              confirmLabel="Close"
              description="Optionally record why this store is being closed."
              fields={closeFields(dict)}
              isPending={actions.closeAction.isSubmitting}
              onSubmit={(payload) =>
                actions.closeAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeCloseActionSchema}
              title="Close Store"
              triggerLabel="Close"
              variant="danger"
            />
          </div>
        }
        description={dict.list.description}
        eyebrow={dict.details.eyebrow}
        title={getAdminEntityTitle(detailState.item, storeId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <Tabs defaultValue="overview" className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500">
            <TabsTrigger value="overview">{dict.details.tabs.overview}</TabsTrigger>
            <TabsTrigger value="owner">{dict.details.owner.title || "Owner"}</TabsTrigger>
            <TabsTrigger value="points">{dict.details.points.title || "Points"}</TabsTrigger>
            <TabsTrigger value="addresses">{dict.details.tabs.addresses}</TabsTrigger>
            <TabsTrigger value="categories">{dict.details.tabs.categories}</TabsTrigger>
            <TabsTrigger value="verifications">{dict.details.tabs.verifications}</TabsTrigger>
            <TabsTrigger value="hours">{dict.details.tabs.hours}</TabsTrigger>
            <TabsTrigger value="reviews">{dict.details.reviews.title || "Reviews"}</TabsTrigger>
            <TabsTrigger value="billing">{dict.details.billing.title || "Billing Profile"}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <StoreForm
            description={dict.form.updateDesc}
            initialValues={detailState.item}
            isSubmitting={actions.updateAction.isSubmitting}
            onSubmit={async (payload) => {
              await actions.updateAction.submit({
                storeId,
                payload,
              });
            }}
            submitLabel={dict.form.save}
            title={dict.form.updateTitle}
            dict={dict.form}
          />
        </TabsContent>

        <TabsContent value="owner" className="mt-6">
          <StoreOwnerCard owner={detailState.item.owner} dict={dict.details.owner} />
        </TabsContent>

        <TabsContent value="points" className="mt-6">
          <StorePointsCard points={detailState.item.points} dict={dict.details.points} />
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <StoreAddressesTab storeId={detailState.item.id as string} dict={dict.details.addresses} />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <StoreCategoriesTab
            storeId={detailState.item.id as string}
            categories={detailState.item.categories}
            onReload={async () => { await detailState.reload(); }}
            dict={dict.details.categories}
          />
        </TabsContent>

        <TabsContent value="verifications" className="mt-6">
          <StoreVerificationsTab storeId={detailState.item.id as string} dict={dict.details.verifications} />
        </TabsContent>

        <TabsContent value="hours" className="mt-6">
          <StoreHoursTab hours={detailState.item.hours} dict={dict.details.hours} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <StoreReviewsTable storeId={storeId} dict={dict.details.reviews} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <StoreBillingInfo storeId={storeId} dict={dict.details.billing} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
