import { useState, useEffect } from "react";
import type { GlobalDictionary } from "@/messages/get-dictionary";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { suspendSubscription } from "../api/suspend-subscription";
import { cancelSubscription } from "../api/cancel-subscription";
import { assignSubscription } from "../api/assign-subscription";
import { getSubscriptionPlans } from "@/features/admin/billing/subscription-plans/api/get-subscription-plans";
export function SuspendSubscriptionDialog({
  subscriptionId,
  open,
  onOpenChange,
  onSuccess,
  dict,
}: {
  subscriptionId: string;
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
      await suspendSubscription(subscriptionId, reason);
      toast.success("Subscription suspended successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to suspend subscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.adminSubscriptions.dialogs?.suspendTitle || "Suspend Subscription"}</DialogTitle>
          <DialogDescription>
            {dict.adminSubscriptions.dialogs?.suspendDesc || "Are you sure you want to suspend this subscription? Please provide an optional reason below."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Suspending..." : "Suspend"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CancelSubscriptionDialog({
  subscriptionId,
  open,
  onOpenChange,
  onSuccess,
  dict,
}: {
  subscriptionId: string;
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
      await cancelSubscription(subscriptionId, reason);
      toast.success("Subscription cancelled successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel subscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.adminSubscriptions.dialogs?.cancelTitle || "Cancel Subscription"}</DialogTitle>
          <DialogDescription>
            {dict.adminSubscriptions.dialogs?.cancelDesc || "Are you sure you want to permanently cancel this subscription? Please provide an optional reason below."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder={dict.adminSubscriptions.dialogs?.reasonPlaceholder || "Reason (optional)"}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (dict.adminSubscriptions.dialogs?.canceling || "Cancelling...") : (dict.adminSubscriptions.dialogs?.cancelSubscription || "Cancel Subscription")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AssignSubscriptionDialog({
  storeId,
  open,
  onOpenChange,
  onSuccess,
  dict,
}: {
  storeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  dict: GlobalDictionary;
}) {
  const [planId, setPlanId] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plans, setPlans] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (open) {
      getSubscriptionPlans({ perPage: 100 }).then(res => {
        setPlans(res.items || []);
      });
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!planId) {
      toast.error("Please select a plan");
      return;
    }
    try {
      setIsSubmitting(true);
      await assignSubscription(storeId, planId, billingCycle);
      toast.success("Subscription assigned successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to assign subscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.adminSubscriptions.dialogs?.assignTitle || "Admin Override: Assign Plan"}</DialogTitle>
          <DialogDescription>
            {dict.adminSubscriptions.dialogs?.assignDesc || "Manually assign a subscription plan to this store. This generates a $0 paid payment session immediately."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan</label>
            <Select value={planId} onValueChange={setPlanId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Billing Cycle</label>
            <Select value={billingCycle} onValueChange={(v: "monthly" | "yearly") => setBillingCycle(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Assigning..." : "Assign Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
