import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";

import type { Product } from "../types/product.types";

export function ProductSummaryCards({ product }: { product: Product }) {
  return (
    <CardGrid>
      <AdminStatCard
        hint="Product title returned by the admin products endpoint."
        label="Title"
        value={product.title ?? "Untitled"}
      />
      <AdminStatCard
        hint="Store linked to this live product."
        label="Store"
        value={product.storeName ?? product.storeId ?? "Unknown"}
      />
      <AdminStatCard
        hint="Images currently attached to the product payload."
        label="Images"
        value={product.imagesCount ?? 0}
      />
      <AdminStatCard
        hint="Variants currently attached to the product payload."
        label="Variants"
        value={product.variantsCount ?? 0}
      />
    </CardGrid>
  );
}
