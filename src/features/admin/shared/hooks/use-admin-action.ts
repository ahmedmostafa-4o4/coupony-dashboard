"use client";

import { useState } from "react";

import type { AdminActionState } from "@/features/admin/shared/types/admin-common.types";

export function useAdminAction<TInput, TResult>({
  action,
  onSuccess,
}: {
  action: (input: TInput) => Promise<TResult>;
  onSuccess?: (result: TResult) => Promise<void> | void;
}): AdminActionState<TInput, TResult> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<TResult | null>(null);

  async function submit(input: TInput) {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await action(input);
      setLastResult(result);

      if (onSuccess) {
        await onSuccess(result);
      }

      return result;
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Action failed"
      );

      return undefined;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    error,
    isSubmitting,
    lastResult,
    submit,
  };
}
