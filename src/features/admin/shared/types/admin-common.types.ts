import type { ReactNode } from "react";

export type AdminStatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface AdminColumn<TData> {
  id: string;
  header: string;
  accessorKey?: keyof TData | string;
  cell?: (item: TData) => ReactNode;
  className?: string;
}

export interface AdminFilterOption {
  label: string;
  value: string;
}

export interface AdminFilterField {
  key: string;
  label: string;
  type?: "search" | "text" | "select";
  placeholder?: string;
  options?: AdminFilterOption[];
}

export type AdminFilterValue = string | number | boolean | undefined;

export type AdminFilterValues = Record<string, AdminFilterValue>;

export interface AdminCollectionState<TData> {
  items: TData[];
  total: number;
  meta?: Record<string, unknown>;
  raw: unknown;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export interface AdminResourceState<TData> {
  item: TData | null;
  raw: unknown;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export interface AdminNavigationItem {
  key: string;
  label: string;
  description: string;
  href: (lang: string) => string;
}

export interface AdminNavigationGroup {
  title: string;
  items: AdminNavigationItem[];
}

export interface AdminPageStat {
  label: string;
  value: string | number;
  hint?: string;
}

export interface AdminActionState<TInput, TResult> {
  error: string | null;
  isSubmitting: boolean;
  lastResult: TResult | null;
  submit: (input: TInput) => Promise<TResult | undefined>;
}
