"use client";

import { FileCheck, CheckCircle2, XCircle, Clock, Check, X, Loader2 } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useStoreVerificationsActions } from "../hooks/use-store-verifications-actions";
import { useStoreVerifications } from "../hooks/use-store-verifications";
import { StoreVerificationUploadDialog } from "./store-verification-upload-dialog";
import { StoreVerificationRejectDialog } from "./store-verification-reject-dialog";

export function StoreVerificationsTab({
  storeId,
}: {
  storeId: string;
}) {
  const { verifications, isLoading, reload } = useStoreVerifications(storeId);
  const actions = useStoreVerificationsActions(storeId, async () => {
    await reload();
  });

  const headerActions = (
    <div className="flex items-center justify-end">
      <StoreVerificationUploadDialog
        isPending={actions.isUploading}
        onUpload={actions.handleUpload}
      />
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!verifications?.length) {
    return (
      <div className="space-y-6">
        {headerActions}
        <AdminSection description="Verification documents and moderation statuses." title="Verifications">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <FileCheck className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">No documents found</h3>
            <p className="mt-1 text-sm text-slate-500">This store has not submitted any verification documents.</p>
          </div>
        </AdminSection>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {headerActions}
      <AdminSection description="Verification documents and moderation statuses." title="Verifications">
        <div className="grid gap-4 sm:grid-cols-2">
          {verifications.map((doc, i) => (
            <div
              key={doc.id || i}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                      {doc.documentType?.replace(/_/g, " ") || "Document"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Submitted: {doc.createdAt ? format(new Date(doc.createdAt), "MMM d, yyyy") : "Unknown"}
                    </p>
                  </div>
                </div>

                {doc.status === "approved" && (
                  <span className="flex items-center text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Approved
                  </span>
                )}
                {doc.status === "rejected" && (
                  <span className="flex items-center text-xs font-medium text-rose-600">
                    <XCircle className="mr-1 h-4 w-4" />
                    Rejected
                  </span>
                )}
                {doc.status === "pending" && (
                  <span className="flex items-center text-xs font-medium text-amber-600">
                    <Clock className="mr-1 h-4 w-4" />
                    Pending
                  </span>
                )}
              </div>

              {doc.rejectionReason && (
                <div className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                  <span className="font-semibold">Reason for rejection:</span> {doc.rejectionReason}
                </div>
              )}

              {doc.documentUrl && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    View Document Asset &rarr;
                  </a>
                </div>
              )}

              {doc.status === "pending" && (
                <div className="mt-4 flex items-center justify-end space-x-2 border-t border-slate-100 pt-4">
                  <StoreVerificationRejectDialog
                    isPending={actions.isRejecting === doc.id}
                    disabled={actions.isRejecting === doc.id || actions.isApproving === doc.id}
                    onReject={async (reason) => {
                      return await actions.handleReject(doc.id, reason);
                    }}
                  />
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={actions.isRejecting === doc.id || actions.isApproving === doc.id}
                    onClick={async () => {
                      await actions.handleApprove(doc.id);
                    }}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}
