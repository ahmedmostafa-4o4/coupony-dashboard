/**
 * Extracted admin DTOs from Coupony API V2 Postman collection.
 *
 * Notes:
 * - Request DTOs are grounded in request bodies and textual "Request shape" descriptions from the collection.
 * - Many admin success responses in the collection are only described textually rather than shown as full JSON.
 *   Those response DTOs are best-effort contracts based on the described envelope and request/update samples.
 * - TODO comments mark places where the backend contract should be confirmed from implementation or OpenAPI.
 */

export type UUID = string;
export type ISODate = string;
export type ISODateTime = string;
export type CurrencyCode = string;
export type JsonObject = Record<string, unknown>;
export type SortOrder = "asc" | "desc";

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface PaginationDto {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_more?: boolean;
}

export interface PaginatedResultDto<T> {
  items: T[];
  pagination: PaginationDto;
}

export interface BaseListQueryDto {
  page?: number;
  per_page?: number;
}

export interface DateRangeQueryDto {
  from?: ISODate | ISODateTime;
  to?: ISODate | ISODateTime;
}

export interface EntityRefDto {
  id: UUID;
  [key: string]: unknown;
}

/* =========================================================
   Shared entity DTOs
   ========================================================= */

export type UserStatus =
  | "active"
  | "suspended"
  | "deleted"
  | "pending"
  | string;
export type StoreStatus =
  | "pending"
  | "active"
  | "rejected"
  | "suspended"
  | "closed"
  | string;
export type VerificationStatus = "pending" | "approved" | "rejected" | string;
export type OfferStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "published"
  | "archived"
  | string;
export type CouponStatus = "active" | "inactive" | "expired" | string;
export type BillingCycle = "monthly" | "quarterly" | "yearly" | string;
export type BillingModel = "commission" | "subscription" | "hybrid" | string;
export type CollectionMethod = "manual_invoice" | "card" | "cash" | string;
export type InvoiceStatus = "draft" | "issued" | "paid" | "void" | string;
export type CommissionStatus =
  | "pending"
  | "invoiced"
  | "paid"
  | "waived"
  | string;
export type CustomerTicketStatus =
  | "pending"
  | "in_progress"
  | "resolved"
  | string;
export type SellerLeadStatus = "pending" | "contacted" | "converted" | string;
export type BroadcastChannel = "push" | "email" | "sms" | "in_app" | string;
export type RecommendationTargetType =
  | "store"
  | "offer"
  | "coupon"
  | "category"
  | string;
export type RecommendationGeneratedBy = "manual" | "system" | "model" | string;
export type ProductStatus =
  | "draft"
  | "active"
  | "inactive"
  | "archived"
  | string;
export type ProductApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | string;
export type ProductRevisionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | string;
export type ProductRevisionAction =
  | "create"
  | "update"
  | "delete"
  | string;

export interface UserSessionDto {
  id: string;
  ip_address?: string | null;
  user_agent?: string | null;
  device_type?: string | null;
  expires_at?: ISODateTime | null;
  last_activity?: number | null;
}

