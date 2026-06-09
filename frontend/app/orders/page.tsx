"use client";

import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useStoreFilter } from "@/store/useStoreFilter";
import { useSocket } from "@/hooks/useSocket"
import StatusBadge from "@/components/StatusBadge";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const { storeId, setStoreId } = useStoreFilter();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(storeId);

  const { data, isLoading, isError } = useOrders(storeId, page);
   useSocket(storeId);

  const handleFilter = () => {
    setStoreId(input);
    setPage(1);
  };

   return (
    <div className="min-h-[85vh] bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Orders</h1>
              <p className="text-sm text-slate-600 mt-2">View and filter active orders across your stores.</p>
            </div>
            <button
              onClick={() => router.push("/create-order")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              + New Order
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
            <div className="flex-1 min-w-0">
              <input
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="Filter by Store ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              onClick={handleFilter}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Filter
            </button>
            {storeId && (
              <button
                onClick={() => { setStoreId(""); setInput(""); setPage(1); }}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            )}
          </div>

      {isLoading && <p className="text-gray-700 font-medium">Loading...</p>}
      {isError && <p className="text-red-600 font-medium">Failed to fetch orders.</p>}

      {data && (
        <>
          <table className="w-full text-sm text-left">
            <thead className="bg-indigo-50 border-b-2 border-indigo-200">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-900">Order ID</th>
                <th className="px-4 py-2 font-bold text-gray-900">Store</th>
                <th className="px-4 py-2 font-bold text-gray-900">Amount</th>
                <th className="px-4 py-2 font-bold text-gray-900">Status</th>
                <th className="px-4 py-2 font-bold text-gray-900">Created</th>
                <th className="px-4 py-2 font-bold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((order) => (
                <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-xs text-gray-700">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2 text-gray-800 font-medium">{order.store_id}</td>
                  <td className="px-4 py-2 text-gray-800 font-medium">₹{order.total_amount}</td>
                  <td className="px-4 py-2"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-2 text-gray-700">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => router.push(`/orders/${order._id}`)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            total={data.total}
            limit={data.limit}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
    </div>
  </div>
  );
}