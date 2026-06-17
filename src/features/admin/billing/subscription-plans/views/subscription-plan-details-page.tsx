"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { SubscriptionPlanForm } from "../components/subscription-plan-form";
import { SubscriptionPlanStatusBadge } from "../components/subscription-plan-status-badge";
import { useSubscriptionPlanActions } from "../hooks/use-subscription-plan-actions";
import { useSubscriptionPlanDetails } from "../hooks/use-subscription-plan-details";

import type { GlobalDictionary } from "@/messages/get-dictionary";

export function SubscriptionPlanDetailsPage({
  planId,
  lang,
  dict,
}: {
  planId: string;
  lang: string;
  dict: GlobalDictionary;
}) {
  const detailState = useSubscriptionPlanDetails(planId);
  void lang;
  const actions = useSubscriptionPlanActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label={dict.adminSubscriptionPlans.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.adminSubscriptionPlans.details.notFound}>
        <p className="text-sm text-slate-500">
          {dict.adminSubscriptionPlans.details.failed}
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <SubscriptionPlanStatusBadge
              value={detailState.item.isActive ? "active" : "inactive"}
            />
            
            <AdminConfirmDialog
              confirmLabel={dict.adminSubscriptionPlans.list.delete}
              description={dict.adminSubscriptionPlans.details.description}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(planId);
              }}
              title={dict.adminSubscriptionPlans.list.delete}
              triggerLabel={dict.adminSubscriptionPlans.list.delete}
              variant="danger"
            />
          </div>
        }
        description={dict.adminSubscriptionPlans.details.description}
        eyebrow={dict.adminSubscriptionPlans.details.eyebrow}
        title={getAdminEntityTitle(detailState.item, planId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.adminSubscriptionPlans.details.failed}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <SubscriptionPlanForm
        dict={dict}
        description={dict.adminSubscriptionPlans.form.editDesc}
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            planId,
            payload,
          });
        }}
        submitLabel={dict.adminSubscriptionPlans.form.save}
        title={dict.adminSubscriptionPlans.form.editTitle}
      />
      </div>
  );
}

