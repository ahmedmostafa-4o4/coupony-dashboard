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
  StoreDto,
  StoreVerificationDto,
  UserDto,
} from "./stores.dto";

export type StoreOwner = Camelized<UserDto>;
export type StoreBillingProfile = Camelized<BillingProfileDto>;
export type StoreVerificationRecord = Camelized<StoreVerificationDto>;
export type Store = Camelized<StoreDto> & {
  owner?: StoreOwner;
  ownerName?: string;
  billingProfile?: StoreBillingProfile | null;
  verifications?: StoreVerificationRecord[];
  followersCount?: number;
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
