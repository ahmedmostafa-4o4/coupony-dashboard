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
  values: (string | { label: string; value: string })[] = ["all", "active", "pending", "suspended", "archived"]
): AdminFilterField {
  return {
    key: "status",
    label,
    type: "select",
    options: values.map((value) => {
      if (typeof value === "string") {
        return {
          label: value === "all" ? "All statuses" : value,
          value,
        };
      }
      return value;
    }),
  };
}

export function createRoleFilterField(
  label = "Role",
  values: { label: string; value: string }[] = [
    { label: "All roles", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Seller", value: "seller" },
    { label: "Customer", value: "customer" },
    { label: "Pending Seller", value: "seller_pending" },
  ]
): AdminFilterField {
  return {
    key: "role",
    label,
    type: "select",
    options: values,
  };
}

export function createDateRangeFilterField(
  label = "Date Range",
  keyFrom = "from_date",
  keyTo = "to_date"
): AdminFilterField {
  return {
    key: keyFrom,
    keySecondary: keyTo,
    label,
    type: "daterange",
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
