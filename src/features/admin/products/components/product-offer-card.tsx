import { humanizeKey } from "@/features/admin/shared/utils/admin-formatters";
import type { ProductsDictionary } from "../utils/get-dictionary";

function summarizeValue(value: unknown, yesLabel = "Yes", noLabel = "No") {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`;
  }

  if (typeof value === "object") {
    return `${Object.keys(value as Record<string, unknown>).length} fields`;
  }

  if (typeof value === "boolean") {
    return value ? yesLabel : noLabel;
  }

  return String(value);
}

export function ProductOfferCard({
  offer,
  dict,
  rejectDict,
}: {
  offer?: Record<string, unknown> | null;
  dict: ProductsDictionary["revisionPayload"];
  rejectDict?: ProductsDictionary["rejectDialog"];
}) {
  if (!offer) {
    return <p className="text-sm text-slate-500">{dict.noOffer}</p>;
  }

  const entries = Object.entries(offer);

  if (!entries.length) {
    return <p className="text-sm text-slate-500">{dict.noOffer}</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {entries.map(([key, value]) => {
        const translatedLabel = rejectDict?.fields[key as keyof typeof rejectDict.fields] || humanizeKey(key);
        return (
          <div
            key={key}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {translatedLabel}
            </p>
            <p className="mt-2 text-sm text-slate-700">{summarizeValue(value, dict.yes, dict.no)}</p>
          </div>
        );
      })}
    </div>
  );
}

