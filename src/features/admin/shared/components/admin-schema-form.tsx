"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
}: {
  errors: AdminFormErrors<TValues>;
  field: AdminFormField<TValues>;
  onChange: (
    key: Extract<keyof TValues, string>,
    value: string | boolean | File | null
  ) => void;
  values: TValues;
}) {
  const value = values[field.key];
  const error = errors[field.key];

  return (
    <label className="space-y-2" key={field.key}>
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
          onChange={(event) => onChange(field.key, event.target.value)}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
            {value instanceof File ? value.name : field.placeholder ?? "Choose a file"}
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            {value instanceof File
              ? "Click to replace the selected file."
              : "Click to browse and upload an icon."}
          </span>
        </label>
      ) : (
        <Input
          placeholder={field.placeholder}
          type={field.type ?? "text"}
          value={String(value ?? "")}
          onChange={(event) => onChange(field.key, event.target.value)}
        />
      )}
      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
    </label>
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
  const [values, setValues] = useState<TValues>({
    ...schema.defaultValues,
    ...(initialValues ?? {}),
  });
  const [errors, setErrors] = useState<AdminFormErrors<TValues>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function updateValue(
    key: Extract<keyof TValues, string>,
    value: string | boolean | File | null
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }) as TValues);
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
        error instanceof Error ? error.message : "Unable to submit this form."
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
            })
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
