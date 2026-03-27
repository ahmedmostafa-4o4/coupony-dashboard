import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminApproveStoreVerificationDto,
  AdminRejectStoreVerificationDto,
  AdminStoreVerificationsQueryDto,
  StoreDto,
  StoreVerificationDto,
} from "./store-verifications.dto";

export type VerificationStore = Camelized<StoreDto>;
export type StoreVerification = Camelized<StoreVerificationDto> & {
  store?: VerificationStore;
};

export type StoreVerificationsListFilters = Camelized<AdminStoreVerificationsQueryDto> & {
  search?: string;
};
export type StoreVerificationsListResult = AdminListResult<StoreVerification>;
export type StoreVerificationDetailsResult = AdminItemResult<StoreVerification>;
export type ApproveStoreVerificationRequest = AdminApproveStoreVerificationDto;
export type RejectStoreVerificationRequest = AdminRejectStoreVerificationDto;
