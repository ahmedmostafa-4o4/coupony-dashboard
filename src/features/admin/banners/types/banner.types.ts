import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminApproveBannerDto,
  AdminRejectBannerDto,
  AdminBannersQueryDto,
  AdminUpdateBannerDto,
  BannerDto,
} from "./banner.dto";

export type Banner = Camelized<BannerDto>;

export type BannersListFilters = Camelized<AdminBannersQueryDto>;
export type BannersListResult = AdminListResult<Banner>;
export type BannerDetailsResult = AdminItemResult<Banner>;
export type ApproveBannerRequest = AdminApproveBannerDto;
export type RejectBannerRequest = AdminRejectBannerDto;
export type UpdateBannerRequest = AdminUpdateBannerDto;
