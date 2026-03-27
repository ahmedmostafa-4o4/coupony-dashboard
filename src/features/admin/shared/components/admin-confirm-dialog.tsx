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

export function AdminConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  variant = "danger",
  isPending,
  onConfirm,
  triggerLabel,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isPending?: boolean;
  onConfirm: () => Promise<void> | void;
  triggerLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleConfirm() {
    await onConfirm();
    setIsOpen(false);
  }

  return (
    <>
      <Button variant={variant} onClick={() => setIsOpen(true)}>
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
            <CardContent className="text-sm text-slate-500">
              This action calls the mapped admin endpoint immediately.
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
