import { format } from "date-fns";
import { 
  Tag, 
  Calendar, 
  Clock, 
  Percent, 
  DollarSign, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import type { ProductsDictionary } from "../utils/get-dictionary";


export function ProductOfferCard({
  offer,
  dict,
}: {
  offer?: Record<string, unknown> | null;
  dict: ProductsDictionary["revisionPayload"];
}) {
  if (!offer || Object.keys(offer).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
          <Tag className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-900">{dict.noOffer}</h3>
        <p className="mt-1 text-sm text-slate-500">This product does not have an active promotional offer.</p>
      </div>
    );
  }

  // Type coercions to easily access fields
  const type = offer.type as string | undefined;
  const status = offer.status as string | undefined;
  const label = offer.label as string | undefined;
  
  // Value fields
  const fixedAmount = offer.fixedAmount as string | number | undefined;
  const percentageValue = offer.percentageValue as string | number | undefined;
  const maxDiscount = offer.maxDiscount as string | number | undefined;
  const buyQty = offer.buyQty as number | undefined;
  const getQty = offer.getQty as number | undefined;

  // Dates & Duration
  const startsAt = offer.startsAt as string | undefined;
  const endsAt = offer.endsAt as string | undefined;
  const durationDays = offer.durationDays as number | undefined;
  const durationHours = offer.durationHours as number | undefined;
  const claimExpirationMinutes = offer.claimExpirationMinutes as number | undefined;
  const buyVariantSkus = offer.buyVariantSkus as string[] | undefined;
  const rewardVariantSkus = offer.rewardVariantSkus as string[] | undefined;

  // Flags
  const allowMixBuyVariants = offer.allowMixBuyVariants as boolean | undefined;
  const allowMixRewardVariants = offer.allowMixRewardVariants as boolean | undefined;

  // Status Color Logic
  const statusColor = 
    status === "active" ? "bg-emerald-100 text-emerald-800" :
    status === "scheduled" ? "bg-blue-100 text-blue-800" :
    status === "expired" ? "bg-slate-100 text-slate-800" :
    "bg-amber-100 text-amber-800";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header Section */}
      <div className="border-b border-slate-100 bg-slate-50/50 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{label || "Unnamed Offer"}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider border-indigo-200 text-indigo-700 bg-indigo-50">
                    {type?.replace(/_/g, " ")}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusColor}`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-3">
        {/* Value Callout Section */}
        <div className="col-span-1 lg:col-span-3">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-inner">
            <h4 className="text-sm font-medium text-indigo-100 uppercase tracking-wider mb-4">Offer Value</h4>
            
            {type === "percentage" && (
              <div className="flex items-end gap-4">
                <div className="flex items-center gap-2">
                  <Percent className="h-10 w-10 opacity-80" />
                  <span className="text-5xl font-extrabold tracking-tight">{percentageValue}% <span className="text-2xl font-semibold opacity-80">OFF</span></span>
                </div>
                {maxDiscount && (
                  <div className="mb-2 text-indigo-100 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Up to {maxDiscount} max discount
                  </div>
                )}
              </div>
            )}

            {type === "fixed" && (
              <div className="flex items-end gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-10 w-10 opacity-80" />
                  <span className="text-5xl font-extrabold tracking-tight">{fixedAmount} <span className="text-2xl font-semibold opacity-80">OFF</span></span>
                </div>
              </div>
            )}

            {type === "bogo" && (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 min-w-[120px]">
                  <ShoppingBag className="h-8 w-8 mb-2 opacity-80" />
                  <span className="text-sm font-medium text-indigo-100 uppercase tracking-wider">Buy</span>
                  <span className="text-3xl font-bold">{buyQty}</span>
                </div>
                <div className="text-2xl font-bold opacity-50">+</div>
                <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 min-w-[120px]">
                  <Tag className="h-8 w-8 mb-2 opacity-80" />
                  <span className="text-sm font-medium text-indigo-100 uppercase tracking-wider">Get</span>
                  <span className="text-3xl font-bold">{getQty}</span>
                </div>
              </div>
            )}

            {/* Fallback if type is weird */}
            {!["percentage", "fixed", "bogo"].includes(type || "") && (
              <div className="text-lg font-medium opacity-90">
                Custom Offer Configuration
              </div>
            )}
          </div>
        </div>

        {/* Schedule & Timing */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
            <Calendar className="mr-2 h-4 w-4" /> Schedule & Duration
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 mb-1">Starts At</p>
              <p className="text-sm font-semibold text-slate-900">
                {startsAt ? format(new Date(startsAt), "PPp") : "Immediately"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 mb-1">Ends At</p>
              <p className="text-sm font-semibold text-slate-900">
                {endsAt ? format(new Date(endsAt), "PPp") : "No End Date"}
              </p>
            </div>
            {(durationDays || durationHours) ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Duration</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {durationDays ? `${durationDays} Days ` : ""}
                    {durationHours ? `${durationHours} Hours` : ""}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Rules & Constraints */}
        <div className="col-span-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" /> Rules & Constraints
          </h4>
          <div className="space-y-3">
            {type === "bogo" && (
              <>
                <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                  <span className="text-sm text-slate-600 font-medium">Mix Buy Variants</span>
                  {allowMixBuyVariants ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                  <span className="text-sm text-slate-600 font-medium">Mix Reward Variants</span>
                  {allowMixRewardVariants ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
              </>
            )}

            {claimExpirationMinutes ? (
              <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                <span className="text-sm text-slate-600 font-medium">Claim Expires In</span>
                <span className="text-sm font-bold text-slate-900">{claimExpirationMinutes} min</span>
              </div>
            ) : null}

            {(!claimExpirationMinutes && type !== "bogo") && (
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">No specific constraints.</p>
              </div>
            )}
            
            {buyVariantSkus && buyVariantSkus.length > 0 && (
              <div className="flex flex-col gap-1 rounded-lg border border-slate-100 p-3">
                <span className="text-sm text-slate-600 font-medium">Restricted Buy Variants (SKUs)</span>
                <span className="text-xs text-slate-900 bg-slate-100 rounded px-2 py-1 truncate">{buyVariantSkus.join(", ")}</span>
              </div>
            )}

            {rewardVariantSkus && rewardVariantSkus.length > 0 && (
              <div className="flex flex-col gap-1 rounded-lg border border-slate-100 p-3">
                <span className="text-sm text-slate-600 font-medium">Restricted Reward Variants (SKUs)</span>
                <span className="text-xs text-slate-900 bg-slate-100 rounded px-2 py-1 truncate">{rewardVariantSkus.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
