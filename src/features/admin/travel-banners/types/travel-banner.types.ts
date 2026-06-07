import type { AdminFilterValues } from "@/features/admin/shared/types/admin-common.types";

export interface TravelBanner {
  id: string;
  productId: string;
  imageUrl: string;
  ctaText: string;
  savePercent: string;
  priority: number;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: string;
    title: string;
    basePrice: string;
    compareAtPrice?: string;
    currency: string;
    sku: string;
    status: string;
    shortDescription?: string;
  };
}

export interface SelectableProduct {
  id: string;
  title: string;
  shortDescription?: string;
  basePrice: string;
  compareAtPrice?: string;
  status: string;
  ratingAvg: string;
  favoritesCount: number;
  likesCount: number;
  image: string;
  hasOffer: boolean;
  offer?: {
    id: string;
    discountValue: number;
    discountType: string;
    startDate: string;
    endDate: string;
  };
  store?: {
    id: string;
    name: string;
  };
  categories?: {
    id: number;
    name: string;
  }[];
}

export interface TravelBannersFilters extends AdminFilterValues {
  search?: string;
  status?: string | boolean;
}

export interface SelectableProductsFilters extends AdminFilterValues {
  search?: string;
  category_id?: string;
  min_review_score?: number;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
}
