import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapOffer } from "../utils/offer.mappers";
import type { AdminOffersListResponseDto } from "../types/offers.dto";
import type { OffersListFilters } from "../types/offer.types";

export async function getOffers(filters: OffersListFilters = {}) {
  const response = await apiClient.get<AdminOffersListResponseDto>(
    apiEndpoints.admin.offers.list,
    {
      query: buildAdminQuery(filters, "q"),
    }
  );

  return mapPaginatedResponse(response, mapOffer);
}
