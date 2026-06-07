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

export function CancelOfferClaimDialog({
  title,
  description,
  confirmLabel = "Confirm",
  isPending,
  onConfirm,
  triggerLabel,
  reasonLabel = "Cancellation Reason",
  reasonPlaceholder = "Enter reason...",
  variant = "danger",
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  isPending?: boolean;
  onConfirm: (reason: string) => Promise<void> | void;
  triggerLabel: string;
  reasonLabel?: string;
  reasonPlaceholder?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  async function handleConfirm() {
    if (!reason.trim()) return;
    await onConfirm(reason);
    setIsOpen(false);
    setReason("");
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
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">{reasonLabel}</label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={reasonPlaceholder}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" onClick={() => { setIsOpen(false); setReason(""); }}>
                Close
              </Button>
              <Button disabled={isPending || !reason.trim()} variant="danger" onClick={handleConfirm}>
                {isPending ? "Working..." : confirmLabel}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
}
