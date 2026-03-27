import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCreateRecommendationDto,
  AdminRecommendationsQueryDto,
  RecommendationDto,
} from "./recommendations.dto";

export type Recommendation = Camelized<RecommendationDto>;
export type RecommendationsListFilters = Camelized<AdminRecommendationsQueryDto> & {
  search?: string;
  status?: string;
};
export type RecommendationsListResult = AdminListResult<Recommendation>;
export type CreateRecommendationRequest = AdminCreateRecommendationDto;
