import { cn } from "@/lib/utils/cn";
import type { CategoriesDictionary } from "../utils/get-dictionary";

export function CategoryStatusBadge({
  value,
  dict,
}: {
  value: "active" | "inactive";
  dict?: CategoriesDictionary["status"];
}) {
  const label = value === "active" ? (dict?.active ?? "Active") : (dict?.inactive ?? "Inactive");
  const toneClass = value === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClass
      )}
    >
      {label}
    </span>
  );
}
