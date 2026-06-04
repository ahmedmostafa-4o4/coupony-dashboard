"use client";

import { useState, useEffect } from "react";
import { AdminSection, AdminRecordGrid } from "@/features/admin/shared";
import { getStoreBilling } from "../api/get-store-billing";
import type { StoreSubscription } from "../types/store.types";
import { PageLoading } from "@/components/shared/page-loading";

export function StoreBillingInfo({ storeId }: { storeId: string }) {
  const [subscription, setSubscription] = useState<StoreSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getStoreBilling(storeId);
        setSubscription(data.item);
      } catch (err: any) {
        setError(err.message || "Failed to load billing profile");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [storeId]);

  if (isLoading) return <PageLoading label="Loading billing profile..." />;

  if (error) {
    return (
      <AdminSection title="Billing Error">
        <p className="text-sm text-rose-600">{error}</p>
      </AdminSection>
    );
  }

  if (!subscription) {
    return (
      <AdminSection title="Billing Profile">
        <p className="text-sm text-slate-500">No active billing subscription found for this store.</p>
      </AdminSection>
    );
  }

  return (
    <AdminSection title="Billing Profile" description="Subscription and billing details.">
      <AdminRecordGrid value={subscription} />
    </AdminSection>
  );
}
