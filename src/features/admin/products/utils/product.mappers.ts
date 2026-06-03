import type { Camelized } from "@/types";

import type {
  AdminProductDetailsResponseDto,
  ProductDto,
} from "../types/products.dto";
import type {
  Product,
  ProductCategory,
  ProductImage,
  ProductStore,
  ProductVariant,
} from "../types/product.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return String(value);
}

function toProductStore(value: unknown): ProductStore | null | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return value as ProductStore;
}

function toProductCategories(value: unknown): ProductCategory[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter(isRecord) as ProductCategory[];
}

function toProductImages(value: unknown): ProductImage[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter(isRecord) as ProductImage[];
}

function toProductVariants(value: unknown): ProductVariant[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter(isRecord) as ProductVariant[];
}

function collectImageUrls(images?: ProductImage[]) {
  return (
    images
      ?.map((image) => image.url ?? image.path)
      .filter((value): value is string => Boolean(value)) ?? []
  );
}

function extractPrimaryImageUrl(images?: ProductImage[]) {
  return collectImageUrls(images)[0] ?? null;
}

function normalizeProduct(item: Camelized<ProductDto>): Product {
  const store = toProductStore(item.store);
  const categories = toProductCategories(item.categories);
  const images = toProductImages(item.images);
  const variants = toProductVariants(item.variants);

  return {
    ...item,
    approvalStatusLabel: asString(item.approvalStatus) ?? null,
    categoryNames:
      categories?.map((category) => asString(category.name)).filter(Boolean) as
        | string[]
        | undefined,
    categories,
    featuredLabel: item.isFeatured ? "Featured" : "Standard",
    hasOffer: Boolean(item.offer && isRecord(item.offer)),
    imageUrls: collectImageUrls(images),
    imagesCount: images?.length ?? 0,
    images,
    offer: isRecord(item.offer) ? item.offer : null,
    pendingRevision: isRecord(item.pendingRevision) ? item.pendingRevision : null,
    primaryImageUrl: extractPrimaryImageUrl(images),
    store,
    storeName: asString(store?.name) ?? undefined,
    variantsCount: variants?.length ?? 0,
    variants,
  };
}

export function mapProduct(item: Camelized<ProductDto>): Product {
  return normalizeProduct(item);
}

export function mapProductDetails(
  data: Camelized<AdminProductDetailsResponseDto["data"]>
): Product {
  const detailRecord = data as Record<string, unknown>;
  const baseProduct = (detailRecord.product ?? data) as Camelized<ProductDto>;
  const product = normalizeProduct(baseProduct);

  return {
    ...product,
    categories:
      toProductCategories(detailRecord.categories) ?? product.categories,
    images: toProductImages(detailRecord.images) ?? product.images,
    offer: (isRecord(detailRecord.offer) ? detailRecord.offer : product.offer) ?? null,
    pendingRevision:
      (isRecord(detailRecord.pendingRevision)
        ? detailRecord.pendingRevision
        : product.pendingRevision) ?? null,
    store: toProductStore(detailRecord.store) ?? product.store,
    storeName:
      asString(toProductStore(detailRecord.store)?.name) ?? product.storeName,
    variants: toProductVariants(detailRecord.variants) ?? product.variants,
    imageUrls: collectImageUrls(toProductImages(detailRecord.images) ?? product.images),
    imagesCount: (toProductImages(detailRecord.images) ?? product.images)?.length ?? 0,
    primaryImageUrl: extractPrimaryImageUrl(
      toProductImages(detailRecord.images) ?? product.images
    ),
    variantsCount:
      (toProductVariants(detailRecord.variants) ?? product.variants)?.length ?? 0,
  };
}
