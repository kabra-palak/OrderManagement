"use client";

import { useOrdersPerDay, useRevenuePerStore, useTopItems } from "@/hooks/useAnalytics";

const formatCurrency = (value: number) => `₹${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function AnalyticsPage() {
  const ordersPerDay = useOrdersPerDay();
  const revenuePerStore = useRevenuePerStore();
  const topItems = useTopItems();

  const isLoading = ordersPerDay.isLoading || revenuePerStore.isLoading || topItems.isLoading;
  const hasError = ordersPerDay.isError || revenuePerStore.isError || topItems.isError;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">Analytics</h1>
          <p className="text-gray-700 mt-1 font-medium">Order and store performance metrics from your system.</p>
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
                    <td className="px-4 py-3 font-semibold text-gray-900">{row._id}</td>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Per Store</h2>
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
                {revenuePerStore.data?.map((row) => (
                  <tr key={row._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{row._id}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{formatCurrency(row.total_revenue)}</td>
                    <td className="px-4 py-3 text-gray-800">{row.total_orders}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{formatCurrency(row.avg_order_value)}</td>
                  </tr>
                ))}
                {!revenuePerStore.isLoading && revenuePerStore.data?.length === 0 && (
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 border-b-2 border-indigo-200">
                <tr>
                  <th className="px-4 py-3 text-gray-900 font-bold">Item ID</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Quantity Sold</th>
                  <th className="px-4 py-3 text-gray-900 font-bold">Orders Containing Item</th>
                </tr>
              </thead>
              <tbody>
                {topItems.data?.map((row) => (
                  <tr key={row.item_id} className="border-t border-gray-200 hover:bg-gray-50">
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
  );
}
