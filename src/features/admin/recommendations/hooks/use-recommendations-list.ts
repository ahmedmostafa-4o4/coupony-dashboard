"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getRecommendations } from "../api/get-recommendations";
import type { Recommendation, RecommendationsListFilters } from "../types/recommendation.types";

export function useRecommendationsList(filters: RecommendationsListFilters) {
  return useAdminCollection<Recommendation, RecommendationsListFilters>({
    filters,
    getItems: getRecommendations,
  });
}
