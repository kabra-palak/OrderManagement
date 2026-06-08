"use client";

import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useStoreFilter } from "@/store/useStoreFilter";
import StatusBadge from "@/components/StatusBadge";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const { storeId, setStoreId } = useStoreFilter();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(storeId);

  const { data, isLoading, isError } = useOrders(storeId, page);

  const handleFilter = () => {
    setStoreId(input);
    setPage(1);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
        <p className="text-sm text-gray-400 mt-1">Browse and manage all store orders</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          <input
            className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Filter by Store ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Filter
        </button>
        {storeId && (
          <button
            onClick={() => { setStoreId(""); setInput(""); setPage(1); }}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-12 justify-center">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
          Loading orders...
        </div>
      )}
      {isError && (
        <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          Failed to fetch orders. Please try again.
        </div>
      )}

      {/* Table */}
      {data && (
        <>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Store</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.data.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500 bg-gray-50/40">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{order.store_id}</td>
                    <td className="px-5 py-3.5 text-gray-900 font-semibold">₹{order.total_amount}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => router.push(`/orders/${order._id}`)}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-100 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              page={page}
              total={data.total}
              limit={data.limit}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}