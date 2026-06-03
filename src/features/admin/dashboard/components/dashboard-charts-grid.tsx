"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Award } from "lucide-react";

import { AdminSection } from "@/features/admin/shared";
import type { DashboardOverview } from "../types/dashboard.types";
import type { DashboardDictionary } from "../utils/get-dictionary";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];
const TIER_COLORS: Record<string, string> = {
  free: "#94a3b8",
  premium: "#3b82f6",
  enterprise: "#8b5cf6",
};

export function DashboardChartsGrid({
  charts,
  dict,
}: {
  charts?: DashboardOverview["charts"];
  dict: DashboardDictionary["dashboard"]["charts"];
}) {
  if (!charts) return null;

  // Transform points flow for grouped bar chart
  const pointsFlowData = charts.pointsFlow.earned.map((earnedItem) => {
    const spentItem = charts.pointsFlow.spent.find(
      (s) => s.date === earnedItem.date
    );
    return {
      date: earnedItem.date,
      earned: Number(earnedItem.count),
      spent: spentItem ? Number(spentItem.count) : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Row 1: Growth Lines */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminSection title={dict.userAcquisition} description={dict.userAcquisitionDesc}>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.userGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Line type="monotone" dataKey="count" name="New Users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminSection>

        <AdminSection title={dict.storeGrowth} description={dict.storeGrowthDesc}>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.storeGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Line type="monotone" dataKey="count" name="New Stores" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminSection>
      </div>

      {/* Row 2: Claims Area & Subscription Pie */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminSection title={dict.claimsVolume} description={dict.claimsVolumeDesc}>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.claimsVolume} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                  <Area type="monotone" dataKey="count" name="Claims" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorClaims)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AdminSection>
        </div>

        <div className="lg:col-span-1">
          <AdminSection title={dict.subscriptions} description={dict.subscriptionsDesc}>
            <div className="h-[300px] w-full pt-4 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="tier"
                  >
                    {charts.subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TIER_COLORS[entry.tier.toLowerCase()] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AdminSection>
        </div>
      </div>

      {/* Row 3: Points Flow Bar & Top Stores Leaderboard */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminSection title={dict.pointsFlow} description={dict.pointsFlowDesc}>
          <div className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsFlowData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }}/>
                <Bar dataKey="earned" name="Earned" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Spent" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminSection>

        <AdminSection title={dict.topStores} description={dict.topStoresDesc}>
          <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm mt-4">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">{dict.table.storeName}</th>
                  <th className="px-4 py-3 text-right">{dict.table.totalSales}</th>
                  <th className="px-4 py-3 text-right">{dict.table.rating}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {charts.topStores.map((store) => (
                  <tr key={store.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-500" />
                      {store.name}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.totalSales)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-amber-500">
                      {store.ratingAvg} ⭐
                    </td>
                  </tr>
                ))}
                {charts.topStores.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                      {dict.noStores}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
