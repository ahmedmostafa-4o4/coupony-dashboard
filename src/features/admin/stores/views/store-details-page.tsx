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

const approveFields: AdminFormField<StoreApproveActionValues>[] = [
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Optional approval note.",
    type: "textarea",
  },
];

const rejectFields: AdminFormField<StoreRejectActionValues>[] = [
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

const suspendFields: AdminFormField<StoreSuspendActionValues>[] = [
  {
    key: "reason",
    label: "Suspend reason",
    placeholder: "Explain why this store is being suspended.",
    type: "textarea",
  },
];

const closeFields: AdminFormField<StoreCloseActionValues>[] = [
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
  const detailState = useStoreDetails(storeId);
  
  const actions = useStoreActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading store details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Store not found">
        <p className="text-sm text-slate-500">
          The backend did not return a store for this route.
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
              fields={approveFields}
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
              fields={rejectFields}
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
              fields={suspendFields}
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
              fields={closeFields}
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
        description="Inspect merchant details, moderation history, and operational actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, storeId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="owner">Owner</TabsTrigger>
            <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="billing">Billing Profile</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <StoreForm
            description="Update merchant moderation, billing, and contact fields."
            initialValues={detailState.item}
            isSubmitting={actions.updateAction.isSubmitting}
            onSubmit={async (payload) => {
              await actions.updateAction.submit({
                storeId,
                payload,
              });
            }}
            submitLabel="Update store"
            title="Update store profile"
          />
        </TabsContent>

        <TabsContent value="owner" className="mt-6">
          <StoreOwnerCard owner={detailState.item.owner} />
        </TabsContent>

        <TabsContent value="points" className="mt-6">
          <StorePointsCard points={detailState.item.points} />
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <StoreAddressesTab storeId={detailState.item.id as string} />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <StoreCategoriesTab
            storeId={detailState.item.id as string}
            categories={detailState.item.categories}
            onReload={async () => { await detailState.reload(); }}
          />
        </TabsContent>

        <TabsContent value="verifications" className="mt-6">
          <StoreVerificationsTab storeId={detailState.item.id as string} />
        </TabsContent>

        <TabsContent value="hours" className="mt-6">
          <StoreHoursTab hours={detailState.item.hours} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <StoreReviewsTable storeId={storeId} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <StoreBillingInfo storeId={storeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
