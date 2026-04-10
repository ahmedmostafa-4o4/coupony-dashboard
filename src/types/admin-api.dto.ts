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
  slug?: string | null;
  description?: string | null;
  parent_id?: UUID | null;
  sort_order?: number;
  is_active?: boolean;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface StoreCategoryDto {
  id: UUID;
  name: string;
  slug?: string | null;
  sort_order?: number;
  is_active?: boolean;
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
  code: string;
  name: string;
  description?: string | null;
  billing_cycle: BillingCycle;
  price: number;
  currency?: CurrencyCode;
  max_stores?: number | null;
  max_branches_per_store?: number | null;
  max_staff_per_store?: number | null;
  max_active_offers?: number | null;
  is_active?: boolean;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
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
  trial_start?: ISODateTime | null;
  trial_end?: ISODateTime | null;
  cancel_at_period_end?: boolean;
  cancelled_at?: ISODateTime | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
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
  id: UUID;
  actor_user_id?: UUID | null;
  actor_staff_id?: UUID | null;
  entity_type?: string;
  entity_id?: UUID | string;
  action?: string;
  before?: JsonObject | null;
  after?: JsonObject | null;
  metadata?: JsonObject | null;
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
  status?: string;
  reference_type?: string | null;
  reference_id?: UUID | null;
  store_id?: UUID | null;
  amount?: number | null;
  currency?: CurrencyCode;
  paid_at?: ISODateTime | null;
  created_at?: ISODateTime;
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

/* =========================================================
   Dashboard
   ========================================================= */

export type AdminDashboardQueryDto = DateRangeQueryDto;

export interface AdminDashboardSummaryDto {
  users_count?: number;
  stores_count?: number;
  pending_stores_count?: number;
  pending_offers_count?: number;
  redemptions_count?: number;
  pending_commissions_count?: number;
  issued_invoices_count?: number;
  [key: string]: unknown;
}

export type AdminDashboardResponseDto = ApiSuccessResponse<{
  summary: AdminDashboardSummaryDto;
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
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  role_names?: string[];
  status?: UserStatus;
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
}

export interface AdminUpdateRoleDto {
  name?: string;
  guard_name?: string;
}

export interface AdminRolePermissionsUpdateDto {
  permission_ids: UUID[];
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
  name: string;
  slug?: string;
  description?: string;
  parent_id?: UUID;
  sort_order?: number;
  is_active?: boolean;
}

export interface AdminUpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  parent_id?: UUID;
  sort_order?: number;
  is_active?: boolean;
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
  name: string;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface AdminUpdateStoreCategoryDto {
  name?: string;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
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

export interface AdminStoresQueryDto extends BaseListQueryDto {
  q?: string;
  status?: StoreStatus;
  owner_user_id?: UUID;
  is_verified?: boolean;
  subscription_tier?: string;
}

export interface AdminUpdateStoreDto {
  name?: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  email?: string;
  phone?: string;
  tax_id?: string;
  commission_rate?: number;
  status?: StoreStatus;
  subscription_tier?: string;
  is_verified?: boolean;
  admin_notes?: string;
}

export interface AdminApproveStoreDto {
  admin_notes?: string;
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
   Store verifications
   ========================================================= */

export interface AdminStoreVerificationsQueryDto extends BaseListQueryDto {
  status?: VerificationStatus;
  store_id?: UUID;
  document_type?: string;
}

export type AdminApproveStoreVerificationDto = Record<string, never>;

export interface AdminRejectStoreVerificationDto {
  rejection_reason: string;
}

export type AdminStoreVerificationsListResponseDto = ApiSuccessResponse<
  PaginatedResultDto<StoreVerificationDto>
>;
export type AdminStoreVerificationDetailsResponseDto = ApiSuccessResponse<{
  store_verification: StoreVerificationDto;
  store: StoreDto;
}>;
export type AdminApproveStoreVerificationResponseDto = ApiSuccessResponse<{
  store_verification: StoreVerificationDto;
}>;
export type AdminRejectStoreVerificationResponseDto = ApiSuccessResponse<{
  store_verification: StoreVerificationDto;
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
  code: string;
  name: string;
  description?: string;
  billing_cycle: BillingCycle;
  price: number;
  currency?: CurrencyCode;
  max_stores?: number;
  max_branches_per_store?: number;
  max_staff_per_store?: number;
  max_active_offers?: number;
  is_active?: boolean;
}

export interface AdminUpdateSubscriptionPlanDto {
  name?: string;
  description?: string;
  billing_cycle?: BillingCycle;
  price?: number;
  currency?: CurrencyCode;
  max_stores?: number;
  max_branches_per_store?: number;
  max_staff_per_store?: number;
  max_active_offers?: number;
  is_active?: boolean;
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

export interface AdminBroadcastRecipientFilterDto {
  role?: string[];
  user_ids?: UUID[];
  store_ids?: UUID[];
}

export interface AdminBroadcastNotificationDto {
  title: string;
  message: string;
  type: string;
  channel: BroadcastChannel;
  recipient_filter: AdminBroadcastRecipientFilterDto;
  data?: JsonObject;
  reference_type?: string;
  reference_id?: UUID;
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

export interface AdminAuditLogsQueryDto
  extends BaseListQueryDto, DateRangeQueryDto {
  actor_user_id?: UUID;
  actor_staff_id?: UUID;
  entity_type?: string;
  entity_id?: UUID | string;
  action?: string;
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
