"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AdminCollectionState,
  AdminFilterValues,
} from "@/features/admin/shared/types/admin-common.types";
import { normalizeCollectionPayload } from "@/features/admin/shared/utils/admin-data";

export function useAdminCollection<
  TData,
  TFilters extends AdminFilterValues = AdminFilterValues,
>({
  filters,
  getItems,
  enabled = true,
}: {
  filters?: TFilters;
  getItems: (filters?: TFilters) => Promise<unknown>;
  enabled?: boolean;
}): AdminCollectionState<TData> {
  const [state, setState] = useState<Omit<AdminCollectionState<TData>, "reload">>(
    {
      items: [],
      total: 0,
      meta: undefined,
      raw: null,
      isLoading: true,
      error: null,
    }
  );

  const reload = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }));

    try {
      const payload = await getItems(filters);
      const normalized = normalizeCollectionPayload<TData>(payload);

      setState({
        ...normalized,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: error instanceof Error ? error.message : "Request failed",
      }));
    }
  }, [enabled, filters, getItems]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    ...state,
    reload,
  };
}
