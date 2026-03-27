"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createStoreCategory } from "../api/create-store-category";
import { deleteStoreCategory } from "../api/delete-store-category";
import { updateStoreCategory } from "../api/update-store-category";
import type { UpdateStoreCategoryRequest } from "../types/store-category.types";

export function useStoreCategoryActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    createAction: useAdminAction({
      action: createStoreCategory,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        storeCategoryId,
        payload,
      }: {
        storeCategoryId: string;
        payload: UpdateStoreCategoryRequest;
      }) => updateStoreCategory(storeCategoryId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: deleteStoreCategory,
      onSuccess,
    }),
  };
}
