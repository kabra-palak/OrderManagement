"use client";

import { useState } from "react";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useRouter } from "next/navigation";

export default function CreateOrderPage() {
  const router = useRouter();
  const { mutate, isPending, isError } = useCreateOrder();

  const [storeId, setStoreId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [items, setItems] = useState([{ item_id: "", qty: 1 }]);

  const addItem = () => setItems([...items, { item_id: "", qty: 1 }]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: "item_id" | "qty", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: field === "qty" ? +value : value };
    setItems(updated);
  };

  const handleSubmit = () => {
    if (!storeId || !totalAmount || items.some((i) => !i.item_id)) return;
    mutate(
      { store_id: storeId, items, total_amount: +totalAmount },
      { onSuccess: () => router.push("/orders") }
    );
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-8">

          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
              Create Order
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Create a new order</h1>
            <p className="text-sm text-slate-600 mt-2">Add store, items, and order total, then submit to track it immediately.</p>
          </div>

        {/* Store ID */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Store ID</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-500"
            placeholder="e.g. store_1"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          />
        </div>

        {/* Total Amount */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Total Amount</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-700 font-bold">₹</span>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-500"
              placeholder="e.g. 499"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-gray-900">
              Items
              <span className="ml-2 text-xs font-normal text-gray-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </label>
          </div>

          <div className="rounded-xl border border-gray-300 overflow-hidden divide-y divide-gray-200">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_80px_36px] gap-2 px-4 py-2 bg-indigo-50">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Item ID</span>
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Qty</span>
              <span />
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_80px_36px] gap-2 items-center px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-500"
                  placeholder="item_001"
                  value={item.item_id}
                  onChange={(e) => updateItem(index, "item_id", e.target.value)}
                />
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateItem(index, "qty", e.target.value)}
                />
                {items.length > 1 ? (
                  <button
                    onClick={() => removeItem(index)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors mx-auto"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
        </div>

        {/* Error */}
        {isError && (
          <div className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-4">
            Failed to create order. Please try again.
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/orders")}
            className="flex-1 text-sm font-medium text-gray-500 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Creating..." : "Create Order"}
          </button>
        </div>

      </div>
    </div>
  </div>
  );
}