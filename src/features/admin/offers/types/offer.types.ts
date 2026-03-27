import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminApproveOfferDto,
  AdminArchiveOfferDto,
  AdminOffersQueryDto,
  AdminPublishOfferDto,
  AdminRejectOfferDto,
  OfferDto,
  StoreDto,
} from "./offers.dto";

export type OfferStore = Camelized<StoreDto>;
export type Offer = Camelized<OfferDto> & {
  store?: OfferStore | null;
};

export type OffersListFilters = Camelized<AdminOffersQueryDto> & {
  search?: string;
};
export type OffersListResult = AdminListResult<Offer>;
export type OfferDetailsResult = AdminItemResult<Offer>;
export type ApproveOfferRequest = AdminApproveOfferDto;
export type RejectOfferRequest = AdminRejectOfferDto;
export type PublishOfferRequest = AdminPublishOfferDto;
export type ArchiveOfferRequest = AdminArchiveOfferDto;
