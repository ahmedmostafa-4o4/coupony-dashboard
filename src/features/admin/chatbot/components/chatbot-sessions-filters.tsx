"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { ChatbotSessionsListFilters } from "../types/chatbot-session.types";

const filterFields = [
  createSearchFilterField("Search", "Search chatbot sessions by user or session ID"),
  createStatusFilterField(),
];

export function ChatbotSessionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: ChatbotSessionsListFilters) => void;
  onReset: () => void;
  values: ChatbotSessionsListFilters;
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
