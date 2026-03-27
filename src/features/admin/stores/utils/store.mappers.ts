import type { Camelized } from "@/types";

import type {
  AdminStoreDetailsResponseDto,
  StoreRecordDto,
} from "../types/stores.dto";
import type { Store } from "../types/store.types";

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function formatOwnerName(item: Camelized<StoreRecordDto>) {
  if (item.owner?.fullName) {
    return item.owner.fullName;
  }

  const firstName = item.owner?.profile?.firstName?.trim() ?? "";
  const lastName = item.owner?.profile?.lastName?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || item.owner?.email || undefined;
}

function formatPrimaryAddress(item: Camelized<StoreRecordDto>) {
  const primaryAddress =
    item.addresses?.find((address) => address.isDefaultBilling) ??
    item.addresses?.find((address) => address.isDefaultShipping) ??
    item.addresses?.[0];

  if (!primaryAddress) {
    return undefined;
  }

  return [
    primaryAddress.addressLine1,
    primaryAddress.city,
    primaryAddress.stateProvince,
    primaryAddress.countryCode,
  ]
    .filter(Boolean)
    .join(", ");
}

function formatRatingLabel(item: Camelized<StoreRecordDto>) {
  if (item.ratingAvg === undefined || item.ratingAvg === null) {
    return undefined;
  }

  const ratingValue = String(item.ratingAvg);
  const ratingCount =
    typeof item.ratingCount === "number" ? item.ratingCount : undefined;

  return ratingCount !== undefined
    ? `${ratingValue} (${ratingCount} ratings)`
    : ratingValue;
}

function formatVerificationSummary(item: Camelized<StoreRecordDto>) {
  if (!item.verifications?.length) {
    return undefined;
  }

  const counts = item.verifications.reduce(
    (summary, verification) => {
      const key = verification.status ?? "unknown";
      summary[key] = (summary[key] ?? 0) + 1;
      return summary;
    },
    {} as Record<string, number>
  );

  return Object.entries(counts)
    .map(([status, count]) => `${count} ${status}`)
    .join(", ");
}

function formatHoursSummary(item: Camelized<StoreRecordDto>) {
  return (
    item.hours?.map((entry) => {
      const dayLabel = DAY_LABELS[entry.dayOfWeek] ?? `Day ${entry.dayOfWeek}`;
      const isClosed = entry.isClosed === true || entry.isClosed === 1;

      return isClosed
        ? `${dayLabel}: Closed`
        : `${dayLabel}: ${entry.openTime ?? "--"} - ${entry.closeTime ?? "--"}`;
    }) ?? []
  );
}

function mapVerificationDocumentUrl(
  item: Camelized<StoreRecordDto>
): Store["verifications"] {
  return item.verifications?.map((verification) => ({
    ...verification,
    documentUrl: verification.documentUrl ?? verification.documentPath ?? null,
  }));
}

export function mapStore(item: Camelized<StoreRecordDto>): Store {
  return {
    ...item,
    categoryNames: item.categories?.map((category) => category.name) ?? [],
    hoursSummary: formatHoursSummary(item),
    ownerName: formatOwnerName(item),
    primaryAddressLine: formatPrimaryAddress(item),
    ratingLabel: formatRatingLabel(item),
    verificationSummary: formatVerificationSummary(item),
    verifications: mapVerificationDocumentUrl(item),
  };
}

export function mapStoreDetails(
  data: Camelized<AdminStoreDetailsResponseDto["data"]>
): Store {
  return {
    ...mapStore(data),
    billingProfile: null,
    followersCount: undefined,
  };
}
