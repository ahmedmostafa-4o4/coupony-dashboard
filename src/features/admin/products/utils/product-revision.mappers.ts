import type { Camelized } from "@/types";
import { formatAdminDate } from "@/features/admin/shared";

import type {
  AdminProductRevisionDetailsResponseDto,
  ProductRevisionDto,
} from "../types/products.dto";
import type {
  ProductRevision,
  ProductRevisionSectionValue,
} from "../types/product-revision.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readFirst(
  record: Record<string, unknown>,
  keys: string[]
): unknown {
  for (const key of keys) {
    const value = record[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
}

function asString(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return String(value);
}

function actorLabel(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  return asString(
    readFirst(value, [
      "name",
      "fullName",
      "displayName",
      "email",
      "username",
      "id",
    ])
  );
}

function nestedName(value: unknown): string | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return asString(
    readFirst(value, ["name", "title", "displayName", "email", "id"])
  );
}

function readSection(
  record: Record<string, unknown>,
  keys: string[]
): ProductRevisionSectionValue {
  const value = readFirst(record, keys);

  if (Array.isArray(value)) {
    return value;
  }

  if (isRecord(value)) {
    return value;
  }

  return undefined;
}

function readCount(value: ProductRevisionSectionValue) {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (isRecord(value)) {
    return Object.keys(value).length;
  }

  return 0;
}

function collectImageUrls(value: ProductRevisionSectionValue): string[] {
  if (typeof value === "string") {
    return value ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) =>
      collectImageUrls(entry as ProductRevisionSectionValue)
    );
  }

  if (!isRecord(value)) {
    return [];
  }

  const directUrl = [value.url, value.imageUrl, value.path, value.src].find(
    (entry) => typeof entry === "string" && entry.length > 0
  );

  if (typeof directUrl === "string") {
    return [directUrl];
  }

  return Object.values(value).flatMap((entry) =>
    collectImageUrls(entry as ProductRevisionSectionValue)
  );
}

function readProductTitle(record: Record<string, unknown>) {
  const directTitle = asString(
    readFirst(record, ["productTitle", "title", "name", "productName"])
  );

  if (directTitle) {
    return directTitle;
  }

  const nestedProduct = readSection(record, [
    "product",
    "currentProduct",
    "submittedProduct",
  ]);

  if (!isRecord(nestedProduct)) {
    return undefined;
  }

  return asString(
    readFirst(nestedProduct, ["title", "name", "productTitle", "id"])
  );
}

function pickRevisionRecord(
  value: Camelized<AdminProductRevisionDetailsResponseDto["data"]>
) {
  const record = value as Record<string, unknown>;
  const nested = readFirst(record, ["productRevision", "revision"]);

  return isRecord(nested) ? nested : record;
}

export function hasProductRevisionSection(value: ProductRevisionSectionValue) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (isRecord(value)) {
    return Object.keys(value).length > 0;
  }

  return false;
}

export function mapProductRevision(
  item: Camelized<ProductRevisionDto>
): ProductRevision {
  const record = item as Record<string, unknown>;

  return {
    ...item,
    revisionId:
      asString(readFirst(record, ["id", "revisionId", "revision"])) ?? "",
    productId: asString(readFirst(record, ["productId", "targetProductId"])),
    productTitle: readProductTitle(record) ?? null,
    storeName:
      asString(readFirst(record, ["storeName"])) ??
      nestedName(readFirst(record, ["store"])) ??
      nestedName(readFirst(record, ["product"])) ??
      null,
    actionLabel:
      asString(readFirst(record, ["action", "type", "revisionType", "operation"])) ??
      null,
    statusLabel:
      asString(readFirst(record, ["status", "reviewStatus"])) ?? null,
    submittedAt:
      asString(readFirst(record, ["submittedAt", "createdAt", "requestedAt"])) ??
      null,
    submittedAtLabel: formatAdminDate(
      asString(readFirst(record, ["submittedAt", "createdAt", "requestedAt"])) ?? null
    ),
    submittedBy:
      actorLabel(
        readFirst(record, ["submittedBy", "requestedBy", "createdBy", "seller", "user"])
      ) ?? null,
    notes:
      asString(readFirst(record, ["notes", "reviewNotes", "adminNotes"])) ?? null,
    reason:
      asString(readFirst(record, ["reason", "rejectionReason"])) ?? null,
    product: readSection(record, [
      "product",
      "currentProduct",
      "submittedProduct",
    ]),
    categories: readSection(record, [
      "categories",
      "productCategories",
      "categoryIds",
    ]),
    images: readSection(record, ["images", "media", "gallery"]),
    variants: readSection(record, ["variants", "options", "skus"]),
    offer: readSection(record, ["offer", "offerDetails"]),
    payload: readSection(record, [
      "payload",
      "revisionPayload",
      "submittedPayload",
      "rawPayload",
      "changes",
      "diff",
    ]),
    primaryImageUrl:
      collectImageUrls(readSection(record, ["images", "media", "gallery"]))[0] ??
      null,
    categoriesCount: readCount(
      readSection(record, ["categories", "productCategories", "categoryIds"])
    ),
    imagesCount: readCount(readSection(record, ["images", "media", "gallery"])),
    variantsCount: readCount(readSection(record, ["variants", "options", "skus"])),
    hasOffer: hasProductRevisionSection(readSection(record, ["offer", "offerDetails"])),
    reviewMetadata: readSection(record, [
      "metadata",
      "reviewMetadata",
      "review",
      "moderation",
    ]),
  };
}

export function mapProductRevisionDetails(
  data: Camelized<AdminProductRevisionDetailsResponseDto["data"]>
): ProductRevision {
  const dataRecord = data as Record<string, unknown>;
  const revisionRecord = pickRevisionRecord(data);
  const revision = mapProductRevision(revisionRecord as Camelized<ProductRevisionDto>);

  return {
    ...revision,
    product:
      readSection(dataRecord, ["product", "currentProduct", "submittedProduct"]) ??
      revision.product,
    categories:
      readSection(dataRecord, ["categories", "productCategories", "categoryIds"]) ??
      revision.categories,
    images: readSection(dataRecord, ["images", "media", "gallery"]) ?? revision.images,
    variants:
      readSection(dataRecord, ["variants", "options", "skus"]) ?? revision.variants,
    offer: readSection(dataRecord, ["offer", "offerDetails"]) ?? revision.offer,
    payload:
      readSection(dataRecord, [
        "payload",
        "revisionPayload",
        "submittedPayload",
        "rawPayload",
        "changes",
        "diff",
      ]) ?? revision.payload,
    reviewMetadata:
      readSection(dataRecord, [
        "metadata",
        "reviewMetadata",
        "review",
        "moderation",
      ]) ?? revision.reviewMetadata,
    primaryImageUrl:
      collectImageUrls(
        readSection(dataRecord, ["images", "media", "gallery"]) ?? revision.images
      )[0] ?? revision.primaryImageUrl,
    categoriesCount:
      readCount(
        readSection(dataRecord, ["categories", "productCategories", "categoryIds"]) ??
          revision.categories
      ) || revision.categoriesCount,
    imagesCount:
      readCount(readSection(dataRecord, ["images", "media", "gallery"]) ?? revision.images) ||
      revision.imagesCount,
    variantsCount:
      readCount(readSection(dataRecord, ["variants", "options", "skus"]) ?? revision.variants) ||
      revision.variantsCount,
    hasOffer:
      hasProductRevisionSection(
        readSection(dataRecord, ["offer", "offerDetails"]) ?? revision.offer
      ) || revision.hasOffer,
  };
}