export interface UserDto {
  id: UUID;
  email: string;
  phone_number?: string | null;
  status: UserStatus;
  language?: string | null;
  timezone?: string | null;
  email_verified_at?: ISODateTime | null;
  phone_verified_at?: ISODateTime | null;
  two_factor_enabled?: boolean;
  last_login_at?: ISODateTime | null;
  last_ip?: string | null;
  sessions?: UserSessionDto[] | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface UserProfileDto {
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: ISODate | null;
  gender?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
}

export interface RoleDto {
  id: UUID;
  name: string;
  guard_name?: string;
  permissions_count?: number;
  permissions?: PermissionDto[];
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface PermissionDto {
  id: UUID;
  name: string;
  guard_name?: string;
  group?: string;
}

export interface UserRoleAssignmentDto {
  id: UUID;
  user_id: UUID;
  role_id: UUID;
  store_id?: UUID | null;
  branch_id?: UUID | null;
  role?: RoleDto;
  store?: EntityRefDto;
  branch?: EntityRefDto;
  assigned_at?: ISODateTime;
}

export interface CategoryDto {
  id: UUID;
  name: string;
  name_en?: string | null;
  name_ar?: string | null;
  slug?: string | null;
  description?: string | null;
  parent_id?: UUID | null;
  sort_order?: number;
  is_active?: boolean;
  icon_url?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface StoreCategoryDto {
  id: UUID;
  name?: string;
  name_en?: string | null;
  name_ar?: string | null;
  slug?: string | null;
  sort_order?: number;
  is_active?: boolean;
  icon_url?: string | null;
  image_category?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface StoreDto {
  id: UUID;
  name: string;
  description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  email?: string | null;
  phone?: string | null;
  tax_id?: string | null;
  commission_rate?: number | null;
  status: StoreStatus;
  subscription_tier?: string | null;
  is_verified?: boolean;
  admin_notes?: string | null;
  owner_user_id?: UUID | null;
  approved_at?: ISODateTime | null;
  approved_by?: UUID | null;
  rejected_at?: ISODateTime | null;
  rejected_by?: UUID | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface StoreVerificationDto {
  id: UUID;
  store_id: UUID;
  document_type?: string;
  document_url?: string | null;
  status: VerificationStatus;
  rejection_reason?: string | null;
  reviewed_by?: UUID | null;
  reviewed_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface OfferDto {
  id: UUID;
  store_id?: UUID;
  status: OfferStatus;
  offer_type?: string | null;
  title?: string | null;
  approved_by_user_id?: UUID | null;
  approved_at?: ISODateTime | null;
  approval_notes?: string | null;
  published_at?: ISODateTime | null;
  archived_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface CouponDto {
  id: UUID;
  store_id?: UUID;
  offer_id?: UUID;
  status: CouponStatus;
  title?: string | null;
  description?: string | null;
  start_at?: ISODateTime | null;
  end_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface QrHistoryEventDto {
  id?: UUID;
  action?: string;
  created_at?: ISODateTime;
  actor_user_id?: UUID | null;
  metadata?: JsonObject;
}

export interface RedemptionEventDto {
  id?: UUID;
  type?: string;
  status?: string;
  note?: string | null;
  created_at?: ISODateTime;
  actor_user_id?: UUID | null;
  metadata?: JsonObject;
}

export interface RedemptionDto {
  id: UUID;
  store_id?: UUID;
  branch_id?: UUID | null;
  customer_id?: UUID | null;
  status: string;
  coupon_id?: UUID | null;
  offer_id?: UUID | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface SubscriptionPlanDto {
  id: UUID;
  slug: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
  prices: {
    monthly: string;
    yearly: string;
    currency: CurrencyCode;
  };
  entitlements: {
    max_products?: number | null;
    max_employees?: number | null;
    max_branches?: number | null;
  };
  features?: string[] | null;
  payment_config?: {
    is_review_mode: boolean;
    supported_payment_methods: string[];
  };
}

export interface BillingProfileDto {
  id: UUID;
  store_id: UUID;
  billing_model: BillingModel;
  commission_rate?: number | null;
  plan_id?: UUID | null;
  manual_invoice_enabled?: boolean;
  effective_from?: ISODateTime | null;
  effective_to?: ISODateTime | null;
  notes?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface SubscriptionDto {
  id: UUID;
  store_id?: UUID;
  plan_id?: UUID;
  status: string;
  billing_cycle?: BillingCycle;
  collection_method?: CollectionMethod;
  current_period_start?: ISODateTime | null;
  current_period_end?: ISODateTime | null;
  grace_period_end?: ISODateTime | null;
  degraded_period_end?: ISODateTime | null;
  trial_ends_at?: ISODateTime | null;
  trial_start?: ISODateTime | null;
  trial_end?: ISODateTime | null;
  cancel_at_period_end?: boolean;
  cancelled_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
  plan?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price_monthly: string;
    price_yearly: string;
    currency: string;
    max_products: number;
    max_employees: number;
    max_branches: number;
    features: string[];
  } | null;
}

export interface InvoiceDto {
  id: UUID;
  store_id?: UUID;
  subscription_id?: UUID | null;
  status: InvoiceStatus;
  due_date?: ISODate | null;
  paid_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface CommissionDto {
  id: UUID;
  store_id?: UUID;
  invoice_id?: UUID | null;
  status: CommissionStatus;
  amount?: number | null;
  period_start?: ISODate | null;
  period_end?: ISODate | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface CustomerTicketDto {
  id: UUID;
  status: CustomerTicketStatus;
  subject?: string | null;
  email?: string | null;
  user_id?: UUID | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface SellerLeadDto {
  id: UUID;
  status: SellerLeadStatus;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  store_name?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface NotifyMeDto {
  id: UUID;
  user_id?: UUID | null;
  target_type?: string | null;
  target_id?: UUID | null;
  channel?: string | null;
  created_at?: ISODateTime;
}

export interface AuditLogDto {
  id: number;
  log_name?: string | null;
  description?: string | null;
  subject_id?: string | number | null;
  subject_type?: string | null;
  event?: string | null;
  causer_id?: string | number | null;
  causer_type?: string | null;
  properties?: JsonObject | null;
  causer?: {
    id: number | string;
    first_name?: string;
    last_name?: string;
    email?: string;
  } | null;
  created_at?: ISODateTime;
}

export interface ChatMessageDto {
  id: UUID;
  role?: "user" | "assistant" | "system" | string;
  content?: string;
  source?: string | null;
  created_at?: ISODateTime;
  metadata?: JsonObject;
}

export interface ChatSessionDto {
  id: UUID;
  user_id?: UUID | null;
  session_status?: string;
  source?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface RecommendationDto {
  id: UUID;
  user_id: UUID;
  target_type: RecommendationTargetType;
  target_id: UUID;
  score?: number | null;
  reason_code?: string | null;
  context?: JsonObject | null;
  generated_by?: RecommendationGeneratedBy;
  expires_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface PaymentDto {
  id: UUID;
  store_id?: UUID | null;
  plan_id?: UUID | null;
  billing_cycle?: string | null;
  amount?: string | number | null;
  currency?: CurrencyCode;
  status?: string;
  paymob_order_id?: string | null;
  paymob_transaction_id?: string | null;
  payment_url?: string | null;
  expires_at?: ISODateTime | null;
  paid_at?: ISODateTime | null;
  failed_at?: ISODateTime | null;
  failure_reason?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
  store?: StoreDto | null;
  plan?: SubscriptionPlanDto | null;
}

export interface InventoryTransactionDto {
  id: UUID;
  store_id?: UUID | null;
  branch_id?: UUID | null;
  product_id?: UUID | null;
  transaction_type?: string;
  quantity?: number;
  note?: string | null;
  created_at?: ISODateTime;
}

export interface ProductImageDto {
  id?: UUID | string;
  url?: string | null;
  path?: string | null;
  alt?: string | null;
  sort_order?: number | null;
  [key: string]: unknown;
}

export interface ProductVariantDto {
  id?: UUID | string;
  sku?: string | null;
  title?: string | null;
  price?: number | null;
  stock?: number | null;
  attributes?: JsonObject | null;
  [key: string]: unknown;
}

export interface ProductDto {
  id: UUID;
  store_id?: UUID | null;
  title?: string | null;
  slug?: string | null;
  short_description?: string | null;
  description?: string | null;
  currency?: CurrencyCode | string | null;
  sku?: string | null;
  status?: ProductStatus;
  approval_status?: ProductApprovalStatus;
  is_featured?: boolean;
  category_ids?: Array<UUID | string> | null;
  categories?: Array<CategoryDto | EntityRefDto> | null;
  images?: ProductImageDto[] | JsonObject[] | null;
  variants?: ProductVariantDto[] | JsonObject[] | null;
  offer?: JsonObject | null;
  store?: StoreDto | EntityRefDto | null;
  pending_revision?: JsonObject | null;
  created_at?: ISODateTime | null;
  updated_at?: ISODateTime | null;
  [key: string]: unknown;
}

export interface ProductRevisionDto {
  id: UUID;
  product_id?: UUID | null;
  product_title?: string | null;
  title?: string | null;
  status?: ProductRevisionStatus;
  action?: ProductRevisionAction | null;
  type?: string | null;
  submitted_at?: ISODateTime | null;
  submitted_by?: EntityRefDto | UserDto | string | null;
  requested_by?: EntityRefDto | UserDto | string | null;
  created_by?: EntityRefDto | UserDto | string | null;
  reviewed_at?: ISODateTime | null;
  reviewed_by?: EntityRefDto | UserDto | string | null;
  reason?: string | null;
  rejection_reason?: string | null;
  notes?: string | null;
  review_notes?: string | null;
  metadata?: JsonObject | null;
  review_metadata?: JsonObject | null;
  product?: JsonObject | null;
  categories?: unknown[] | JsonObject | null;
  images?: unknown[] | JsonObject | null;
  variants?: unknown[] | JsonObject | null;
  offer?: JsonObject | null;
  payload?: JsonObject | null;
  raw_payload?: JsonObject | null;
  changes?: JsonObject | null;
  diff?: JsonObject | null;
  created_at?: ISODateTime | null;
  updated_at?: ISODateTime | null;
  [key: string]: unknown;
}

/* =========================================================
   Dashboard
   ========================================================= */

export type AdminDashboardQueryDto = DateRangeQueryDto;

export interface AdminDashboardGrowthDto {
  total_users: number;
  total_stores: number;
  new_users_this_month: number;
  new_stores_this_month: number;
}

export interface AdminDashboardFinancialDto {
  total_sales_volume: number;
  premium_stores: number;
  average_store_rating: number;
}

export interface AdminDashboardPointsEconomyDto {
  total_points_in_circulation: number;
  lifetime_points_earned: number;
  lifetime_points_spent: number;
  points_redemption_rate: number;
}

export interface AdminDashboardOperationalDto {
  pending_store_approvals: number;
  pending_verifications: number;
  unresolved_customer_tickets: number;
  unresolved_seller_tickets: number;
}

export interface AdminDashboardChartsDto {
  user_growth: { date: string; count: number }[];
  store_growth: { date: string; count: number }[];
  claims_volume: { date: string; count: number }[];
  subscription_distribution: { tier: string; count: number }[];
  top_stores: {
    id: string;
    name: string;
    total_sales: number;
    rating_avg: string;
  }[];
  points_flow: {
    earned: { date: string; count: string }[];
    spent: { date: string; count: string }[];
  };
}

export type AdminDashboardResponseDto = ApiSuccessResponse<{
  growth: AdminDashboardGrowthDto;
  financial: AdminDashboardFinancialDto;
  points_economy: AdminDashboardPointsEconomyDto;
  operational: AdminDashboardOperationalDto;
  charts: AdminDashboardChartsDto;
}>;

/* =========================================================
   Users
   ========================================================= */

export interface AdminUsersQueryDto extends BaseListQueryDto {
  q?: string;
  status?: UserStatus;
  role?: string;
}

export interface AdminCreateUserDto {
  email: string;
  password: string;
  password_confirmation: string;
  phone_number?: string;
  first_name: string;
  last_name: string;
  role: string;
  status?: UserStatus;
  language?: string;
  timezone?: string;
  date_of_birth?: string;
  gender?: string;
  bio?: string;
}

export interface AdminUpdateUserDto {
  email?: string;
  phone_number?: string;
  status?: UserStatus;
  language?: string;
  timezone?: string;
  two_factor_enabled?: boolean;
  profile?: UserProfileDto;
}

export interface AdminUserActionReasonDto {
  reason?: string;
}

export type AdminActivateUserDto = Record<string, never>;

export interface AdminAssignUserRoleDto {
  role_id: UUID;
  store_id?: UUID;
  branch_id?: UUID;
}

export type AdminUsersListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<UserDto>
>;
export type AdminCreateUserResponseDto = ApiSuccessResponse<{
  user: UserDto;
  profile?: UserProfileDto;
  roles?: RoleDto[];
}>;
export type AdminUserDetailsResponseDto = ApiSuccessResponse<{
  user: UserDto;
  profile?: UserProfileDto;
  roles: RoleDto[] | UserRoleAssignmentDto[];
}>;
export type AdminUpdateUserResponseDto = ApiSuccessResponse<{
  user: UserDto;
  profile?: UserProfileDto;
}>;
export type AdminActivateUserResponseDto = ApiSuccessResponse<{
  user: UserDto;
}>;
export type AdminSuspendUserResponseDto = ApiSuccessResponse<{ user: UserDto }>;
export type AdminDeleteUserResponseDto = ApiSuccessResponse<{ user: UserDto }>;
export type AdminAssignUserRoleResponseDto = ApiSuccessResponse<{
  assignment: UserRoleAssignmentDto;
}>;
export type AdminRemoveUserRoleResponseDto = ApiSuccessResponse<{
  deleted: true;
}>;

/* =========================================================
   Roles & permissions
   ========================================================= */

export type AdminRolesQueryDto = BaseListQueryDto;

export interface AdminCreateRoleDto {
  name: string;
  guard_name?: string;
  permissions: string[];
}

export interface AdminUpdateRoleDto {
  name?: string;
  guard_name?: string;
  permissions: string[];
}

export type AdminPermissionsQueryDto = BaseListQueryDto;

export type AdminRolesListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<RoleDto>
>;
export type AdminCreateRoleResponseDto = ApiSuccessResponse<{ role: RoleDto }>;
export type AdminUpdateRoleResponseDto = ApiSuccessResponse<{ role: RoleDto }>;
export type AdminDeleteRoleResponseDto = ApiSuccessResponse<{ deleted: true }>;
export type AdminPermissionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<PermissionDto>
>;
export type AdminUpdateRolePermissionsResponseDto = ApiSuccessResponse<{
  role: RoleDto;
  permissions: PermissionDto[];
}>;

/* =========================================================
   Categories
   ========================================================= */

export interface AdminCategoriesQueryDto extends BaseListQueryDto {
  parent_id?: UUID;
  is_active?: boolean;
}

export interface AdminCreateCategoryDto {
  name_en: string;
  name_ar: string;
  slug?: string;
  description?: string;
  parent_id?: UUID;
  sort_order?: number;
  is_active?: boolean;
  icon?: File;
}

export interface AdminUpdateCategoryDto {
  name_en?: string;
  name_ar?: string;
  slug?: string;
  description?: string;
  parent_id?: UUID;
  sort_order?: number;
  is_active?: boolean;
  icon?: File;
}

export type AdminCategoriesListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<CategoryDto>
>;
export type AdminCreateCategoryResponseDto = ApiSuccessResponse<{
  category: CategoryDto;
}>;
export type AdminUpdateCategoryResponseDto = ApiSuccessResponse<{
  category: CategoryDto;
}>;
export type AdminDeleteCategoryResponseDto = ApiSuccessResponse<{
  deleted: true;
}>;

/* =========================================================
   Store categories
   ========================================================= */

export interface AdminStoreCategoriesQueryDto extends BaseListQueryDto {
  is_active?: boolean;
}

export interface AdminCreateStoreCategoryDto {
  name_en: string;
  name_ar: string;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
  icon?: File;
  image_category?: File;
}

export interface AdminUpdateStoreCategoryDto {
  name_en?: string;
  name_ar?: string;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
  icon?: File;
  image_category?: File;
}

export type AdminStoreCategoriesListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<StoreCategoryDto>
>;
export type AdminCreateStoreCategoryResponseDto = ApiSuccessResponse<{
  store_category: StoreCategoryDto;
}>;
export type AdminUpdateStoreCategoryResponseDto = ApiSuccessResponse<{
  store_category: StoreCategoryDto;
}>;
export type AdminDeleteStoreCategoryResponseDto = ApiSuccessResponse<{
  deleted: true;
}>;

/* =========================================================
   Stores
   ========================================================= */

export interface AdminStoresQueryDto extends BaseListQueryDto, DateRangeQueryDto {
  q?: string;
  status?: StoreStatus;
  owner_user_id?: UUID;
  is_verified?: boolean;
  subscription_tier?: string;
}

export interface AdminUpdateStoreDto {
  name?: string;
  description?: string | null;
  logo_url?: string;
  banner_url?: string;
  email?: string;
  phone?: string;
  tax_id?: string | null;
  commission_rate?: number;
  status?: StoreStatus;
  subscription_tier?: string;
  is_verified?: boolean;
  admin_notes?: string;
}

export interface AdminApproveStoreDto {
  notes?: string;
}

export interface AdminRejectStoreDto {
  reason: string;
  admin_notes?: string;
}

export interface AdminSuspendStoreDto {
  reason: string;
}

export interface AdminCloseStoreDto {
  reason?: string;
}

export type AdminStoresListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<StoreDto>
>;
export type AdminStoreDetailsResponseDto = ApiSuccessResponse<{
  store: StoreDto;
  owner?: UserDto;
  branches?: EntityRefDto[];
  billing_profile?: BillingProfileDto | null;
  verifications?: StoreVerificationDto[];
  followers_count?: number;
}>;
export type AdminUpdateStoreResponseDto = ApiSuccessResponse<{
  store: StoreDto;
}>;
export type AdminApproveStoreResponseDto = ApiSuccessResponse<{
  store: StoreDto;
}>;
export type AdminRejectStoreResponseDto = ApiSuccessResponse<{
  store: StoreDto;
}>;
export type AdminSuspendStoreResponseDto = ApiSuccessResponse<{
  store: StoreDto;
}>;
export type AdminCloseStoreResponseDto = ApiSuccessResponse<{
  store: StoreDto;
}>;

/* =========================================================
   Products
   ========================================================= */

export interface AdminProductsQueryDto extends BaseListQueryDto {
  search?: string;
  status?: ProductStatus;
  approval_status?: ProductApprovalStatus;
  store_id?: UUID;
}

export interface AdminCreateProductDto {
  store_id: UUID | string;
  title?: string;
  slug?: string;
  short_description?: string;
  description?: string;
  currency?: CurrencyCode | string;
  sku?: string;
  is_featured?: boolean;
  category_ids?: Array<UUID | string>;
  images?: unknown[];
  variants?: unknown[];
  offer?: JsonObject;
}

export interface AdminUpdateProductDto {
  title?: string;
  slug?: string;
  short_description?: string;
  description?: string;
  currency?: CurrencyCode | string;
  sku?: string;
  is_featured?: boolean;
  category_ids?: Array<UUID | string>;
  images?: unknown[];
  variants?: unknown[];
  offer?: JsonObject;
}

export type AdminProductsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<ProductDto> | ProductDto[]
>;
export type AdminProductDetailsResponseDto = ApiSuccessResponse<{
  product?: ProductDto;
  store?: StoreDto | null;
  categories?: Array<CategoryDto | EntityRefDto> | null;
  images?: ProductImageDto[] | JsonObject[] | null;
  variants?: ProductVariantDto[] | JsonObject[] | null;
  offer?: JsonObject | null;
  pending_revision?: JsonObject | null;
  [key: string]: unknown;
}>;
export type AdminCreateProductResponseDto = ApiSuccessResponse<{
  product?: ProductDto;
  [key: string]: unknown;
}>;
export type AdminUpdateProductResponseDto = ApiSuccessResponse<{
  product?: ProductDto;
  [key: string]: unknown;
}>;
export type AdminDeleteProductResponseDto = ApiSuccessResponse<{
  deleted?: true;
  product?: ProductDto;
  [key: string]: unknown;
}>;

/* =========================================================
   Store verifications
   ========================================================= */

export interface AdminStoreVerificationsQueryDto extends BaseListQueryDto {
  status?: VerificationStatus;
  store_id?: UUID;
  document_type?: string;
}

export type AdminApproveStoreVerificationDto = Record<string, never>;

export interface AdminRejectStoreVerificationDto {
  reason: string;
}

export type AdminStoreVerificationsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<StoreVerificationDto>
>;
export type AdminStoreVerificationDetailsResponseDto = ApiSuccessResponse<
  StoreVerificationDto & { store?: StoreDto }
>;
export type AdminApproveStoreVerificationResponseDto = ApiSuccessResponse<{
  store_verification: StoreVerificationDto;
}>;
export type AdminRejectStoreVerificationResponseDto = ApiSuccessResponse<{
  store_verification: StoreVerificationDto;
}>;

/* =========================================================
   Product revisions
   ========================================================= */

export type AdminPendingProductRevisionsQueryDto = BaseListQueryDto;

export interface AdminApproveProductRevisionDto {
  notes?: string;
}

export interface ProductRequestedChangeDto {
  section: string;
  field?: string;
  path?: string;
  selector?: { uid?: string; sku?: string; index?: number; id?: number; image_url?: string };
  variant_selector?: { uid?: string; sku?: string; index?: number; id?: number };
  attribute_selector?: { uid?: string; name?: string; index?: number };
  label?: string;
  message?: string;
}

export interface AdminRejectProductRevisionDto {
  reason: string;
  notes?: string;
  requested_changes?: ProductRequestedChangeDto[];
}

export type AdminPendingProductRevisionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<ProductRevisionDto> | ProductRevisionDto[]
>;
export type AdminProductRevisionDetailsResponseDto = ApiSuccessResponse<{
  revision?: ProductRevisionDto;
  product_revision?: ProductRevisionDto;
  product?: JsonObject | null;
  categories?: unknown[] | JsonObject | null;
  images?: unknown[] | JsonObject | null;
  variants?: unknown[] | JsonObject | null;
  offer?: JsonObject | null;
  metadata?: JsonObject | null;
  review?: JsonObject | null;
  payload?: JsonObject | null;
  raw_payload?: JsonObject | null;
  changes?: JsonObject | null;
  diff?: JsonObject | null;
  [key: string]: unknown;
}>;
export type AdminApproveProductRevisionResponseDto = ApiSuccessResponse<{
  revision?: ProductRevisionDto;
  product_revision?: ProductRevisionDto;
  [key: string]: unknown;
}>;
export type AdminRejectProductRevisionResponseDto = ApiSuccessResponse<{
  revision?: ProductRevisionDto;
  product_revision?: ProductRevisionDto;
  [key: string]: unknown;
}>;

/* =========================================================
   Offers
   ========================================================= */

export interface AdminOffersQueryDto
  extends BaseListQueryDto, DateRangeQueryDto {
  q?: string;
  status?: OfferStatus;
  store_id?: UUID;
  offer_type?: string;
}

export interface AdminApproveOfferDto {
  approval_notes?: string;
}

export interface AdminRejectOfferDto {
  approval_notes: string;
}

export type AdminPublishOfferDto = Record<string, never>;

export interface AdminArchiveOfferDto {
  reason?: string;
}

export type AdminOffersListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<OfferDto>
>;
export type AdminOfferDetailsResponseDto = ApiSuccessResponse<{
  offer: OfferDto;
  items?: EntityRefDto[];
  branches?: EntityRefDto[];
  store?: StoreDto;
}>;
export type AdminApproveOfferResponseDto = ApiSuccessResponse<{
  offer: OfferDto;
}>;
export type AdminRejectOfferResponseDto = ApiSuccessResponse<{
  offer: OfferDto;
}>;
export type AdminPublishOfferResponseDto = ApiSuccessResponse<{
  offer: OfferDto;
}>;
export type AdminArchiveOfferResponseDto = ApiSuccessResponse<{
  offer: OfferDto;
}>;

/* =========================================================
   Coupons
   ========================================================= */

export interface AdminCouponsQueryDto extends BaseListQueryDto {
  status?: CouponStatus;
  store_id?: UUID;
  offer_id?: UUID;
}

export interface AdminUpdateCouponDto {
  status?: CouponStatus;
  title?: string;
  description?: string;
  start_at?: ISODateTime;
  end_at?: ISODateTime;
}

export type AdminCouponsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<CouponDto>
>;
export type AdminUpdateCouponResponseDto = ApiSuccessResponse<{
  coupon: CouponDto;
}>;

/* =========================================================
   Redemptions
   ========================================================= */

export interface AdminRedemptionsQueryDto
  extends BaseListQueryDto, DateRangeQueryDto {
  status?: string;
  store_id?: UUID;
  branch_id?: UUID;
  customer_id?: UUID;
}

export interface AdminFraudBlockRedemptionDto {
  fraud_reason: string;
}

export type AdminRedemptionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<RedemptionDto>
>;
export type AdminRedemptionDetailsResponseDto = ApiSuccessResponse<{
  redemption: RedemptionDto;
  qr_history?: QrHistoryEventDto[];
  cash_payment?: PaymentDto | null;
  timeline?: RedemptionEventDto[];
}>;
export type AdminRedemptionTimelineResponseDto = ApiSuccessResponse<{
  items: RedemptionEventDto[];
}>;
export type AdminFraudBlockRedemptionResponseDto = ApiSuccessResponse<{
  redemption: RedemptionDto;
}>;

/* =========================================================
   Subscription plans
   ========================================================= */

export interface AdminSubscriptionPlansQueryDto extends BaseListQueryDto {
  is_active?: boolean;
}

export interface AdminCreateSubscriptionPlanDto {
  slug: string;
  name: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  currency: CurrencyCode;
  max_products?: number;
  max_employees?: number;
  max_branches?: number;
  features?: string[];
  grace_period_days: number;
  degraded_period_days: number;
  is_active?: boolean;
  sort_order?: number;
}

export interface AdminUpdateSubscriptionPlanDto {
  name?: string;
  description?: string;
  price_monthly?: number;
  price_yearly?: number;
  currency?: CurrencyCode;
  max_products?: number;
  max_employees?: number;
  max_branches?: number;
  features?: string[];
  grace_period_days?: number;
  degraded_period_days?: number;
  is_active?: boolean;
  sort_order?: number;
}

export type AdminSubscriptionPlansListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<SubscriptionPlanDto>
>;
export type AdminCreateSubscriptionPlanResponseDto = ApiSuccessResponse<{
  subscription_plan: SubscriptionPlanDto;
}>;
export type AdminUpdateSubscriptionPlanResponseDto = ApiSuccessResponse<{
  subscription_plan: SubscriptionPlanDto;
}>;
export type AdminDeleteSubscriptionPlanResponseDto = ApiSuccessResponse<{
  deleted_or_deactivated: true;
}>;

/* =========================================================
   Billing profiles
   ========================================================= */

export interface AdminBillingProfilesQueryDto extends BaseListQueryDto {
  store_id?: UUID;
  billing_model?: BillingModel;
}

export interface AdminUpdateStoreBillingProfileDto {
  billing_model: BillingModel;
  commission_rate?: number;
  plan_id?: UUID;
  manual_invoice_enabled?: boolean;
  effective_from?: ISODateTime;
  effective_to?: ISODateTime;
  notes?: string;
}

export type AdminBillingProfilesListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<BillingProfileDto>
>;
export type AdminUpdateStoreBillingProfileResponseDto = ApiSuccessResponse<{
  billing_profile: BillingProfileDto;
}>;

/* =========================================================
   Subscriptions
   ========================================================= */

export interface AdminSubscriptionsQueryDto extends BaseListQueryDto {
  store_id?: UUID;
  status?: string;
  plan_id?: UUID;
}

export interface AdminUpdateSubscriptionDto {
  status?: string;
  billing_cycle?: BillingCycle;
  collection_method?: CollectionMethod;
  current_period_start?: ISODateTime;
  current_period_end?: ISODateTime;
  trial_start?: ISODateTime;
  trial_end?: ISODateTime;
  cancel_at_period_end?: boolean;
  cancelled_at?: ISODateTime;
}

export type AdminSubscriptionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<SubscriptionDto>
>;
export type AdminUpdateSubscriptionResponseDto = ApiSuccessResponse<{
  subscription: SubscriptionDto;
}>;

/* =========================================================
   Invoices
   ========================================================= */

export interface AdminInvoicesQueryDto
  extends BaseListQueryDto, DateRangeQueryDto {
  store_id?: UUID;
  status?: InvoiceStatus;
}

export interface AdminIssueInvoiceDto {
  due_date?: ISODate;
}

export interface AdminMarkInvoicePaidDto {
  paid_at?: ISODateTime;
  note?: string;
}

export interface AdminVoidInvoiceDto {
  reason?: string;
}

export type AdminInvoicesListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<InvoiceDto>
>;
export type AdminInvoiceDetailsResponseDto = ApiSuccessResponse<{
  invoice: InvoiceDto;
  subscription?: SubscriptionDto | null;
  store?: StoreDto | null;
}>;
export type AdminIssueInvoiceResponseDto = ApiSuccessResponse<{
  invoice: InvoiceDto;
}>;
export type AdminMarkInvoicePaidResponseDto = ApiSuccessResponse<{
  invoice: InvoiceDto;
}>;
export type AdminVoidInvoiceResponseDto = ApiSuccessResponse<{
  invoice: InvoiceDto;
}>;

/* =========================================================
   Commissions
   ========================================================= */

export interface AdminCommissionsQueryDto
  extends BaseListQueryDto, DateRangeQueryDto {
  store_id?: UUID;
  status?: CommissionStatus;
}

export interface AdminCommissionNoteDto {
  note?: string;
}

export type AdminCommissionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<CommissionDto>
>;
export type AdminMarkCommissionInvoicedResponseDto = ApiSuccessResponse<{
  commission: CommissionDto;
}>;
export type AdminMarkCommissionPaidResponseDto = ApiSuccessResponse<{
  commission: CommissionDto;
}>;
export type AdminWaiveCommissionResponseDto = ApiSuccessResponse<{
  commission: CommissionDto;
}>;

/* =========================================================
   Notifications
   ========================================================= */



export interface AdminBroadcastNotificationDto {
  title: string;
  message: string;
  channels: string[];
  target_roles: string[];
  target_user_ids: string[];
}

export type AdminBroadcastNotificationResponseDto = ApiSuccessResponse<{
  queued: true;
}>;

/* =========================================================
   Contact / support
   ========================================================= */

export interface AdminCustomerTicketsQueryDto extends BaseListQueryDto {
  status?: CustomerTicketStatus;
}

export interface AdminUpdateCustomerTicketDto {
  status: CustomerTicketStatus;
}

export interface AdminSellerLeadsQueryDto extends BaseListQueryDto {
  status?: SellerLeadStatus;
}

export interface AdminUpdateSellerLeadDto {
  status: SellerLeadStatus;
}

export type AdminCustomerTicketsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<CustomerTicketDto>
>;
export type AdminUpdateCustomerTicketResponseDto = ApiSuccessResponse<{
  customer_ticket: CustomerTicketDto;
}>;
export type AdminSellerLeadsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<SellerLeadDto>
>;
export type AdminUpdateSellerLeadResponseDto = ApiSuccessResponse<{
  seller_lead: SellerLeadDto;
}>;

/* =========================================================
   Notify me
   ========================================================= */

export type AdminNotifyMeQueryDto = BaseListQueryDto;

export type AdminNotifyMeListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<NotifyMeDto>
>;

/* =========================================================
   Audit logs
   ========================================================= */

/**
 * AdminAuditLogsQueryDto
 */
export interface AdminAuditLogsQueryDto
  extends BaseListQueryDto,
    DateRangeQueryDto {
  causer_id?: UUID | string;
  subject_type?: string;
  event?: string;
}

export type AdminAuditLogsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<AuditLogDto>
>;

/* =========================================================
   Chatbot
   ========================================================= */

export interface AdminChatSessionsQueryDto extends BaseListQueryDto {
  user_id?: UUID;
  session_status?: string;
  source?: string;
}

export type AdminChatSessionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<ChatSessionDto>
>;
export type AdminChatSessionDetailsResponseDto = ApiSuccessResponse<{
  session: ChatSessionDto;
  messages: ChatMessageDto[];
}>;

/* =========================================================
   Recommendations
   ========================================================= */

export interface AdminRecommendationsQueryDto extends BaseListQueryDto {
  user_id?: UUID;
  target_type?: RecommendationTargetType;
  generated_by?: RecommendationGeneratedBy;
}

export interface AdminCreateRecommendationDto {
  user_id: UUID;
  target_type: RecommendationTargetType;
  target_id: UUID;
  score?: number;
  reason_code?: string;
  context?: JsonObject;
  generated_by?: RecommendationGeneratedBy;
  expires_at?: ISODateTime | string;
}

export type AdminRecommendationsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<RecommendationDto>
>;
export type AdminCreateRecommendationResponseDto = ApiSuccessResponse<{
  recommendation: RecommendationDto;
}>;

/* =========================================================
   Reserved V2
   ========================================================= */

export interface AdminPaymentsQueryDto extends BaseListQueryDto {
  status?: string;
  reference_type?: string;
  store_id?: UUID;
}

export interface AdminInventoryTransactionsQueryDto extends BaseListQueryDto {
  store_id?: UUID;
  branch_id?: UUID;
  product_id?: UUID;
  transaction_type?: string;
}

export type AdminPaymentsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<PaymentDto>
>;
export type AdminInventoryTransactionsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<InventoryTransactionDto>
>;
