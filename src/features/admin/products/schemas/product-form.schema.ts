import type {
  CreateProductRequest,
  Product,
  ProductImage,
  ProductVariant,
  UpdateProductRequest,
} from "../types/product.types";

export type ProductFormImage = ProductImage & { file?: File; previewUrl?: string };

export type ProductFormVariant = Omit<ProductVariant, "attributes"> & {
  attributes?: { attributeName: string; attributeValue: string }[];
  _dbId?: string;
  originalPrice?: number;
  inventoryMode?: string;
  isDefault?: boolean;
  isActive?: boolean;
  stockQty?: number;
  lowStockThreshold?: number;
  allowBackorder?: boolean;
  barcode?: string;
  currency?: string;
};

export interface ProductFormValues {
  categoryIds: string;
  currency: string;
  description: string;
  isFeatured: boolean;
  shortDescription: string;
  sku: string;
  slug: string;
  storeId: string;
  title: string;
  variants: ProductFormVariant[];
  images: ProductFormImage[];
  offer: {
    type: string;
    starts_at?: string;
    ends_at?: string;
    duration_days?: string;
    duration_hours?: string;
    claim_expiration_minutes?: string;
    fixed_amount?: string;
    percentage_value?: string;
    max_discount?: string;
    buy_qty?: string;
    get_qty?: string;
    allow_mix_buy_variants?: boolean;
    allow_mix_reward_variants?: boolean;
    buy_variant_skus?: string;
    reward_variant_skus?: string;
  };
}

export function toProductFormValues(product?: Product | null): ProductFormValues {
  return {
    categoryIds: (product?.categories?.map((item) => item.id).filter(Boolean) ?? []).join(", "),
    currency: String(product?.currency ?? ""),
    description: String(product?.description ?? ""),
    isFeatured: Boolean(product?.isFeatured ?? false),
    shortDescription: String(product?.shortDescription ?? ""),
    sku: String(product?.sku ?? ""),
    slug: String(product?.slug ?? ""),
    storeId: String(product?.storeId ?? ""),
    title: String(product?.title ?? ""),
    variants: (product?.variants ?? []).map((v) => {
      const { id, ...rest } = v;
      return {
        ...rest,
        _dbId: id,
        attributes: (((rest as any).attributes) ?? []).map((a: any) => {
          const { id: attrId, ...attrRest } = a;
          return { ...attrRest, _dbId: attrId };
        }),
      };
    }) as any,
    images: (product?.images ?? []).map((img) => {
      const { id, ...rest } = img;
      return { ...rest, _dbId: id };
    }) as any,
    offer: {
      type: (product?.offer?.type as string) || "none",
      starts_at: ((product?.offer?.startsAt as string) || "").split("T")[0],
      ends_at: ((product?.offer?.endsAt as string) || "").split("T")[0],
      duration_days: (product?.offer?.durationDays as string) || "",
      duration_hours: (product?.offer?.durationHours as string) || "",
      claim_expiration_minutes: (product?.offer?.claimExpirationMinutes as string) || "",
      fixed_amount: (product?.offer?.fixedAmount as string) || "",
      percentage_value: (product?.offer?.percentageValue as string) || "",
      max_discount: (product?.offer?.maxDiscount as string) || "",
      buy_qty: (product?.offer?.buyQty as string) || "",
      get_qty: (product?.offer?.getQty as string) || "",
      allow_mix_buy_variants: Boolean(product?.offer?.allowMixBuyVariants ?? false),
      allow_mix_reward_variants: Boolean(product?.offer?.allowMixRewardVariants ?? false),
      buy_variant_skus: (product?.offer?.buyVariantSkus as string[] | undefined)?.join(", ") || "",
      reward_variant_skus: (product?.offer?.rewardVariantSkus as string[] | undefined)?.join(", ") || "",
    },
  };
}

export function prepareProductPayload(
  values: ProductFormValues,
  mode: "create" | "update"
): CreateProductRequest | UpdateProductRequest {
  const category_ids = values.categoryIds
    .split(/[\n,]/)
    .map((id) => id.trim())
    .filter(Boolean);

  const images = values.images.map((img, index) => ({
    image_url: img.path,
    is_primary: img.isPrimary,
    file: img.file,
    sort_order: index,
  }));

  const variants = values.variants.map((v, index) => ({
    title: v.title,
    sku: v.sku,
    barcode: v.barcode,
    original_price: v.originalPrice,
    currency: v.currency,
    sort_order: index,
    is_default: v.isDefault,
    is_active: v.isActive,
    inventory_mode: v.inventoryMode,
    stock_qty: v.stockQty,
    low_stock_threshold: v.lowStockThreshold,
    allow_backorder: v.allowBackorder,
    attributes: v.attributes?.map((attr: any, attrIdx: number) => ({
      attribute_name: attr.attributeName || attr.attribute_name,
      attribute_value: attr.attributeValue || attr.attribute_value,
      sort_order: attrIdx,
    })) || [],
  }));

  let offerPayload: Record<string, any> | undefined = undefined;
  
  if (values.offer.type && values.offer.type !== "none") {
    offerPayload = {
      type: values.offer.type,
      starts_at: values.offer.starts_at || undefined,
      ends_at: values.offer.ends_at || undefined,
      duration_days: values.offer.duration_days ? parseInt(values.offer.duration_days, 10) : undefined,
      duration_hours: values.offer.duration_hours ? parseInt(values.offer.duration_hours, 10) : undefined,
      claim_expiration_minutes: values.offer.claim_expiration_minutes ? parseInt(values.offer.claim_expiration_minutes, 10) : undefined,
      fixed_amount: values.offer.fixed_amount ? parseFloat(values.offer.fixed_amount) : undefined,
      percentage_value: values.offer.percentage_value ? parseFloat(values.offer.percentage_value) : undefined,
      max_discount: values.offer.max_discount ? parseFloat(values.offer.max_discount) : undefined,
      buy_qty: values.offer.buy_qty ? parseInt(values.offer.buy_qty, 10) : undefined,
      get_qty: values.offer.get_qty ? parseInt(values.offer.get_qty, 10) : undefined,
      allow_mix_buy_variants: values.offer.allow_mix_buy_variants,
      allow_mix_reward_variants: values.offer.allow_mix_reward_variants,
      buy_variant_skus: values.offer.buy_variant_skus
        ? values.offer.buy_variant_skus.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
        : undefined,
      reward_variant_skus: values.offer.reward_variant_skus
        ? values.offer.reward_variant_skus.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
        : undefined,
    };
  } else if (mode === "update" && variants.length > 0) {
    // If we update variants, backend requires offer to be submitted
    offerPayload = { type: "none" };
  }

  const payload: any = {
    title: values.title || undefined,
    slug: values.slug || undefined,
    sku: values.sku || undefined,
    short_description: values.shortDescription || undefined,
    description: values.description || undefined,
    currency: values.currency || undefined,
    is_featured: values.isFeatured,
    category_ids: category_ids.length > 0 ? category_ids : undefined,
    variants: variants.length > 0 ? variants : undefined,
    images: images.length > 0 ? images : undefined,
    offer: offerPayload,
  };

  if (mode === "create") {
    payload.store_id = values.storeId;
  }

  return payload;
}
