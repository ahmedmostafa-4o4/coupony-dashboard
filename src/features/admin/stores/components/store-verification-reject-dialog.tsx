"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface StoreVerificationRejectDialogProps {
  isPending: boolean;
  onReject: (reason: string) => Promise<boolean>;
  disabled?: boolean;
}

export function StoreVerificationRejectDialog({
  isPending,
  onReject,
  disabled,
}: StoreVerificationRejectDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    
    const success = await onReject(reason);
    if (success) {
      setReason("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          disabled={disabled}
        >
          <X className="mr-1 h-4 w-4" />
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Document</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this verification document. This will be sent to the store owner.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Rejection Reason <span className="text-rose-500">*</span>
            </label>
            <Textarea
              id="reason"
              placeholder="e.g. The document is blurry and unreadable..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!reason.trim() || isPending}
            variant="danger"
          >
            {isPending ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
