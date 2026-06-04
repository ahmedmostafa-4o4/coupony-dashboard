"use client";

import { useState } from "react";
import { toast } from "sonner";
import { attachStoreCategory } from "../api/attach-store-category";
import { detachStoreCategory } from "../api/detach-store-category";

export function useStoreCategoriesActions(storeId: string, onSuccess?: () => Promise<void>) {
  const [isAttaching, setIsAttaching] = useState<string | number | null>(null);
  const [isDetaching, setIsDetaching] = useState<string | number | null>(null);

  const handleAttach = async (categoryId: string | number) => {
    try {
      setIsAttaching(categoryId);
      await attachStoreCategory(storeId, categoryId);
      toast.success("Category added successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add category");
      return false;
    } finally {
      setIsAttaching(null);
    }
  };

  const handleDetach = async (categoryId: string | number) => {
    try {
      setIsDetaching(categoryId);
      await detachStoreCategory(storeId, categoryId);
      toast.success("Category removed successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove category");
      return false;
    } finally {
      setIsDetaching(null);
    }
  };

  return {
    isAttaching,
    isDetaching,
    handleAttach,
    handleDetach,
  };
}
