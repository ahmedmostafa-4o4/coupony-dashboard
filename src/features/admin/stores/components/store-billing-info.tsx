"use client";

import { useState, useEffect } from "react";
import { AdminSection, AdminRecordGrid } from "@/features/admin/shared";
import { getStoreBilling } from "../api/get-store-billing";
import type { StoreSubscription } from "../types/store.types";
import { PageLoading } from "@/components/shared/page-loading";
import type { StoresDictionary } from "../utils/get-dictionary";

export function StoreBillingInfo({ storeId, dict }: { storeId: string; dict: StoresDictionary["details"]["billing"] }) {
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
      <AdminSection title={dict.title}>
        <p className="text-sm text-slate-500">{dict.noBillingDesc}</p>
      </AdminSection>
    );
  }

  return (
    <AdminSection title={dict.title} description={dict.desc}>
      <AdminRecordGrid value={subscription} />
    </AdminSection>
  );
}
