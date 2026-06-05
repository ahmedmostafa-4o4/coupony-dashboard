import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { toAdminItemResult } from "@/lib/api/admin-contract";
import type { PaymentDto } from "../types/payments.dto";
import type { PaymentDetailsResult } from "../types/payment.types";

export async function getPaymentById(paymentId: string): Promise<PaymentDetailsResult> {
  // Try to use the paymentSessions endpoint. If it returns an error, we gracefully handle it.
  const response = await apiClient.get<{ data: PaymentDto | PaymentDto[] }>(
    apiEndpoints.admin.billing.paymentSessions.detail(paymentId)
  );

  const jsonBody: any = response;
  const itemData: any = Array.isArray(jsonBody.data) ? jsonBody.data[0] : jsonBody.data;

  if (!itemData) {
    return toAdminItemResult(null as unknown as any, jsonBody);
  }

  return toAdminItemResult({
    id: itemData.id,
    storeId: itemData.store_id,
    planId: itemData.plan_id,
    billingCycle: itemData.billing_cycle,
    amount: itemData.amount,
    currency: itemData.currency,
    status: itemData.status,
    paymobOrderId: itemData.paymob_order_id,
    paymobTransactionId: itemData.paymob_transaction_id,
    paymentUrl: itemData.payment_url,
    expiresAt: itemData.expires_at,
    paidAt: itemData.paid_at,
    failedAt: itemData.failed_at,
    failureReason: itemData.failure_reason,
    createdAt: itemData.created_at,
    updatedAt: itemData.updated_at,
    store: itemData.store ? {
      id: itemData.store.id,
      name: itemData.store.name,
      description: itemData.store.description,
      logoUrl: itemData.store.logo_url,
      bannerUrl: itemData.store.banner_url,
      email: itemData.store.email,
      phone: itemData.store.phone,
      taxId: itemData.store.tax_id,
      commissionRate: itemData.store.commission_rate,
      status: itemData.store.status,
      subscriptionTier: itemData.store.subscription_tier,
      isVerified: itemData.store.is_verified,
      verifiedAt: itemData.store.verified_at,
      totalSales: itemData.store.total_sales,
      ratingAvg: itemData.store.rating_avg,
      ratingCount: itemData.store.rating_count,
      followersCount: itemData.store.followers_count,
      monthlyGoal: itemData.store.monthly_goal,
      shardKey: itemData.store.shard_key,
      approvedAt: itemData.store.approved_at,
      approvedBy: itemData.store.approved_by,
      rejectedAt: itemData.store.rejected_at,
      rejectedBy: itemData.store.rejected_by,
      rejectionReason: itemData.store.rejection_reason,
      adminNotes: itemData.store.admin_notes,
      createdAt: itemData.store.created_at,
      updatedAt: itemData.store.updated_at,
      deletedAt: itemData.store.deleted_at,
    } as any : null,
    plan: itemData.plan ? {
      id: itemData.plan.id,
      name: itemData.plan.name,
      slug: itemData.plan.slug,
      description: itemData.plan.description,
      priceMonthly: itemData.plan.price_monthly,
      priceYearly: itemData.plan.price_yearly,
      currency: itemData.plan.currency,
      maxProducts: itemData.plan.max_products,
      maxEmployees: itemData.plan.max_employees,
      maxBranches: itemData.plan.max_branches,
      isActive: itemData.plan.is_active,
      gracePeriodDays: itemData.plan.grace_period_days,
      degradedPeriodDays: itemData.plan.degraded_period_days,
      sortOrder: itemData.plan.sort_order,
      createdAt: itemData.plan.created_at,
      updatedAt: itemData.plan.updated_at,
    } as any : null,
  } as any, jsonBody);
}
