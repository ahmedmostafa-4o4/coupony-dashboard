"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  CreditCard,
  Calendar,
  Zap,
  Package,
  Users,
  Store,
} from "lucide-react";

import { AdminSection, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { getStoreBilling } from "../api/get-store-billing";
import type { StoreSubscription } from "../types/store.types";
import { PageLoading } from "@/components/shared/page-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AssignSubscriptionDialog } from "@/features/admin/billing/subscriptions/components/subscription-action-dialogs";
import type { StoresDictionary } from "../utils/get-dictionary";
import { cn } from "@/lib/utils/cn";

export function StoreBillingInfo({ storeId, dict }: { storeId: string; dict: StoresDictionary["details"]["billing"] }) {
  const [subscription, setSubscription] = useState<StoreSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);

  const load = async () => {
      try {
        setIsLoading(true);
        const data = await getStoreBilling(storeId);
        setSubscription(data.item);
      } catch (err: any) {
        setError(err.message || "Failed to load billing profile");
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    load();
  }, [storeId]);

  if (isLoading) return <PageLoading label="Loading billing profile..." />;

  if (error) {
    return (
      <AdminSection title="Billing Error">
        <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-600">
          <AlertTriangle className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </AdminSection>
    );
  }

  if (!subscription) {
    return (
      <AdminSection title={dict.title}>
        <Card className="border-dashed shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <CreditCard className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{dict.noBilling}</h3>
            <p className="mb-6 max-w-sm text-sm text-slate-500">
              {dict.noBillingDesc}
            </p>
            <Button onClick={() => setAssignOpen(true)} className="gap-2">
              <Zap className="h-4 w-4" />
              {dict.overridePlan}
            </Button>
          </CardContent>
        </Card>
        <AssignSubscriptionDialog
          storeId={storeId}
          open={assignOpen}
          onOpenChange={setAssignOpen}
          onSuccess={load}
        />
      </AdminSection>
    );
  }

  const plan = subscription.plan!;
  const status = subscription.status || "active";
  const billingCycle = subscription.billingCycle || "monthly";
  const currentPeriodStart = subscription.currentPeriodStart;
  const currentPeriodEnd = subscription.currentPeriodEnd;
  
  // Calculate progress for the progress bar
  let progress = 0;
  let daysRemaining = 0;
  if (currentPeriodStart && currentPeriodEnd) {
    const start = new Date(currentPeriodStart).getTime();
    const end = new Date(currentPeriodEnd).getTime();
    const now = Date.now();
    const total = end - start;
    const elapsed = now - start;
    progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
    daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
  }

  const statusStyles = {
    active: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    past_due: "bg-amber-500/15 text-amber-700 border-amber-200",
    suspended: "bg-rose-500/15 text-rose-700 border-rose-200",
    cancelled: "bg-slate-500/15 text-slate-700 border-slate-200",
  }[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{dict.title}</h2>
        <p className="text-sm text-slate-500">{dict.desc}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan Card */}
        <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
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
          
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-900">{dict.currentPeriod}</span>
              <span className="text-slate-500">{daysRemaining} {dict.daysRemaining}</span>
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
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatAdminDate(currentPeriodStart)}</span>
              <span>{formatAdminDate(currentPeriodEnd)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Entitlements Card */}
        <Card className="border-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-indigo-500" />
              {dict.entitlements}
            </CardTitle>
            <CardDescription>{dict.entitlementsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{dict.maxProducts}</p>
                    <p className="text-xs text-slate-500">{dict.maxProductsDesc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                  {plan.maxProducts ?? dict.unlimited}
                </span>
              </li>
              <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <Store className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{dict.maxBranches}</p>
                    <p className="text-xs text-slate-500">{dict.maxBranchesDesc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                  {plan.maxBranches ?? dict.unlimited}
                </span>
              </li>
              <li className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{dict.maxEmployees}</p>
                    <p className="text-xs text-slate-500">{dict.maxEmployeesDesc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                  {plan.maxEmployees ?? dict.unlimited}
                </span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-slate-100 bg-slate-50/50 p-4">
             <Button variant="outline" className="w-full text-slate-600 hover:text-slate-900" onClick={() => setAssignOpen(true)}>
               <Zap className="mr-2 h-4 w-4" />
               {dict.overridePlan}
             </Button>
          </CardFooter>
        </Card>
      </div>

      <AssignSubscriptionDialog
        storeId={storeId}
        open={assignOpen}
        onOpenChange={setAssignOpen}
        onSuccess={load}
      />
    </div>
  );
}
