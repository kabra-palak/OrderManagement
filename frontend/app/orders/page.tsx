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
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Orders</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border rounded px-3 py-2 w-60"
          placeholder="Filter by Store ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Filter
        </button>
        {storeId && (
          <button
            onClick={() => { setStoreId(""); setInput(""); setPage(1); }}
            className="text-gray-500 text-sm underline"
          >
            Clear
          </button>
        )}
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {isError && <p className="text-red-500">Failed to fetch orders.</p>}

      {data && (
        <>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Store</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-xs">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2">{order.store_id}</td>
                  <td className="px-4 py-2">₹{order.total_amount}</td>
                  <td className="px-4 py-2"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => router.push(`/orders/${order._id}`)}
                      className="text-indigo-600 hover:underline text-xs"
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