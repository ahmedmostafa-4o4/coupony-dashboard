"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getProductRevisionById } from "../api/get-product-revision-by-id";
import type { ProductRevision } from "../types/product-revision.types";

export function useProductRevisionDetails(revisionId: string) {
  return useAdminResource<ProductRevision>({
    id: revisionId,
    getItem: getProductRevisionById,
  });
}
