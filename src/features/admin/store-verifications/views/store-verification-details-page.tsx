"use client";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminConfirmDialog,
  AdminPageHeader,
  getAdminEntityTitle,
  AdminSection,
  type AdminFormField,
} from "@/features/admin/shared";
import { StoreVerificationStatusBadge } from "../components/store-verification-status-badge";
import { useStoreVerificationActions } from "../hooks/use-store-verification-actions";
import {
  storeVerificationRejectActionSchema,
  type StoreVerificationRejectActionValues,
} from "../schemas/store-verification-action.schema";
import { useStoreVerificationDetails } from "../hooks/use-store-verification-details";
import { getStoreVerificationsDictionary } from "../utils/get-dictionary";
import { formatAdminDate } from "@/features/admin/shared";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function StoreVerificationDetailsPage({
  verificationId,
  lang,
}: {
  verificationId: string;
  lang: string;
}) {
  const dict = getStoreVerificationsDictionary(lang);
  const detailState = useStoreVerificationDetails(verificationId);
  const actions = useStoreVerificationActions(async () => { await detailState.reload(); });

  const rejectFields: AdminFormField<StoreVerificationRejectActionValues>[] = [
    {
      key: "rejectionReason",
      label: dict.actions.reject.fields.rejectionReason.label,
      placeholder: dict.actions.reject.fields.rejectionReason.placeholder,
      type: "textarea",
    },
  ];

  if (detailState.isLoading) {
    return <PageLoading label="Loading store verification details..." />;
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

  const { item } = detailState;
  const isPending = item.status === "pending";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StoreVerificationStatusBadge value={item.status} dict={dict} />
            
            {isPending && (
              <>
                <AdminConfirmDialog
                  confirmLabel={dict.actions.approve.title}
                  description={dict.actions.approve.description}
                  isPending={actions.approveAction.isSubmitting}
                  onConfirm={async () => {
                    await actions.approveAction.submit(verificationId);
                  }}
                  title={dict.actions.approve.title}
                  triggerLabel={dict.details.approveBtn}
                  variant="primary"
                />
                <AdminActionDialog
                  confirmLabel={dict.details.rejectBtn}
                  description={dict.actions.reject.description}
                  fields={rejectFields}
                  isPending={actions.rejectAction.isSubmitting}
                  onSubmit={(payload) =>
                    actions.rejectAction.submit({
                      payload,
                      verificationId,
                    })
                  }
                  schema={storeVerificationRejectActionSchema}
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
        title={getAdminEntityTitle(item, verificationId)}
      />
      
      {detailState.error ? (
        <AdminSection title={dict.list.errorState}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Pane: Document Viewer */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sticky top-6">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-semibold text-slate-900">{dict.details.documentViewer}</h3>
            {item.documentUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={item.documentUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  {dict.details.downloadDocument}
                </a>
              </Button>
            )}
          </div>
          <div className="p-4 bg-slate-100 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {item.documentUrl ? (
              item.documentUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={item.documentUrl} 
                  className="w-full h-full min-h-[600px] rounded-md border border-slate-200 bg-white"
                  title="Document Viewer"
                />
              ) : (
                <img 
                  src={item.documentUrl} 
                  alt="Verification Document" 
                  className="max-w-full max-h-[800px] object-contain rounded-md shadow-sm border border-slate-200 bg-white"
                />
              )
            ) : (
              <p className="text-slate-500 italic">No document URL provided</p>
            )}
          </div>
        </div>

        {/* Right Pane: Context & Details */}
        <div className="space-y-6">
          <AdminSection title={dict.details.storeContext}>
            <div className="space-y-4">
              {item.store?.logoUrl && (
                <div className="mb-4">
                  <img 
                    src={item.store.logoUrl} 
                    alt="Store Logo" 
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-sm"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.storeName}</p>
                  <p className="font-medium text-slate-900">{item.store?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.storeId}</p>
                  <p className="font-mono text-xs text-slate-900 break-all">{item.storeId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.email || "Email"}</p>
                  <p className="text-sm text-slate-900">{item.store?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.phone || "Phone"}</p>
                  <p className="text-sm text-slate-900">{item.store?.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.tier || "Tier"}</p>
                  <p className="text-sm text-slate-900 capitalize">{item.store?.subscriptionTier || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.isVerified || "Verified"}</p>
                  <p className="text-sm text-slate-900">
                    {item.store?.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AdminSection>

          <AdminSection title={dict.details.status}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.documentType}</p>
                  <p className="font-medium text-slate-900 capitalize">{item.documentType?.replace(/_/g, ' ') || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.submittedAt}</p>
                  <p className="font-medium text-slate-900">{formatAdminDate(item.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{dict.details.status}</p>
                  <div><StoreVerificationStatusBadge value={item.status} dict={dict} /></div>
                </div>
              </div>
              
              {item.rejectionReason && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100">
                  <p className="text-sm font-medium text-rose-800 mb-1">{dict.details.rejectionReason}</p>
                  <p className="text-sm text-rose-700 whitespace-pre-wrap">{item.rejectionReason}</p>
                </div>
              )}
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}

