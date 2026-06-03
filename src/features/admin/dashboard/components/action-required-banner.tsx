import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";

import type { DashboardOverview } from "../types/dashboard.types";
import type { DashboardDictionary } from "../utils/get-dictionary";

export function ActionRequiredBanner({
  operational,
  dict,
}: {
  operational?: DashboardOverview["operational"];
  dict: DashboardDictionary["dashboard"]["actionRequired"];
}) {
  if (!operational) {
    return null;
  }

  const {
    pendingStoreApprovals = 0,
    pendingVerifications = 0,
    unresolvedCustomerTickets = 0,
    unresolvedSellerTickets = 0,
  } = operational;

  const totalPending =
    pendingStoreApprovals +
    pendingVerifications +
    unresolvedCustomerTickets +
    unresolvedSellerTickets;

  if (totalPending === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/20">
      <div className="flex items-start sm:items-center">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
        </div>
        <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
          <p className="text-sm font-medium text-orange-800 dark:text-orange-400">
            {dict.title.replace("{{count}}", totalPending.toString())}
          </p>
          <div className="mt-3 flex space-x-3 md:mt-0 md:ml-6">
            {(pendingStoreApprovals > 0 || pendingVerifications > 0) && (
              <Link
                href="/admin/stores"
                className="inline-flex items-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none dark:bg-orange-700 dark:hover:bg-orange-600"
              >
                {dict.reviewStores}
                <ChevronRight className="ml-1 -mr-0.5 h-4 w-4" />
              </Link>
            )}
            {(unresolvedCustomerTickets > 0 || unresolvedSellerTickets > 0) && (
              <Link
                href="/admin/contact/customer"
                className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium text-orange-700 hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800"
              >
                {dict.reviewTickets}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
