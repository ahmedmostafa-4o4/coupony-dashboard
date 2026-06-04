"use client";

import { useAdminResource } from "@/features/admin/shared";
import { getStoreAddresses } from "../api/get-store-addresses";
import type { StoreAddress } from "../types/store.types";
import { useCallback, useEffect, useState } from "react";
import type { AdminListResult } from "@/lib/api/admin-contract";

export function useStoreAddresses(storeId: string) {
  const [state, setState] = useState<{
    items: StoreAddress[];
    isLoading: boolean;
    error: string | null;
  }>({
    items: [],
    isLoading: true,
    error: null,
  });

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await getStoreAddresses(storeId);
      setState({
        items: response.items,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load addresses",
      }));
    }
  }, [storeId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    ...state,
    reload,
  };
}
