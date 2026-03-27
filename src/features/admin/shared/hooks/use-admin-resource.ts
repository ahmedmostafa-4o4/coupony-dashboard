"use client";

import { useCallback, useEffect, useState } from "react";

import type { AdminResourceState } from "@/features/admin/shared/types/admin-common.types";
import {
  getPayloadRaw,
  normalizeEntityPayload,
} from "@/features/admin/shared/utils/admin-data";

export function useAdminResource<TData>({
  id,
  getItem,
  enabled = true,
}: {
  id: string;
  getItem: (id: string) => Promise<unknown>;
  enabled?: boolean;
}): AdminResourceState<TData> {
  const [state, setState] = useState<Omit<AdminResourceState<TData>, "reload">>({
    item: null,
    raw: null,
    isLoading: true,
    error: null,
  });

  const reload = useCallback(async () => {
    if (!enabled || !id) {
      return;
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }));

    try {
      const payload = await getItem(id);
      const item = normalizeEntityPayload<TData>(payload);

      setState({
        item,
        raw: getPayloadRaw(payload),
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
  }, [enabled, getItem, id]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    ...state,
    reload,
  };
}
