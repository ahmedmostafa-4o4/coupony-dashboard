"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createCategory } from "../api/create-category";
import { deleteCategory } from "../api/delete-category";
import { updateCategory } from "../api/update-category";
import type { UpdateCategoryRequest } from "../types/category.types";

export function useCategoryActions(onSuccess?: () => Promise<void> | void) {
  return {
    createAction: useAdminAction({
      action: createCategory,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        categoryId,
        payload,
      }: {
        categoryId: string;
        payload: UpdateCategoryRequest;
      }) => updateCategory(categoryId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: deleteCategory,
      onSuccess,
    }),
  };
}
