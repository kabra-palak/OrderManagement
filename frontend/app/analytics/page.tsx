"use client";
import { useState } from "react";
import { useOrdersPerDay, useRevenuePerStore, useTopItems } from "@/hooks/useAnalytics";

const formatCurrency = (value: number) => `₹${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return new Date(+year, +month - 1, +day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const itemRankClasses = (index: number) => {
  if (index === 0) return "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700";
  if (index === 1) return "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-gray-100 text-gray-600";
  if (index === 2) return "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-orange-100 text-orange-600";
  return "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-indigo-50 text-indigo-500";
};

export default function AnalyticsPage() {
  const ordersPerDay = useOrdersPerDay();
  const revenuePerStore = useRevenuePerStore();
  const topItems = useTopItems();

  const [selectedStore, setSelectedStore] = useState<string>("__all__");
  const storeOptions = revenuePerStore.data?.map((r) => r._id) ?? [];
  const filteredStores =
    selectedStore === "__all__"
      ? revenuePerStore.data ?? []
      : (revenuePerStore.data ?? []).filter((r) => r._id === selectedStore);

  const isLoading = ordersPerDay.isLoading || revenuePerStore.isLoading || topItems.isLoading;
  const hasError = ordersPerDay.isError || revenuePerStore.isError || topItems.isError;

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
                Analytics
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Platform insights</h1>
              <p className="text-sm text-slate-600 mt-2">Track daily order trends, store revenue, and top selling items in one place.</p>
            </div>
          </div>

      {isLoading && <p className="text-gray-700 font-medium">Loading analytics data...</p>}
      {hasError && <p className="text-red-600 font-medium">Unable to load analytics. Please refresh or try again later.</p>}

      <div className="grid gap-6">
        <section className="rounded-lg border border-gray-300 p-5 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Orders Per Day</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 border-b-2 border-indigo-200">
                <tr>
                  <th className="px-4 py-3 text-gray-900 font-bold">Date</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Orders</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {ordersPerDay.data?.map((row) => (
                  <tr key={row._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{formatDate(row._id)}</td>
                    <td className="px-4 py-3 text-gray-800">{row.count}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{formatCurrency(row.revenue)}</td>
                  </tr>
                ))}
                {!ordersPerDay.isLoading && ordersPerDay.data?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-gray-700 text-center">
                      No daily order data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-5 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Revenue Per Store</h2>
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 w-full sm:w-56"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="__all__">All Stores</option>
              {storeOptions.map((storeId) => (
                <option key={storeId} value={storeId}>
                  {storeId}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 border-b-2 border-indigo-200">
                <tr>
                  <th className="px-4 py-3 text-gray-900 font-bold">Store</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Total Revenue</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Orders</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Average Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((row) => (
                  <tr key={row._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{row._id}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{formatCurrency(row.total_revenue)}</td>
                    <td className="px-4 py-3 text-gray-800">{row.total_orders}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{formatCurrency(row.avg_order_value)}</td>
                  </tr>
                ))}
                {!revenuePerStore.isLoading && filteredStores.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-gray-700 text-center">
                      No revenue data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-5 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Selling Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 border-b-2 border-indigo-200">
                <tr>
                  <th className="px-4 py-3 text-gray-900 font-bold">Rank</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Item ID</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Quantity Sold</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Orders Containing Item</th>
                </tr>
              </thead>
              <tbody>
                {topItems.data?.map((row, index) => (
                  <tr key={row.item_id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className={itemRankClasses(index)}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.item_id}</td>
                    <td className="px-4 py-3 text-gray-800">{row.total_qty}</td>
                    <td className="px-4 py-3 text-gray-800">{row.total_orders}</td>
                  </tr>
                ))}
                {!topItems.isLoading && topItems.data?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-gray-700 text-center">
                      No top items data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
  );
}
