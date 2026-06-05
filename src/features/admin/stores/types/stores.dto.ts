import type {
  ApiSuccessResponse,
  CategoryDto,
  ISODateTime,
  StoreDto,
  StoreVerificationDto,
  UserDto,
  SubscriptionPlanDto,
} from "@/types/admin-api.dto";

export type {
  AdminApproveStoreDto,
  AdminApproveStoreResponseDto,
  AdminCloseStoreDto,
  AdminCloseStoreResponseDto,
  AdminRejectStoreDto,
  AdminRejectStoreResponseDto,
  AdminStoresQueryDto,
  AdminSuspendStoreDto,
  AdminSuspendStoreResponseDto,
  AdminUpdateStoreBillingProfileDto,
  AdminUpdateStoreBillingProfileResponseDto,
  AdminUpdateStoreDto,
  AdminUpdateStoreResponseDto,
  StoreStatus,
  BillingProfileDto,
  SubscriptionPlanDto,
} from "@/types/admin-api.dto";

export interface StoreAddressDto {
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  country_code?: string | null;
  created_at?: ISODateTime | null;
  delivery_instructions?: string | null;
  id: number | string;
  is_default_billing?: boolean;
  is_default_shipping?: boolean;
  label?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  phone_number?: string | null;
  postal_code?: string | null;
  state_province?: string | null;
  updated_at?: ISODateTime | null;
}

export type StoreCategorySummaryDto = Pick<
  CategoryDto,
  "id" | "name" | "is_active" | "icon_url"
>;

export interface StoreOwnerDto extends UserDto {
  full_name?: string | null;
  profile?: {
    avatar?: string | null;
    bio?: string | null;
    date_of_birth?: string | null;
    first_name?: string | null;
    gender?: string | null;
    last_name?: string | null;
  } | null;
}

export interface StoreVerificationRecordDto
  extends Omit<StoreVerificationDto, "document_url"> {
  document_path?: string | null;
  document_url?: string | null;
}

export interface StoreHoursDto {
  close_time?: string | null;
  created_at?: ISODateTime | null;
  day_of_week: number;
  id: number | string;
  is_closed?: boolean | number | null;
  open_time?: string | null;
  store_id?: string;
  updated_at?: ISODateTime | null;
}

export interface StoreRecordDto extends StoreDto {
  addresses?: StoreAddressDto[];
  categories?: StoreCategorySummaryDto[];
  hours?: StoreHoursDto[];
  owner?: StoreOwnerDto | null;
  rating_avg?: number | string | null;
  rating_count?: number | null;
  verified_at?: ISODateTime | null;
  verifications?: StoreVerificationRecordDto[];
  points?: StorePointsDto | null;
  subscription?: StoreSubscriptionDto | null;
}

export interface StorePointsDto {
  balance?: number;
  total_earned?: number;
  total_redeemed?: number;
}

export interface StoreSubscriptionDto {
  id?: string;
  plan_id?: string;
  status?: string;
  billing_cycle?: string;
  current_period_start?: ISODateTime | null;
  current_period_end?: ISODateTime | null;
  grace_period_end?: ISODateTime | null;
  degraded_period_end?: ISODateTime | null;
  trial_ends_at?: ISODateTime | null;
  cancelled_at?: ISODateTime | null;
  plan?: {
    id?: string;
    name?: string;
    slug?: string;
    price_monthly?: number;
    price_yearly?: number;
    currency?: string;
    max_products?: number;
    max_employees?: number;
    max_branches?: number;
    grace_period_days?: number;
    degraded_period_days?: number;
  } | null;
}

export interface StoreReviewDto {
  id: string;
  user_id: string;
  content: string;
  rating: number;
  created_at: ISODateTime;
  user?: StoreOwnerDto | null;
}

export type AdminStoresListResponseDto = ApiSuccessResponse<StoreRecordDto[]> & {
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
};

export type AdminStoreDetailsResponseDto = ApiSuccessResponse<StoreRecordDto>;
