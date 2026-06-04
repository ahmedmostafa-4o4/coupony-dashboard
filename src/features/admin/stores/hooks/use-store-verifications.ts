"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { getStoreVerifications } from "../api/get-store-verifications";
import type { StoreVerificationRecord } from "../types/store.types";

export function useStoreVerifications(storeId: string) {
  const [verifications, setVerifications] = useState<StoreVerificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVerifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getStoreVerifications(storeId);
      setVerifications(result.item || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch verifications");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  return {
    verifications,
    isLoading,
    reload: fetchVerifications,
  };
}
