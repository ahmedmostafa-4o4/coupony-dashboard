export interface BannerDto {
  id: string;
  store_id: string;
  image_url: string;
  image_path: string;
  discount_label: string | null;
  date_range: string | null;
  cta_label: string | null;
  terms_of_use: string | null;
  end_time: string | null;
  priority: number;
  is_active: boolean;
  status: "pending" | "approved" | "rejected";
  likes_count: number;
  is_liked: boolean;
  is_favorited: boolean;
  approved_at: string | null;
  approved_by: string | null;
  requested_by: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  store?: {
    id: string;
    name: string;
    logo_url: string | null;
    email?: string;
    phone?: string;
    subscription_tier?: string;
    is_verified?: boolean;
  };
  offers?: { id: string; title: string }[];
  branches?: { id: string; name: string }[];
  requested_by_user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AdminBannersQueryDto {
  status?: "pending" | "approved" | "rejected";
  store_id?: string;
  is_active?: boolean;
  search?: string;
  per_page?: number;
  page?: number;
}

export interface AdminApproveBannerDto {
  notes?: string;
}

export interface AdminRejectBannerDto {
  reason: string;
}

export interface AdminUpdateBannerDto {
  priority?: number;
  is_active?: boolean;
}
