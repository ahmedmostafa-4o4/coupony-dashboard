"use client";
import Link from "next/link";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminPageHeader,
  getAdminEntityTitle, AdminRecordGrid,
  AdminSection,
  createAdminDetailHref,
  type AdminFormField,
} from "@/features/admin/shared";
import { RedemptionStatusBadge } from "../components/redemption-status-badge";
import { useRedemptionActions } from "../hooks/use-redemption-actions";
import {
  redemptionFraudBlockActionSchema,
  type RedemptionFraudBlockActionValues,
} from "../schemas/redemption-action.schema";
import { useRedemptionDetails } from "../hooks/use-redemption-details";

const fraudBlockFields: AdminFormField<RedemptionFraudBlockActionValues>[] = [
  {
    key: "fraudReason",
    label: "Fraud reason",
    placeholder: "Explain the fraud signal or rule match.",
    type: "textarea",
  },
];

export function RedemptionDetailsPage({
  redemptionId,
  lang,
}: {
  redemptionId: string;
  lang: string;
}) {
  const detailState = useRedemptionDetails(redemptionId);
  
  const actions = useRedemptionActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading redemption details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Redemption not found">
        <p className="text-sm text-slate-500">
          The backend did not return a redemption for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <RedemptionStatusBadge value={detailState.item.status} />
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "redemptions", redemptionId, "timeline")}
            >
              Redemption timeline
            </Link>
            <AdminActionDialog
              confirmLabel="Fraud block"
              description="Provide the fraud reason required by the fraud-block endpoint."
              fields={fraudBlockFields}
              isPending={actions.fraudBlockAction.isSubmitting}
              onSubmit={(payload) =>
                actions.fraudBlockAction.submit({
                  payload,
                  redemptionId,
                })
              }
              schema={redemptionFraudBlockActionSchema}
              title="Fraud block Redemption"
              triggerLabel="Fraud block"
              variant="danger"
            />
          </div>
        }
        description="Inspect redemption payloads and timeline activity."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, redemptionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Redemption details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
