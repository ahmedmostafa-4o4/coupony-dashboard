"use client";

import { Coins, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import type { StorePoints } from "../types/store.types";

export function StorePointsCard({ points }: { points?: StorePoints | null }) {
  if (!points) {
    return (
      <AdminSection description="Points balance and history for this store." title="Points">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Coins className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">No points data found</h3>
          <p className="mt-1 text-sm text-slate-500">This store doesn't have an active points ledger.</p>
        </div>
      </AdminSection>
    );
  }

  const balance = points.balance ?? 0;
  const earned = points.totalEarned ?? 0;
  const redeemed = points.totalRedeemed ?? 0;

  return (
    <AdminSection description="Points balance and history for this store." title="Points">
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/70">
                Current Balance
              </p>
              <p className="text-3xl font-bold tracking-tight text-amber-900">
                {balance.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Earned Card */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70">
                Total Earned
              </p>
              <p className="text-3xl font-bold tracking-tight text-emerald-900">
                {earned.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Redeemed Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Redeemed
              </p>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {redeemed.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}
