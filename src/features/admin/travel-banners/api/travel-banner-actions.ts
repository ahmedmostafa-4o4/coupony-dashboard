import { apiClient } from "@/lib/api/client";

export async function createTravelBanner(payload: FormData): Promise<void> {
  await apiClient.post("/admin/travel-banners", payload);
}

export async function updateTravelBanner(
  id: string,
  payload: FormData
): Promise<void> {
  await apiClient.post(`/admin/travel-banners/${id}`, payload);
}

export async function deleteTravelBanner(id: string): Promise<void> {
  await apiClient.delete(`/admin/travel-banners/${id}`);
}
