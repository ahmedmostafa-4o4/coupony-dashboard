"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { format, parse } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";

import type {
  AdminFormErrors,
  AdminFormField,
  AdminFormSchema,
  AdminFormValues,
} from "@/features/admin/shared/types/admin-form.types";
import { hasErrors } from "@/features/admin/shared/utils/admin-form-schema";

function renderField<TValues extends AdminFormValues>({
  errors,
  field,
  onChange,
  values,
  lang,
}: {
  errors: AdminFormErrors<TValues>;
  field: AdminFormField<TValues>;
  onChange: (
    key: Extract<keyof TValues, string>,
    value: string | boolean | File | null,
  ) => void;
  values: TValues;
  lang?: string;
}) {
  const value = values[field.key];
  const error = errors[field.key];
  const locale = lang === "ar" ? ar : enUS;

  return (
    <div
      className={cn(
        "space-y-2",
        field.type === "checkbox-group" ? "md:col-span-2" : "",
      )}
      key={field.key}
    >
      <span className="text-sm font-medium text-slate-700">{field.label}</span>
      {field.description ? (
        <span className="block text-xs leading-5 text-slate-500">
          {field.description}
        </span>
      ) : null}
      {field.type === "textarea" ? (
        <Textarea
          className="min-h-28"
          placeholder={field.placeholder}
          rows={field.rows}
          value={String(value ?? "")}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
      ) : field.type === "select" ? (
        <Select
          value={String(value ?? "")}
          onValueChange={(val) => onChange(field.key, val)}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={field.placeholder ?? "Select an option"}
            />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.type === "checkbox" ? (
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700">
          <input
            checked={Boolean(value)}
            type="checkbox"
            onChange={(event) => onChange(field.key, event.target.checked)}
          />
          <span>{field.placeholder ?? field.label}</span>
        </label>
      ) : field.type === "file" ? (
        <label className="block cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-5 text-center transition hover:border-slate-400 hover:bg-slate-50">
          <input
            accept={field.accept}
            className="hidden"
            type="file"
            onChange={(event) =>
              onChange(field.key, event.target.files?.[0] ?? null)
            }
          />
          <span className="block text-sm font-medium text-slate-700">
            {value instanceof File
              ? value.name
              : (field.placeholder ?? "Choose a file")}
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            {value instanceof File
              ? "Click to replace the selected file."
              : "Click to browse and upload an icon."}
          </span>
        </label>
      ) : field.type === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className={cn(
                "w-full justify-start text-left font-normal bg-white h-10 border border-slate-200",
                !value && "text-slate-500",
              )}
            >
              <CalendarIcon
                className={cn("h-4 w-4", lang === "ar" ? "ml-2" : "mr-2")}
              />
              {value ? (
                format(parse(String(value), "yyyy-MM-dd", new Date()), "PP", {
                  locale,
                })
              ) : (
                <span>
                  {field.placeholder ??
                    (lang === "ar" ? "اختر تاريخ" : "Pick a date")}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                value
                  ? parse(String(value), "yyyy-MM-dd", new Date())
                  : undefined
              }
              onSelect={(date) => {
                onChange(field.key, date ? format(date, "yyyy-MM-dd") : "");
              }}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
              locale={locale}
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
          </PopoverContent>
        </Popover>
      ) : field.type === "checkbox-group" ? (
        <div className="max-h-[300px] overflow-y-auto px-1 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {field.options?.map((option) => {
              const isChecked =
                Array.isArray(value) && value.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex flex-row items-start gap-3 rounded-md border border-slate-200 p-4 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(value) ? value : [];
                      let newValues;
                      if (checked) {
                        newValues = [...currentValues, option.value];
                      } else {
                        newValues = currentValues.filter(
                          (v: string) => v !== option.value,
                        );
                      }
                      onChange(field.key, newValues as unknown as string);
                    }}
                  />
                  <div className="space-y-1 leading-none pt-0.5">
                    <span className="text-sm font-medium leading-none">
                      {option.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ) : (
        <Input
          placeholder={field.placeholder}
          type={field.type ?? "text"}
          value={String(value ?? "")}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
      )}
      {error ? (
        <p className="text-sm font-medium text-rose-600">{error}</p>
      ) : null}
    </div>
  );
}

export function AdminSchemaForm<
  TValues extends AdminFormValues,
  TPayload,
  TResult = unknown,
>({
  description,
  fields,
  initialValues,
  isSubmitting,
  onSubmit,
  schema,
  submitLabel,
  title,
}: {
  description: string;
  fields: AdminFormField<TValues>[];
  initialValues?: Partial<TValues>;
  isSubmitting?: boolean;
  onSubmit: (payload: TPayload) => Promise<TResult | undefined>;
  schema: AdminFormSchema<TValues, TPayload>;
  submitLabel: string;
  title: string;
}) {
  const params = useParams();
  const lang = params?.lang as string | undefined;

  const [values, setValues] = useState<TValues>({
    ...schema.defaultValues,
    ...(initialValues ?? {}),
  });
  const [errors, setErrors] = useState<AdminFormErrors<TValues>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function updateValue(
    key: Extract<keyof TValues, string>,
    value: string | boolean | File | null,
  ) {
    setValues(
      (currentValues) =>
        ({
          ...currentValues,
          [key]: value,
        }) as TValues,
    );
  }

  async function handleSubmit() {
    try {
      const nextErrors = schema.validate(values);
      setErrors(nextErrors);

      if (hasErrors(nextErrors)) {
        return;
      }

      setFormError(null);
      await onSubmit(schema.transform(values));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to submit this form.",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) =>
            renderField({
              errors,
              field,
              onChange: updateValue,
              values,
              lang,
            }),
          )}
        </div>
        {formError ? (
          <p className="text-sm font-medium text-rose-600">{formError}</p>
        ) : null}
        <div className="flex justify-end">
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? "Working..." : submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
