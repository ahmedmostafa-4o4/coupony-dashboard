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

import type { StoresDictionary } from "../utils/get-dictionary";

interface StoreVerificationRejectDialogProps {
  isPending: boolean;
  onReject: (reason: string) => Promise<boolean>;
  disabled?: boolean;
  dict: StoresDictionary["details"]["verifications"];
}

export function StoreVerificationRejectDialog({
  isPending,
  onReject,
  disabled,
  dict,
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
          {dict.reject}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.rejectDialog.title}</DialogTitle>
          <DialogDescription>
            {dict.rejectDialog.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {dict.rejectDialog.reason} <span className="text-rose-500">*</span>
            </label>
            <Textarea
              id="reason"
              placeholder={dict.rejectDialog.reasonPlaceholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
            {dict.rejectDialog.cancel}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!reason.trim() || isPending}
            variant="danger"
          >
            {isPending ? dict.rejectDialog.rejecting : dict.rejectDialog.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
