"use client";

import type { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AdminFilterField,
  AdminFilterValues,
} from "@/features/admin/shared/types/admin-common.types";
import { AdminDateRangePicker } from "./admin-date-range-picker";

export function AdminFilterBar<TFilters extends AdminFilterValues>({
  fields,
  onChange,
  onReset,
  onSubmit,
  submitLabel = "Apply filters",
  values,
}: {
  fields: AdminFilterField[];
  onChange: (nextValues: TFilters) => void;
  onReset?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  values: TFilters;
}) {
  function handleFieldChange(
    field: AdminFilterField,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    onChange({
      ...values,
      [field.key]: event.target.value,
    } as TFilters);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm font-medium text-slate-600">{field.label}</span>
            {field.type === "select" ? (
              <Select
                value={String(values[field.key] ?? "")}
                onValueChange={(val) =>
                  onChange({
                    ...values,
                    [field.key]: val,
                  } as TFilters)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder ?? "Select an option"} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "daterange" ? (
              <AdminDateRangePicker
                fromValue={String(values[field.key] ?? "")}
                toValue={String(values[field.keySecondary!] ?? "")}
                onFromChange={(value) =>
                  onChange({
                    ...values,
                    [field.key]: value,
                  } as TFilters)
                }
                onToChange={(value) =>
                  onChange({
                    ...values,
                    [field.keySecondary!]: value,
                  } as TFilters)
                }
              />
            ) : (
              <Input
                type={field.type === "search" ? "search" : "text"}
                placeholder={field.placeholder}
                value={String(values[field.key] ?? "")}
                onChange={(event) => handleFieldChange(field, event)}
              />
            )}
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        {onReset ? (
          <Button variant="ghost" onClick={onReset}>
            Reset
          </Button>
        ) : null}
        {onSubmit ? <Button onClick={onSubmit}>{submitLabel}</Button> : null}
      </div>
    </div>
  );
}
