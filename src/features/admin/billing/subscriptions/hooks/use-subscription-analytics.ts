import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getSubscriptionAnalytics, type SubscriptionAnalytics } from "../api/get-subscription-analytics";

export function useSubscriptionAnalytics() {
  const [data, setData] = useState<SubscriptionAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSubscriptionAnalytics();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load subscription analytics.");
      toast.error("Failed to load subscription analytics.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    isLoading,
    error,
    reload: fetchAnalytics,
  };
}
