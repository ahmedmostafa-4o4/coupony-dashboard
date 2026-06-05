"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { useState } from "react";
import { AdminPageHeader, getAdminEntityTitle, AdminSection, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { SubscriptionStatusBadge } from "../components/subscription-status-badge";
import { SuspendSubscriptionDialog, CancelSubscriptionDialog } from "../components/subscription-action-dialogs";
import { useSubscriptionDetails } from "../hooks/use-subscription-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Calendar, 
  Package, 
  Store, 
  Users, 
  CreditCard, 
  Zap,
  Info
} from "lucide-react";

export function SubscriptionDetailsPage({
  subscriptionId,
  lang,
}: {
  subscriptionId: string;
  lang: string;
}) {
  const detailState = useSubscriptionDetails(subscriptionId);
  void lang;
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (detailState.isLoading) {
    return <PageLoading label="Loading subscription details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Subscription not found">
        <p className="text-sm text-slate-500">
          The backend did not return a subscription for this route.
        </p>
      </AdminSection>
    );
  }

  const sub = detailState.item;
  const plan = sub.plan;
  const status = sub.status || "active";
  const billingCycle = sub.billingCycle || "monthly";

  // Calculate progress for the progress bar
  let progress = 0;
  let daysRemaining = 0;
  if (sub.currentPeriodStart && sub.currentPeriodEnd) {
    const start = new Date(sub.currentPeriodStart).getTime();
    const end = new Date(sub.currentPeriodEnd).getTime();
    const now = Date.now();
    const total = end - start;
    const elapsed = now - start;
    progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
    daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <SubscriptionStatusBadge value={sub.status} />
            {status !== "suspended" && status !== "cancelled" && (
              <Button variant="outline" size="sm" onClick={() => setSuspendOpen(true)}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Suspend
              </Button>
            )}
            {status !== "cancelled" && (
              <Button variant="danger" size="sm" onClick={() => setCancelOpen(true)}>
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        }
        description="Comprehensive overview of this store's subscription and entitlements."
        eyebrow="Admin details"
        title={getAdminEntityTitle(sub, subscriptionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Current Plan Card */}
          <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
            {plan ? (
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="mb-2 inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-md">
                      {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} Plan
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                  </div>
                  <div className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-md", 
                    status === 'active' ? "border-emerald-400 bg-emerald-400/20 text-emerald-50" : 
                    status === 'suspended' ? "border-rose-400 bg-rose-400/20 text-rose-50" : 
                    "border-white/40 bg-white/20 text-white"
                  )}>
                    {status === 'active' && <CheckCircle2 className="h-4 w-4" />}
                    {status === 'suspended' && <XCircle className="h-4 w-4" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                </div>
                
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tighter">
                    {formatAdminCurrency(
                      Number(billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly) || 0,
                      plan.currency
                    )}
                  </span>
                  <span className="text-white/80">/{billingCycle === "yearly" ? "yr" : "mo"}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-slate-50 p-8 text-center text-slate-500">
                <CreditCard className="mb-4 h-8 w-8 text-slate-400" />
                <p className="font-medium">No Plan Found</p>
                <p className="text-sm">The plan for this subscription could not be loaded.</p>
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">Current Period</span>
                <span className="text-slate-500">{daysRemaining} days remaining</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", 
                    progress > 90 ? "bg-rose-500" : progress > 75 ? "bg-amber-500" : "bg-indigo-500"
                  )}
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatAdminDate(sub.currentPeriodStart)}</span>
                <span>{formatAdminDate(sub.currentPeriodEnd)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-indigo-500" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100 text-sm">
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Subscription ID</span>
                  <span className="font-medium text-slate-900 font-mono text-xs">{sub.id}</span>
                </li>
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Store ID</span>
                  <span className="font-medium text-slate-900 font-mono text-xs">{sub.storeId || "N/A"}</span>
                </li>
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Created At</span>
                  <span className="font-medium text-slate-900">{formatAdminDate(sub.createdAt) || "N/A"}</span>
                </li>
                {sub.trialEndsAt && (
                  <li className="flex justify-between p-4 bg-sky-50/50">
                    <span className="text-sky-700">Trial Ends At</span>
                    <span className="font-medium text-sky-900">{formatAdminDate(sub.trialEndsAt)}</span>
                  </li>
                )}
                {sub.gracePeriodEnd && (
                  <li className="flex justify-between p-4 bg-amber-50/50">
                    <span className="text-amber-700">Grace Period Ends</span>
                    <span className="font-medium text-amber-900">{formatAdminDate(sub.gracePeriodEnd)}</span>
                  </li>
                )}
                {sub.degradedPeriodEnd && (
                  <li className="flex justify-between p-4 bg-rose-50/50">
                    <span className="text-rose-700">Degraded Period Ends</span>
                    <span className="font-medium text-rose-900">{formatAdminDate(sub.degradedPeriodEnd)}</span>
                  </li>
                )}
                {sub.cancelledAt && (
                  <li className="flex justify-between p-4 bg-slate-100">
                    <span className="text-slate-600 font-medium">Cancelled At</span>
                    <span className="font-medium text-slate-900">{formatAdminDate(sub.cancelledAt)}</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Entitlements Card */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-indigo-500" />
                Plan Entitlements
              </CardTitle>
              <CardDescription>Features and limits included in this plan</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100">
                <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Max Products</p>
                      <p className="text-xs text-slate-500">Products allowed in store</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {plan?.maxProducts ?? "Unlimited"}
                  </span>
                </li>
                <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                      <Store className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Max Branches</p>
                      <p className="text-xs text-slate-500">Store locations</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {plan?.maxBranches ?? "Unlimited"}
                  </span>
                </li>
                <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Max Employees</p>
                      <p className="text-xs text-slate-500">Staff members per store</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {plan?.maxEmployees ?? "Unlimited"}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <SuspendSubscriptionDialog
        subscriptionId={subscriptionId}
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
        onSuccess={detailState.reload}
      />

      <CancelSubscriptionDialog
        subscriptionId={subscriptionId}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        onSuccess={detailState.reload}
      />
    </div>
  );
}
