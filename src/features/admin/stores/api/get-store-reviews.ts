import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { mapPaginatedResponse, type AdminListResult } from "@/lib/api/admin-contract";
import type { StoreReviewDto } from "../types/stores.dto";
import type { StoreReview } from "../types/store.types";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";

interface GetStoreReviewsParams {
  storeId: string;
  page?: number;
}

export async function getStoreReviews({ storeId, page = 1 }: GetStoreReviewsParams): Promise<AdminListResult<StoreReview>> {
  const response = await apiClient.get<ApiSuccessResponse<PaginatedResultDto<StoreReviewDto>>>(
    `/admin/stores/${storeId}/reviews`,
    {
      query: { page },
    }
  );

  return mapPaginatedResponse(response);
}
