import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";
import type { ProductRevision } from "./product-revision.types";
import type {
  AdminCreateProductDto,
  AdminProductsQueryDto,
  AdminUpdateProductDto,
  ProductApprovalStatus,
  ProductDto,
  ProductImageDto,
  ProductStatus,
  ProductVariantDto,
  ProductRevisionDto,
  ProductRevisionAction,
  ProductRevisionStatus,
  AdminPendingProductRevisionsQueryDto,
  AdminApproveProductRevisionDto,
  AdminRejectProductRevisionDto,
} from "./products.dto";

export type ProductImage = Camelized<ProductImageDto>;
export type ProductVariant = Camelized<ProductVariantDto>;

export type ProductStore = {
  id?: string;
  name?: string;
  email?: string | null;
  status?: string;
  [key: string]: unknown;
};
export type ProductCategory = {
  id?: string;
  name?: string;
  isActive?: boolean;
  [key: string]: unknown;
};

export type Product = Omit<
  Camelized<ProductDto>,
  "store" | "categories" | "images" | "variants" | "offer" | "pendingRevision"
> & {
  id: string;
  approvalStatus?: string | null;
  store?: ProductStore | null;
  storeId?: string | null;
  title?: string | null;
  slug?: string | null;
  sku?: string | null;
  status?: string | null;
  currency?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isFeatured?: boolean;
  categories?: ProductCategory[];
  images?: ProductImage[];
  variants?: ProductVariant[];
  offer?: Record<string, unknown> | null;
  pendingRevision?: Record<string, unknown> | null;
  storeName?: string;
  categoryNames?: string[];
  approvalStatusLabel?: string | null;
  imageUrls?: string[];
  primaryImageUrl?: string | null;
  variantsCount?: number;
  imagesCount?: number;
  hasOffer?: boolean;
  featuredLabel?: string;
};

export type ProductsListFilters = Omit<
  Camelized<AdminProductsQueryDto>,
  "approvalStatus" | "perPage" | "storeId"
> & {
  search?: string;
  status?: ProductStatus | "all" | string;
  approvalStatus?: ProductApprovalStatus | "all" | string;
  storeId?: string;
  perPage?: string | number;
  page?: string | number;
};
export type ProductsListResult = AdminListResult<Product>;
export type ProductDetailsResult = AdminItemResult<Product>;
export type CreateProductRequest = AdminCreateProductDto;
export type UpdateProductRequest = AdminUpdateProductDto;

export type PendingRevisionsFilters = Camelized<AdminPendingProductRevisionsQueryDto>;
export type PendingRevisionsListResult = AdminListResult<ProductRevision>;
export type RevisionDetailsResult = AdminItemResult<ProductRevision>;
export type ApproveRevisionPayload = Camelized<AdminApproveProductRevisionDto>;
export type RejectRevisionPayload = Camelized<AdminRejectProductRevisionDto>;
