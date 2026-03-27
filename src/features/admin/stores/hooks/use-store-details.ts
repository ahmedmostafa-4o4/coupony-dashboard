"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getStoreById } from "../api/get-store-by-id";
import type { Store } from "../types/store.types";

export function useStoreDetails(storeId: string) {
  return useAdminResource<Store>({
    id: storeId,
    getItem: getStoreById,
  });
}
