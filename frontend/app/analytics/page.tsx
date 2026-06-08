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
          <h1 className="text-2xl font-bold text-indigo-600">Analytics</h1>
          <p className="text-gray-500 mt-1">Order and store performance metrics from your system.</p>
        </div>
      </div>

      {isLoading && <p className="text-gray-500">Loading analytics data...</p>}
      {hasError && <p className="text-red-500">Unable to load analytics. Please refresh or try again later.</p>}

      <div className="grid gap-6">
        <section className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Orders Per Day</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white text-gray-600">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {ordersPerDay.data?.map((row) => (
                  <tr key={row._id} className="border-t border-gray-100 hover:bg-white">
                    <td className="px-4 py-3 font-medium">{row._id}</td>
                    <td className="px-4 py-3">{row.count}</td>
                    <td className="px-4 py-3">{formatCurrency(row.revenue)}</td>
                  </tr>
                ))}
                {!ordersPerDay.isLoading && ordersPerDay.data?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-gray-500">
                      No daily order data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Revenue Per Store</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white text-gray-600">
                <tr>
                  <th className="px-4 py-3">Store</th>
                  <th className="px-4 py-3">Total Revenue</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Average Order</th>
                </tr>
              </thead>
              <tbody>
                {revenuePerStore.data?.map((row) => (
                  <tr key={row._id} className="border-t border-gray-100 hover:bg-white">
                    <td className="px-4 py-3">{row._id}</td>
                    <td className="px-4 py-3">{formatCurrency(row.total_revenue)}</td>
                    <td className="px-4 py-3">{row.total_orders}</td>
                    <td className="px-4 py-3">{formatCurrency(row.avg_order_value)}</td>
                  </tr>
                ))}
                {!revenuePerStore.isLoading && revenuePerStore.data?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-gray-500">
                      No revenue data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Top Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white text-gray-600">
                <tr>
                  <th className="px-4 py-3">Item ID</th>
                  <th className="px-4 py-3">Quantity Sold</th>
                  <th className="px-4 py-3">Orders Containing Item</th>
                </tr>
              </thead>
              <tbody>
                {topItems.data?.map((row) => (
                  <tr key={row.item_id} className="border-t border-gray-100 hover:bg-white">
                    <td className="px-4 py-3">{row.item_id}</td>
                    <td className="px-4 py-3">{row.total_qty}</td>
                    <td className="px-4 py-3">{row.total_orders}</td>
                  </tr>
                ))}
                {!topItems.isLoading && topItems.data?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-gray-500">
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
