import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";
import type { ProductsDictionary } from "../utils/get-dictionary";

import type { ProductRevision } from "../types/product-revision.types";

export function ProductRevisionOverview({
  revision,
  dict,
}: {
  revision: ProductRevision;
  dict: ProductsDictionary["revisionOverview"];
}) {
  return (
    <CardGrid>
      <AdminStatCard
        hint={dict.revisionHint}
        label={dict.revision}
        value={revision.revisionId}
      />
      <AdminStatCard
        hint={dict.productHint}
        label={dict.product}
        value={revision.productTitle ?? revision.productId ?? dict.unknown}
      />
      <AdminStatCard
        hint={dict.storeHint}
        label={dict.store}
        value={revision.storeName ?? dict.unknown}
      />
      <AdminStatCard
        hint={dict.submittedHint}
        label={dict.submitted}
        value={revision.submittedAtLabel ?? "—"}
      />
    </CardGrid>
  );
}

