"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getPendingProductRevisions } from "../api/get-pending-product-revisions";
import type { ProductRevision } from "../types/product-revision.types";

export function useProductRevisionsList() {
  return useAdminCollection<ProductRevision>({
    getItems: getPendingProductRevisions,
  });
}
