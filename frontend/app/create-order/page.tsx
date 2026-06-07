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
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Create Order</h1>

      <label className="block text-sm font-medium text-gray-700 mb-1">Store ID</label>
      <input
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="e.g. store_1"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
      <input
        type="number"
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="e.g. 499"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Item ID"
            value={item.item_id}
            onChange={(e) => updateItem(index, "item_id", e.target.value)}
          />
          <input
            type="number"
            className="w-20 border rounded px-3 py-2"
            placeholder="Qty"
            min={1}
            value={item.qty}
            onChange={(e) => updateItem(index, "qty", e.target.value)}
          />
          {items.length > 1 && (
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 text-sm px-2"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addItem}
        className="text-indigo-600 text-sm mb-4 hover:underline"
      >
        + Add Item
      </button>

      {isError && <p className="text-red-500 text-sm mb-2">Failed to create order.</p>}

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Order"}
      </button>
    </div>
  );
}