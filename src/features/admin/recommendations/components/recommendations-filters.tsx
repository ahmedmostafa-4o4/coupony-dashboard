"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { RecommendationsListFilters } from "../types/recommendation.types";

const filterFields = [
  createSearchFilterField("Search", "Search recommendations by title or status"),
  createStatusFilterField(),
];

export function RecommendationsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: RecommendationsListFilters) => void;
  onReset: () => void;
  values: RecommendationsListFilters;
}) {
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
