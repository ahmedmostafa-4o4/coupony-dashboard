import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { approvePaymentSession } from "../api/approve-payment";
import { failPaymentSession } from "../api/fail-payment";
import type { GlobalDictionary } from "@/messages/get-dictionary";

export function ApprovePaymentDialog({
  sessionId,
  open,
  onOpenChange,
  onSuccess,
  dict,
}: {
  sessionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  dict: GlobalDictionary;
}) {
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!method) {
      toast.error("Please select a payment method.");
      return;
    }
    try {
      setIsSubmitting(true);
      await approvePaymentSession(sessionId, method, notes);
      toast.success("Payment session approved successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to approve payment session");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.adminPayments.dialogs.approveTitle}</DialogTitle>
          <DialogDescription>
            {dict.adminPayments.dialogs.approveDesc}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{dict.adminPayments.dialogs.method}</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder={dict.adminPayments.dialogs.methodSelect} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">{dict.adminPayments.dialogs.bankTransfer}</SelectItem>
                <SelectItem value="Cash">{dict.adminPayments.dialogs.cash}</SelectItem>
                <SelectItem value="Other">{dict.adminPayments.dialogs.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{dict.adminPayments.dialogs.notes}</label>
            <Textarea
              placeholder={dict.adminPayments.dialogs.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            {dict.adminPayments.dialogs.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? dict.adminPayments.dialogs.approving : dict.adminPayments.dialogs.approvePayment}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FailPaymentDialog({
  sessionId,
  open,
  onOpenChange,
  onSuccess,
  dict,
}: {
  sessionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  dict: GlobalDictionary;
}) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await failPaymentSession(sessionId, reason);
      toast.success("Payment session marked as failed");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to fail payment session");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.adminPayments.dialogs.failTitle}</DialogTitle>
          <DialogDescription>
            {dict.adminPayments.dialogs.failDesc}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder={dict.adminPayments.dialogs.reasonPlaceholder}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            {dict.adminPayments.dialogs.cancel}
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? dict.adminPayments.dialogs.failing : dict.adminPayments.dialogs.failPayment}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
