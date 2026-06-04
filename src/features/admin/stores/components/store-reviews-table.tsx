"use client";

import { useState, useEffect } from "react";
import { AdminSection, AdminRecordGrid } from "@/features/admin/shared";
import { getStoreReviews } from "../api/get-store-reviews";
import type { StoreReview } from "../types/store.types";
import { PageLoading } from "@/components/shared/page-loading";

export function StoreReviewsTable({ storeId }: { storeId: string }) {
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getStoreReviews({ storeId, page: 1 });
        setReviews(data.items);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [storeId]);

  if (isLoading) return <PageLoading label="Loading reviews..." />;

  if (error) {
    return (
      <AdminSection title="Reviews Error">
        <p className="text-sm text-rose-600">{error}</p>
      </AdminSection>
    );
  }

  if (reviews.length === 0) {
    return (
      <AdminSection title="Reviews">
        <p className="text-sm text-slate-500">No reviews found for this store.</p>
      </AdminSection>
    );
  }

  return (
    <AdminSection title="Reviews" description="Recent customer reviews for this store.">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <AdminRecordGrid value={review} />
          </div>
        ))}
      </div>
    </AdminSection>
  );
}
