import { apiClient } from "@/lib/api/client";
import { decamelizeKeys } from "@/lib/utils/case";

import type {
  ApproveBannerRequest,
  RejectBannerRequest,
  UpdateBannerRequest,
} from "../types/banner.types";

export async function approveBanner(
  id: string,
  payload?: ApproveBannerRequest
): Promise<void> {
  await apiClient.post(
    `/admin/banners/${id}/approve`,
    payload ? decamelizeKeys(payload) : {}
  );
}

export async function rejectBanner(
  id: string,
  payload: RejectBannerRequest
): Promise<void> {
  await apiClient.post(
    `/admin/banners/${id}/reject`,
    decamelizeKeys(payload)
  );
}

export async function updateBanner(
  id: string,
  payload: UpdateBannerRequest
): Promise<void> {
  await apiClient.put(
    `/admin/banners/${id}`,
    decamelizeKeys(payload)
  );
}

export async function deleteBanner(id: string): Promise<void> {
  await apiClient.delete(`/admin/banners/${id}`);
}
