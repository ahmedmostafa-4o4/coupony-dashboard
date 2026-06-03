import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../types/product.types";

export interface ProductFormValues {
  categoryIds: string;
  currency: string;
  description: string;
  images: string;
  isFeatured: boolean;
  offer: string;
  shortDescription: string;
  sku: string;
  slug: string;
  storeId: string;
  title: string;
  variants: string;
}

function parseJsonArray(value: string, fieldName: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  const parsed = JSON.parse(normalized) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`${fieldName} must be a valid JSON array.`);
  }

  return parsed;
}

function parseOffer(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  const parsed = JSON.parse(normalized) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Offer must be a valid JSON object.");
  }

  return parsed as Record<string, unknown>;
}

function parseCategoryIds(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.startsWith("[")) {
    const parsed = JSON.parse(normalized) as unknown;

    if (!Array.isArray(parsed)) {
      throw new Error("Category IDs must be a JSON array or comma separated list.");
    }

    return parsed.map(String);
  }

  return normalized
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function createProductFormSchema(
  mode: "create"
): AdminFormSchema<ProductFormValues, CreateProductRequest>;
export function createProductFormSchema(
  mode: "update"
): AdminFormSchema<ProductFormValues, UpdateProductRequest>;
export function createProductFormSchema(
  mode: "create" | "update"
): AdminFormSchema<
  ProductFormValues,
  CreateProductRequest | UpdateProductRequest
> {
  return {
    defaultValues: {
      categoryIds: "",
      currency: "",
      description: "",
      images: "",
      isFeatured: false,
      offer: "",
      shortDescription: "",
      sku: "",
      slug: "",
      storeId: "",
      title: "",
      variants: "",
    },
    transform(values) {
      const payload = {
        category_ids: parseCategoryIds(values.categoryIds),
        currency: trimOptional(values.currency),
        description: trimOptional(values.description),
        images: parseJsonArray(values.images, "Images"),
        is_featured: values.isFeatured,
        offer: parseOffer(values.offer),
        short_description: trimOptional(values.shortDescription),
        sku: trimOptional(values.sku),
        slug: trimOptional(values.slug),
        title: trimOptional(values.title),
        variants: parseJsonArray(values.variants, "Variants"),
      };

      if (mode === "create") {
        return {
          ...payload,
          store_id: values.storeId.trim(),
        };
      }

      return payload;
    },
    validate(values) {
      let categoryIdsError: string | undefined;
      let imagesError: string | undefined;
      let offerError: string | undefined;
      let variantsError: string | undefined;

      try {
        void parseCategoryIds(values.categoryIds);
      } catch (error) {
        categoryIdsError =
          error instanceof Error ? error.message : "Invalid category IDs value.";
      }

      try {
        void parseJsonArray(values.images, "Images");
      } catch (error) {
        imagesError =
          error instanceof Error ? error.message : "Invalid images payload.";
      }

      try {
        void parseJsonArray(values.variants, "Variants");
      } catch (error) {
        variantsError =
          error instanceof Error ? error.message : "Invalid variants payload.";
      }

      try {
        void parseOffer(values.offer);
      } catch (error) {
        offerError =
          error instanceof Error ? error.message : "Invalid offer payload.";
      }

      return {
        storeId:
          mode === "create" && !values.storeId.trim()
            ? "Store ID is required."
            : undefined,
        categoryIds: categoryIdsError,
        images: imagesError,
        offer: offerError,
        variants: variantsError,
      };
    },
  };
}

function stringifyJson(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return JSON.stringify(value, null, 2);
}

export function toProductFormValues(product?: Product | null): ProductFormValues {
  return {
    categoryIds: stringifyJson(product?.categoryIds ?? product?.categories?.map((item) => item.id).filter(Boolean) ?? []),
    currency: String(product?.currency ?? ""),
    description: String(product?.description ?? ""),
    images: stringifyJson(product?.images ?? []),
    isFeatured: Boolean(product?.isFeatured ?? false),
    offer: stringifyJson(product?.offer ?? {}),
    shortDescription: String(product?.shortDescription ?? ""),
    sku: String(product?.sku ?? ""),
    slug: String(product?.slug ?? ""),
    storeId: String(product?.storeId ?? ""),
    title: String(product?.title ?? ""),
    variants: stringifyJson(product?.variants ?? []),
  };
}
