"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getStores } from "../api/get-stores";
import type { Store, StoresListFilters } from "../types/store.types";

export function useStoresList(filters: StoresListFilters) {
  return useAdminCollection<Store, StoresListFilters>({
    filters,
    getItems: getStores,
  });
}
