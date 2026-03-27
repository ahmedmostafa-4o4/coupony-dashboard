"use client";

import { useEffect, useState } from "react";

import { getUserStatistics } from "../api/get-user-statistics";
import type { UserStatistics } from "../types/user.types";

export function useUserStatistics() {
  const [item, setItem] = useState<UserStatistics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function reload() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserStatistics();
      setItem(result.item);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to load user statistics."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  return {
    error,
    isLoading,
    item,
    reload,
  };
}
