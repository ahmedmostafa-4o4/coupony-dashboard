import { cn } from "@/lib/utils/cn";
import type { Banner } from "../types/banner.types";
import type { BannersDictionary } from "../utils/get-dictionary";

const toneClasses: Record<Banner["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

export function BannerStatusBadge({
  value,
  dict,
}: {
  value: Banner["status"];
  dict: BannersDictionary;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[value] || "bg-slate-100 text-slate-600"
      )}
    >
      {dict.status[value] || value}
    </span>
  );
}
