import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateRecommendationResponseDto } from "../types/recommendations.dto";
import type { CreateRecommendationRequest } from "../types/recommendation.types";

export async function createRecommendation(
  payload: CreateRecommendationRequest
) {
  return apiClient.post<
    AdminCreateRecommendationResponseDto,
    CreateRecommendationRequest
  >(apiEndpoints.admin.recommendations.list, payload);
}
