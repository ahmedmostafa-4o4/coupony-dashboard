"use client";

import { useEffect, useState, useCallback } from "react";
import { getPaymentById } from "../api/get-payment-by-id";
import type { PaymentDetailsResult } from "../types/payment.types";

export function usePaymentDetails(paymentId: string) {
  const [state, setState] = useState<PaymentDetailsResult & { isLoading: boolean; error?: string }>({
    item: null,
    raw: null,
    isLoading: true,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));
    try {
      const result = await getPaymentById(paymentId);
      setState({ ...result, isLoading: false });
    } catch (err: any) {
      setState({
        item: null,
        raw: null,
        isLoading: false,
        error: err?.message || "Failed to load payment details",
      });
    }
  }, [paymentId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}
