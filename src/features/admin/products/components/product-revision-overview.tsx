import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";

import type { ProductRevision } from "../types/product-revision.types";

export function ProductRevisionOverview({
  revision,
}: {
  revision: ProductRevision;
}) {
  return (
    <CardGrid>
      <AdminStatCard
        hint="Revision identifier returned by the admin review endpoint."
        label="Revision"
        value={revision.revisionId}
      />
      <AdminStatCard
        hint="Product title linked to this revision."
        label="Product"
        value={revision.productTitle ?? revision.productId ?? "Unknown"}
      />
      <AdminStatCard
        hint="Store associated with this revision, when available."
        label="Store"
        value={revision.storeName ?? "Unknown"}
      />
      <AdminStatCard
        hint="Submitted timestamp formatted for dashboard display."
        label="Submitted"
        value={revision.submittedAtLabel ?? "—"}
      />
    </CardGrid>
  );
}
