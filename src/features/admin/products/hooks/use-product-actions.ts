"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createProduct } from "../api/create-product";
import { deleteProduct } from "../api/delete-product";
import { updateProduct } from "../api/update-product";
import type {
  UpdateProductRequest,
} from "../types/product.types";

export function useProductActions(onSuccess?: () => Promise<void> | void) {
  return {
    createAction: useAdminAction({
      action: createProduct,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        productId,
        payload,
      }: {
        productId: string;
        payload: UpdateProductRequest;
      }) => updateProduct(productId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: deleteProduct,
      onSuccess,
    }),
  };
}
