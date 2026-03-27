"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { RecommendationsFilters } from "../components/recommendations-filters";
import { RecommendationForm } from "../components/recommendation-form";
import { RecommendationsTable } from "../components/recommendations-table";
import { useRecommendationActions } from "../hooks/use-recommendation-actions";
import { useRecommendationsList } from "../hooks/use-recommendations-list";
import type { RecommendationsListFilters } from "../types/recommendation.types";

const defaultFilters: RecommendationsListFilters = { search: "", status: "all" };

export function RecommendationsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<RecommendationsListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  void lang;
  
  const listState = useRecommendationsList(filters);
  const actions = useRecommendationActions(async () => { await listState.reload(); });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button
              key="createAction"
              variant="secondary"
              onClick={() => setActiveComposer("createAction")}
            >
              Create recommendation
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Curate recommendation placements and promoted content."
        eyebrow="Admin"
        title="Recommendations"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Recommendations currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <RecommendationsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <RecommendationForm
          description="Create a recommendation using the real admin recommendation DTO."
          isSubmitting={actions.createAction.isSubmitting}
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create recommendation"
          title="Create recommendation"
        />
      ) : null}
      <RecommendationsTable
        items={listState.items}

      />
    </div>
  );
}
