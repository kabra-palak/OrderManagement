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
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Orders</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border border-gray-300 rounded px-3 py-2 w-60 text-gray-900 placeholder:text-gray-500"
          placeholder="Filter by Store ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium"
        >
          Filter
        </button>
        {storeId && (
          <button
            onClick={() => { setStoreId(""); setInput(""); setPage(1); }}
            className="text-gray-900 text-sm underline font-medium hover:text-indigo-600"
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
  );
}