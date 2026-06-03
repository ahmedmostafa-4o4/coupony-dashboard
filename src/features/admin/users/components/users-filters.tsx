"use client";

import { useMemo } from "react";
import { 
  AdminFilterBar, 
  createSearchFilterField, 
  createStatusFilterField, 
  createRoleFilterField, 
  createDateRangeFilterField,
  humanizeKey
} from "@/features/admin/shared";
import { useRolesList } from "@/features/admin/roles/hooks/use-roles-list";

import type { UsersListFilters } from "../types/user.types";
import type { UsersDictionary } from "../utils/get-dictionary";

export function UsersFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: UsersListFilters) => void;
  onReset: () => void;
  values: UsersListFilters;
  dict: UsersDictionary["filters"];
}) {
  const rolesState = useRolesList({});

  const filterFields = useMemo(() => {
    const roleOptions = [
      { label: dict.allRoles, value: "all" },
      ...rolesState.items.map(role => ({ 
        label: humanizeKey(role.name || ""), 
        value: role.name || "" 
      }))
    ];

    return [
      createSearchFilterField(dict.search, dict.searchPlaceholder),
      createRoleFilterField(dict.role, roleOptions),
      createStatusFilterField(dict.status, [
        { label: dict.statusOptions.all, value: "all" },
        { label: dict.statusOptions.active, value: "active" },
        { label: dict.statusOptions.suspended, value: "suspended" },
        { label: dict.statusOptions.deleted, value: "deleted" },
      ]),
      createDateRangeFilterField(dict.signUpDate, "fromDate", "toDate"),
    ];
  }, [rolesState.items, dict]);

  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
