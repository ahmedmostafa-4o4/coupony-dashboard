import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminApproveProductRevisionDto,
  AdminRejectProductRevisionDto,
  ProductRevisionDto,
} from "./products.dto";

export type ProductRevisionSectionValue =
  | Record<string, unknown>
  | unknown[]
  | null
  | undefined;

export type ProductRevision = Omit<
  Camelized<ProductRevisionDto>,
  | "product"
  | "categories"
  | "images"
  | "variants"
  | "offer"
  | "payload"
  | "rawPayload"
  | "changes"
  | "diff"
  | "metadata"
  | "reviewMetadata"
> & {
  revisionId: string;
  productId?: string | null;
  productTitle?: string | null;
  storeName?: string | null;
  actionLabel?: string | null;
  statusLabel?: string | null;
  submittedAt?: string | null;
  submittedBy?: string | null;
  submittedAtLabel?: string | null;
  notes?: string | null;
  reason?: string | null;
  primaryImageUrl?: string | null;
  variantsCount?: number;
  categoriesCount?: number;
  imagesCount?: number;
  hasOffer?: boolean;
  product?: ProductRevisionSectionValue;
  categories?: ProductRevisionSectionValue;
  images?: ProductRevisionSectionValue;
  variants?: ProductRevisionSectionValue;
  offer?: ProductRevisionSectionValue;
  payload?: ProductRevisionSectionValue;
  reviewMetadata?: ProductRevisionSectionValue;
};

export type ProductRevisionsListResult = AdminListResult<ProductRevision>;
export type ProductRevisionDetailsResult = AdminItemResult<ProductRevision>;
export type ApproveProductRevisionRequest = AdminApproveProductRevisionDto;
export type RejectProductRevisionRequest = AdminRejectProductRevisionDto;
