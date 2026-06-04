import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminApproveStoreDto,
  AdminCloseStoreDto,
  AdminRejectStoreDto,
  AdminStoresQueryDto,
  AdminSuspendStoreDto,
  AdminUpdateStoreBillingProfileDto,
  AdminUpdateStoreDto,
  BillingProfileDto,
  StoreAddressDto,
  StoreCategorySummaryDto,
  StoreHoursDto,
  StoreOwnerDto,
  StoreRecordDto,
  StoreVerificationRecordDto,
  StorePointsDto,
  StoreSubscriptionDto,
  StoreReviewDto,
} from "./stores.dto";

export type StoreOwner = Camelized<StoreOwnerDto>;
export type StoreBillingProfile = Camelized<BillingProfileDto>;
export type StoreVerificationRecord = Camelized<StoreVerificationRecordDto>;
export type StoreAddress = Camelized<StoreAddressDto>;
export type StoreCategorySummary = Camelized<StoreCategorySummaryDto>;
export type StoreHours = Camelized<StoreHoursDto>;
export type StorePoints = Camelized<StorePointsDto>;
export type StoreSubscription = Camelized<StoreSubscriptionDto>;
export type StoreReview = Camelized<StoreReviewDto>;
export type Store = Camelized<StoreRecordDto> & {
  addresses?: StoreAddress[];
  categories?: StoreCategorySummary[];
  hours?: StoreHours[];
  owner?: StoreOwner | null;
  ownerName?: string;
  billingProfile?: StoreBillingProfile | null;
  categoryNames?: string[];
  hoursSummary?: string[];
  primaryAddressLine?: string;
  ratingLabel?: string;
  verificationSummary?: string;
  verifications?: StoreVerificationRecord[];
  followersCount?: number;
  points?: StorePoints | null;
  subscription?: StoreSubscription | null;
};

export type StoresListFilters = Camelized<AdminStoresQueryDto> & {
  search?: string;
};
export type StoresListResult = AdminListResult<Store>;
export type StoreDetailsResult = AdminItemResult<Store>;
export type UpdateStoreRequest = AdminUpdateStoreDto;
export type ApproveStoreRequest = AdminApproveStoreDto;
export type RejectStoreRequest = AdminRejectStoreDto;
export type SuspendStoreRequest = AdminSuspendStoreDto;
export type CloseStoreRequest = AdminCloseStoreDto;
export type UpdateStoreBillingProfileRequest = AdminUpdateStoreBillingProfileDto;
