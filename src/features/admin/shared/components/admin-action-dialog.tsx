"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

function DialogField<TValues extends AdminFormValues>({
  errors,
  field,
  onChange,
  values,
}: {
  errors: AdminFormErrors<TValues>;
  field: AdminFormField<TValues>;
  onChange: (key: Extract<keyof TValues, string>, value: string | boolean) => void;
  values: TValues;
}) {
  const value = values[field.key];
  const error = errors[field.key];

  return (
    <label className="space-y-2" key={field.key}>
      <span className="text-sm font-medium text-slate-700">{field.label}</span>
      {field.type === "textarea" ? (
        <Textarea
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

export function AdminActionDialog<
  TValues extends AdminFormValues,
  TPayload,
  TResult = unknown,
>({
  confirmLabel = "Confirm",
  description,
  fields,
  initialValues,
  isPending,
  onSubmit,
  schema,
  title,
  triggerLabel,
  variant = "danger",
}: {
  confirmLabel?: string;
  description: string;
  fields: AdminFormField<TValues>[];
  initialValues?: Partial<TValues>;
  isPending?: boolean;
  onSubmit: (payload: TPayload) => Promise<TResult | undefined>;
  schema: AdminFormSchema<TValues, TPayload>;
  title: string;
  triggerLabel: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<TValues>({
    ...schema.defaultValues,
    ...(initialValues ?? {}),
  });
  const [errors, setErrors] = useState<AdminFormErrors<TValues>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function updateValue(
    key: Extract<keyof TValues, string>,
    value: string | boolean
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }) as TValues);
  }

  function openDialog() {
    setValues({
      ...schema.defaultValues,
      ...(initialValues ?? {}),
    });
    setErrors({});
    setFormError(null);
    setIsOpen(true);
  }

  async function handleConfirm() {
    try {
      const nextErrors = schema.validate(values);
      setErrors(nextErrors);

      if (hasErrors(nextErrors)) {
        return;
      }

      setFormError(null);
      const result = await onSubmit(schema.transform(values));

      if (result !== undefined) {
        setIsOpen(false);
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to submit this action."
      );
    }
  }

  return (
    <>
      <Button variant={variant} onClick={openDialog}>
        {triggerLabel}
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div>
                <CardTitle>{title}</CardTitle>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field) => (
                <DialogField
                  errors={errors}
                  field={field}
                  key={field.key}
                  onChange={updateValue}
                  values={values}
                />
              ))}
              {formError ? (
                <p className="text-sm font-medium text-rose-600">{formError}</p>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button disabled={isPending} variant={variant} onClick={handleConfirm}>
                {isPending ? "Working..." : confirmLabel}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
}
