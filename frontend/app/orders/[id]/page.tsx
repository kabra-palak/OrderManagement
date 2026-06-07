"use client";

import { useState } from "react";
import { OrderStatus } from "@/types";
import { useRouter, useParams } from "next/navigation";
import { useUpdateStatus } from "@/hooks/useUpdateStauts";

const statuses: OrderStatus[] = ["PLACED", "PREPARING", "COMPLETED"];

export default function UpdateStatusPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess } = useUpdateStatus();
  const [status, setStatus] = useState<OrderStatus>("PLACED");

  const handleUpdate = () => {
    mutate({ id, status }, { onSuccess: () => router.push("/orders") });
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Update Order Status</h1>

      <p className="text-xs text-gray-400 mb-4 font-mono">Order: {id}</p>

      <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
      <select
        className="w-full border rounded px-3 py-2 mb-6"
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {isError && <p className="text-red-500 text-sm mb-2">Failed to update status.</p>}
      {isSuccess && <p className="text-green-500 text-sm mb-2">Status updated!</p>}

      <button
        onClick={handleUpdate}
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
}