import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";
import type { ProductsDictionary } from "../utils/get-dictionary";

import type { Product } from "../types/product.types";

export function ProductSummaryCards({
  product,
  dict,
}: {
  product: Product;
  dict: ProductsDictionary["revisionOverview"];
}) {
  return (
    <CardGrid>
      <AdminStatCard
        hint={dict.productHint}
        label={dict.product}
        value={product.title ?? dict.unknown}
      />
      <AdminStatCard
        hint={dict.storeHint}
        label={dict.store}
        value={product.storeName ?? product.storeId ?? dict.unknown}
      />
      <AdminStatCard
        hint={dict.imagesHint}
        label={dict.images}
        value={product.imagesCount ?? 0}
      />
      <AdminStatCard
        hint={dict.variantsHint}
        label={dict.variants}
        value={product.variantsCount ?? 0}
      />
    </CardGrid>
  );
}

