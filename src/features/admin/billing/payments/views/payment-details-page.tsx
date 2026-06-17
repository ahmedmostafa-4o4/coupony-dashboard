"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  getAdminEntityTitle,
  AdminSection,
  formatAdminDate,
  formatAdminCurrency,
} from "@/features/admin/shared";
import { PaymentStatusBadge } from "../components/payment-status-badge";
import { usePaymentDetails } from "../hooks/use-payment-details";
import { useState } from "react";
import {
  ApprovePaymentDialog,
  FailPaymentDialog,
} from "../components/payment-action-dialogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import {
  CreditCard,
  Store,
  Box,
  Calendar,
  ExternalLink,
  Info,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

import type { GlobalDictionary } from "@/messages/get-dictionary";

export function PaymentDetailsPage({
  paymentId,
  lang,
  dict,
}: {
  paymentId: string;
  lang: string;
  dict: GlobalDictionary;
}) {
  const detailState = usePaymentDetails(paymentId);
  void lang;

  const [approveOpen, setApproveOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  if (detailState.isLoading) {
    return <PageLoading label={dict.adminPayments.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.adminPayments.details.notFound}>
        <p className="text-sm text-slate-500">
          The backend did not return a payment session for this route.
        </p>
      </AdminSection>
    );
  }

  const payment = detailState.item;
  const status = payment.status || "pending";
  const amount = Number(payment.amount) || 0;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <PaymentStatusBadge value={status} />
            {status === "pending" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setApproveOpen(true)}
                >
                  {dict.adminPayments.list.approve}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setFailOpen(true)}
                >
                  {dict.adminPayments.list.fail}
                </Button>
              </>
            )}
          </div>
        }
        description={dict.adminPayments.details.description}
        eyebrow={dict.adminPayments.details.eyebrow}
        title={dict.adminPayments.details.title}
      />

      {detailState.error ? (
        <AdminSection title={dict.adminPayments.details.failed}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <div className="grid gap-6 md:grid-cols-1">
        <div className="space-y-6">
          {/* Payment Amount Hero Card */}
          <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
            <div
              className={cn(
                "p-6 text-white",
                status === "paid"
                  ? "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600"
                  : status === "failed"
                    ? "bg-gradient-to-br from-rose-500 via-red-500 to-orange-500"
                    : "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-md">
                    Payment Session
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {formatAdminCurrency(amount, payment.currency || "EGP")}
                  </h3>
                </div>
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-md",
                    status === "paid"
                      ? "border-emerald-200 bg-emerald-400/20 text-emerald-50"
                      : status === "failed"
                        ? "border-rose-200 bg-rose-400/20 text-rose-50"
                        : "border-white/40 bg-white/20 text-white",
                  )}
                >
                  {status === "paid" && <CheckCircle2 className="h-4 w-4" />}
                  {status === "failed" && <XCircle className="h-4 w-4" />}
                  {status === "pending" && <Clock className="h-4 w-4" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-white/90">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                    Paymob Order ID
                  </p>
                  <p className="font-mono">{payment.paymobOrderId || "N/A"}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                    Transaction ID
                  </p>
                  <p className="font-mono">
                    {payment.paymobTransactionId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100 text-sm">
                <li className="flex justify-between p-4 bg-slate-50/50">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Info className="h-4 w-4" /> Session ID
                  </span>
                  <span className="font-medium text-slate-900 font-mono text-xs">
                    {payment.id}
                  </span>
                </li>

                {payment.failureReason && (
                  <li className="p-4 bg-rose-50">
                    <span className="text-rose-700 block mb-1 font-medium">
                      Failure Reason
                    </span>
                    <span className="text-rose-900">
                      {payment.failureReason}
                    </span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-indigo-500" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100 text-sm">
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">{dict.adminPayments.details.createdAt}</span>
                  <span className="font-medium text-slate-900">
                    {formatAdminDate(payment.createdAt) || "N/A"}
                  </span>
                </li>
                {payment.expiresAt && (
                  <li className="flex justify-between p-4 bg-amber-50/30">
                    <span className="text-amber-700">Expires At</span>
                    <span className="font-medium text-amber-900">
                      {formatAdminDate(payment.expiresAt)}
                    </span>
                  </li>
                )}
                {payment.paidAt && (
                  <li className="flex justify-between p-4 bg-emerald-50/50">
                    <span className="text-emerald-700 font-medium">
                      Paid At
                    </span>
                    <span className="font-medium text-emerald-900">
                      {formatAdminDate(payment.paidAt)}
                    </span>
                  </li>
                )}
                {payment.failedAt && (
                  <li className="flex justify-between p-4 bg-rose-50/50">
                    <span className="text-rose-700 font-medium">Failed At</span>
                    <span className="font-medium text-rose-900">
                      {formatAdminDate(payment.failedAt)}
                    </span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Associated Store Context */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Store className="h-5 w-5 text-indigo-500" />
                {dict.adminPayments.details.sectionContext}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {payment.store ? (
                <ul className="divide-y divide-slate-100 text-sm">
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.storeName}</span>
                    <span className="font-medium text-slate-900">
                      {payment.store.name}
                    </span>
                  </li>
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">Store Email</span>
                    <span className="font-medium text-slate-900">
                      {payment.store.email || "N/A"}
                    </span>
                  </li>
                  {payment.store.phone && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Store Phone</span>
                      <span className="font-medium text-slate-900">
                        {payment.store.phone}
                      </span>
                    </li>
                  )}
                  {payment.store.status && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Store Status</span>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 capitalize">
                        {payment.store.status}
                      </span>
                    </li>
                  )}
                  {payment.store.subscriptionTier && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Tier</span>
                      <span className="font-medium text-slate-900 capitalize">
                        {payment.store.subscriptionTier}
                      </span>
                    </li>
                  )}
                  {payment.store.isVerified && (
                    <li className="flex justify-between p-4 bg-emerald-50/50">
                      <span className="text-emerald-700">Verification</span>
                      <span className="font-medium text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    </li>
                  )}
                  {payment.store.taxId && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Tax ID</span>
                      <span className="font-medium text-slate-900 font-mono text-xs">
                        {payment.store.taxId}
                      </span>
                    </li>
                  )}
                  {payment.store.commissionRate && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Commission Rate</span>
                      <span className="font-medium text-slate-900">
                        {(Number(payment.store.commissionRate) * 100).toFixed(
                          2,
                        )}
                        %
                      </span>
                    </li>
                  )}

                  {payment.store.createdAt && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">{dict.adminPayments.details.createdAt}</span>
                      <span className="font-medium text-slate-900">
                        {formatAdminDate(payment.store.createdAt)}
                      </span>
                    </li>
                  )}
                  {payment.store.approvedAt && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">Approved At</span>
                      <span className="font-medium text-slate-900">
                        {formatAdminDate(payment.store.approvedAt)}
                      </span>
                    </li>
                  )}
                  {payment.store.rejectedAt && (
                    <li className="flex justify-between p-4 bg-rose-50/50">
                      <span className="text-rose-700">Rejected At</span>
                      <span className="font-medium text-rose-900">
                        {formatAdminDate(payment.store.rejectedAt)}
                      </span>
                    </li>
                  )}
                  {payment.store.adminNotes && (
                    <li className="p-4 bg-amber-50">
                      <span className="text-amber-700 block mb-1 font-medium">
                        Admin Notes
                      </span>
                      <span className="text-amber-900 text-xs">
                        {payment.store.adminNotes}
                      </span>
                    </li>
                  )}
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">Store ID</span>
                    <span className="font-medium text-slate-900 font-mono text-xs">
                      {payment.store.id}
                    </span>
                  </li>
                </ul>
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <Store className="mx-auto mb-2 h-8 w-8 opacity-20" />
                  <p>{dict.adminPayments.details.noStore}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Associated Plan Context */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Box className="h-5 w-5 text-indigo-500" />
                {dict.adminPayments.details.sectionPlan}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {payment.plan ? (
                <ul className="divide-y divide-slate-100 text-sm">
                  <li className="flex items-center justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.planName}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">
                        {payment.plan.name}
                      </span>
                      {!payment.plan.isActive && (
                        <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                          {dict.adminPayments.details.legacy}
                        </span>
                      )}
                    </div>
                  </li>
                  {payment.plan.description && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">{dict.adminPayments.details.planDesc}</span>
                      <span className="font-medium text-slate-900 text-right">
                        {payment.plan.description}
                      </span>
                    </li>
                  )}
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.billingCycle}</span>
                    <span className="font-medium text-slate-900 capitalize">
                      {payment.billingCycle || "Monthly"}
                    </span>
                  </li>
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.maxProducts}</span>
                    <span className="font-medium text-slate-900">
                      {payment.plan.entitlements?.maxProducts ?? "Unlimited"}
                    </span>
                  </li>
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.maxBranches}</span>
                    <span className="font-medium text-slate-900">
                      {payment.plan.entitlements?.maxBranches ?? "Unlimited"}
                    </span>
                  </li>
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.maxEmployees}</span>
                    <span className="font-medium text-slate-900">
                      {payment.plan.entitlements?.maxEmployees ?? "Unlimited"}
                    </span>
                  </li>
                  {payment.plan.createdAt && (
                    <li className="flex justify-between p-4">
                      <span className="text-slate-500">{dict.adminPayments.details.planCreated}</span>
                      <span className="font-medium text-slate-900">
                        {formatAdminDate(payment.plan.createdAt)}
                      </span>
                    </li>
                  )}
                  <li className="flex justify-between p-4">
                    <span className="text-slate-500">{dict.adminPayments.details.planId}</span>
                    <span className="font-medium text-slate-900 font-mono text-xs">
                      {payment.plan.id}
                    </span>
                  </li>
                </ul>
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <Box className="mx-auto mb-2 h-8 w-8 opacity-20" />
                  <p>{dict.adminPayments.details.noPlan}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ApprovePaymentDialog
        sessionId={paymentId}
        open={approveOpen}
        onOpenChange={setApproveOpen}
        onSuccess={detailState.reload}
        dict={dict}
      />

      <FailPaymentDialog
        sessionId={paymentId}
        open={failOpen}
        onOpenChange={setFailOpen}
        onSuccess={detailState.reload}
        dict={dict}
      />
    </div>
  );
}
