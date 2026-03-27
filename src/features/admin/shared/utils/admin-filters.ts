import type {
  AdminFilterField,
  AdminFilterValues,
} from "@/features/admin/shared/types/admin-common.types";

export function createSearchFilterField(
  label = "Search",
  placeholder = "Search by keyword"
): AdminFilterField {
  return {
    key: "search",
    label,
    type: "search",
    placeholder,
  };
}

export function createStatusFilterField(
  label = "Status",
  values: string[] = ["all", "active", "pending", "suspended", "archived"]
): AdminFilterField {
  return {
    key: "status",
    label,
    type: "select",
    options: values.map((value) => ({
      label: value === "all" ? "All statuses" : value,
      value,
    })),
  };
}

export function toAdminQuery(filters: AdminFilterValues) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all"
    )
  );
}
