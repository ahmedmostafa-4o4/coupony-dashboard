"use client";
import { useEffect, useState } from "react";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField, createDateRangeFilterField } from "@/features/admin/shared";

import type { AdminFilterField } from "@/features/admin/shared/types/admin-common.types";
import type { StoresListFilters } from "../types/store.types";
import type { StoresDictionary } from "../utils/get-dictionary";
import { getSubscriptionPlans } from "../../billing/subscription-plans/api/get-subscription-plans";

export function StoresFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: StoresListFilters) => void;
  onReset: () => void;
  values: StoresListFilters;
  dict: StoresDictionary["filters"];
}) {
  const [subscriptionOptions, setSubscriptionOptions] = useState([
    { label: dict.subscriptionOptions.all, value: "all" },
  ]);

  useEffect(() => {
    getSubscriptionPlans({ perPage: 100 })
      .then((res) => {
        if (res.items) {
          setSubscriptionOptions([
            { label: dict.subscriptionOptions.all, value: "all" },
            ...res.items.map((plan) => ({
              label: plan.name,
              value: plan.slug,
            })),
          ]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch subscription plans for filter", error);
      });
  }, []);

  const filterFields: AdminFilterField[] = [
    createSearchFilterField(dict.searchPlaceholder, dict.searchPlaceholder),
    createStatusFilterField(dict.statusPlaceholder, [
      { label: dict.statusOptions.all, value: "all" },
      { label: dict.statusOptions.active, value: "active" },
      { label: dict.statusOptions.inactive, value: "inactive" },
      { label: dict.statusOptions.suspended, value: "suspended" },
    ]),
    {
      key: "isVerified",
      label: dict.verificationPlaceholder,
      type: "select" as const,
      options: [
        { label: dict.verificationOptions.all, value: "all" },
        { label: dict.verificationOptions.verified, value: "true" },
        { label: dict.verificationOptions.unverified, value: "false" },
      ]
    },
    {
      key: "subscriptionTier",
      label: dict.subscriptionPlaceholder,
      type: "select" as const,
      options: subscriptionOptions,
    },
    createDateRangeFilterField(dict.registrationDate, "fromDate", "toDate"),
  ];

  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
